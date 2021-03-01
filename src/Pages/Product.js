import React from "react";
import Navbar from "../Components/Navbar";
import ProductList from "../Components/ProductList";
import { base_url, product_image_url } from "../Config.js";
import axios from "axios";

export default class Product extends React.Component{
    constructor(){
        super()
        this.state = {
            product: [],
            token: "", 
            customerName: null
         }

         if(localStorage.getItem("token")){
             this.state.token = localStorage.getItem("token")
         } else {
             window.location("/login")
         }

         this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getProduct = () => {
        let url = base_url + "/product"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({product: response.data})
        })
        .catch(error => {
            if(error.response){
                if(error.response.status){
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    componentDidMount(){
        this.getProduct()
    }

    addToCart = (selectedItem) => {
        // variabel u/ menampung cart sementara
        let tempCart = []

        // cek adanya data cart pada localStorage
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari 
            // string ke array objek
        }

        // Cek data yg dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.product_id === selectedItem.product_id)

        if(existItem) {
            // jika item yg dipilih ada di dlm keranjang belanja
            window.alert(`Anda telah memilih ${selectedItem.name}`)
        } else {
            // user diminta memasukkan jumlah item yg akan dibeli
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang dibeli`, "")
            if(promptJumlah !== null && promptJumlah !== ""){
                // jika user memasukkan 1/lebih jumlah item yg dibeli
                // menambah properti "jumlahBeli" pd item yg dipilih
                selectedItem.qty = promptJumlah

                // memasukkan item yg dipilih ke dlm cart
                tempCart.push(selectedItem)

                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    getCustomer = () => {
        let customer = JSON.parse(localStorage.getItem("customer"))
        this.setState({customerName: customer.name})
    }

    componentDidMount(){
        this.getCustomer()
        this.getProduct()
    }

    render(){
        return(
            <div>
                <Navbar />
                <h3 className="judul my-2">
                    <strong> Welcome, {this.state.customerName} </strong>
                </h3>
                <section>
                    <p>Computer Store menyediakan berbagai macam barang komputer dengan 
                        harga bersahabat :)</p>
                </section>
                <h1 className="title">Product List</h1>
                <div className="container">
                    <div className="row">
                        { this.state.product.map( item => (
                            <ProductList
                                key = {item.product_id}
                                name = {item.name}
                                price = {item.price}
                                stock = {item.stock}
                                image = {product_image_url + "/" + item.image}
                                onCart = {() => this.addToCart(item)}
                            />
                        )) }
                    </div>
                </div>
            </div>
        );
    }
}
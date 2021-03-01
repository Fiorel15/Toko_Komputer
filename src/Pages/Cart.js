import React from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { base_url } from "../Config.js";

export default class Cart extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            customerID: "",
            customerName: "",
            cart: [], // untuk menyimpan list cart
            total: 0, // untuk menyimpan data total belanja
        }

        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        }else{
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    initCart = () => {
        // memanggil data cart pd localStorage
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        if(localStorage.getItem("customer") !== null) {
            let customer = JSON.parse(localStorage.getItem("customer"))
            this.setState({
                customerID: customer.customer_id,
                customerName: customer.name
            })
        }

        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.price * item.qty)
        })

        // memasukkan data cart, user, dan total harga pd state
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }

    componentDidMount(){
        this.initCart()
    }

    editItem = selectedItem => {
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(item => item.product_id === selectedItem.product_id)
        let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang dibeli`, selectedItem.qty)
        tempCart[index].qty = promptJumlah

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        // refresh cart
        this.initCart()
    }

    dropItem = selectedItem => {
        if(window.confirm(`Apakah anda yakin ingin menghapus ${selectedItem.name} dari keranjang ?`)) {
            let tempCart = []
            if(localStorage.getItem("cart") !== null){
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }

            let index = tempCart.findIndex(it => it.product_id === selectedItem.product_id)
            tempCart.splice(index, 1)

            // update localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))

            // refresh cart
            this.initCart()
        }
    }

    checkOut = () => {
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let data = {
            customer_id: this.state.customerID,
            detail_transaksi: tempCart
        }

        let url = base_url + "/transaksi"

        axios.post(url, data, this.headerConfig())
        .then (response => {
            // clear cart
            window.alert(response.data.message)
            localStorage.removeItem("cart")
            window.location = "/transaction"
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
        this.initCart()
    }

    render(){
        return(
            <div>
                <Navbar />
                <h1 className="title">Cart List</h1>
                <div className="container">
                    <div className="card col-12 mt-2">
                        <div className="card-body">
                            <h5 className="text-primary">
                                Customer: {this.state.customerName}
                            </h5>

                            <table className="table table-bordered-hover">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { this.state.cart.map( (item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>Rp {item.price}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">
                                                Rp {item.price * item.qty}
                                            </td>

                                            <td>
                                                <button className="btn btn-sm btn-info m-1"
                                                    onClick={() => this.editItem(item)}>
                                                    Edit
                                                </button> 

                                                <button className="btn btn-sm btn-danger m-1"
                                                    onClick={() => this.dropItem(item)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    )) }

                                    <tr>
                                        <td colSpan="3">Total</td>
                                        <td className="text-right">
                                            Rp {this.state.total}
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-success btn-block m-1"
                                                onClick={() => this.checkOut()} 
                                                disabled={this.state.cart.length === 0}> 
                                                Checkout
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import React from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { base_url } from "../config.js";

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            productsCount: 0,
            customersCount: 0,
            transactionsCount: 0,
            adminsCount: 0
        }

        // pengandaian if untuk memastikan login sebagai admin atau tidak, karena
            // tidak bisa diakses sembarang user
        if(localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location ="/login"
        }
    }

    // menambahkan header 'bearer token' sebelum mengakses data product, admin, dll
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    // Update state jumlah produk/productCount sesuai yg ada di db
    getProduct = () => {
        let url = base_url + "/product"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({productsCount: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    // Update state customerCount sesuai dg jumlah yg ada di db
    getCustomer = () => {
        let url = base_url + "/customer"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({customersCount: response.data.length})
        })
        .catch(error => {
            if(error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    // Update state transactionCount sesuai dg jumlah yg ada di db
    getTransaction = () => {
        let url = base_url + "/transaksi"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({transactionsCount: response.data.length})
        })
        .catch(error => {
            if(error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    getAdmins = () => {
        let url = base_url + "/admin"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({adminsCount: response.data.length})
        })
        .catch(error => {
            if(error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    // function untuk mendapatkan nama admin melalui localStorage
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({adminName: admin.name})
    }

    // panggil fungsi" diatas untuk mendapatkan data dari masing"
    componentDidMount() {
        this.getProduct()
        this.getCustomer()
        this.getTransaction()
        this.getAdmin()
        this.getAdmins()
    }

    render() {
        return(
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="judul my-2">
                        <strong> Welcome Back, {this.state.adminName} </strong>
                    </h3>
                    <div className="row">
                        {/* Products Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card1 card-body">
                                    <h4 className="text-dark">
                                        <strong>Products Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong> {this.state.productsCount} </strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Customers Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card2 card-body">
                                    <h4 className="text-dark">
                                        <strong>Customers Count</strong>
                                    </h4>
                                    <h1 className="text-info">
                                        <strong> {this.state.customersCount} </strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Transactions Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card3 card-body">
                                    <h4 className="text-dark">
                                        <strong>Transactions Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong> {this.state.transactionsCount} </strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Admins Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card4 card-body">
                                    <h4 className="text-dark">
                                        <strong>Admins Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong> {this.state.adminsCount} </strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import React from "react";
import Navbar from "../Components/Navbar";
import axios from 'axios';
import { base_url } from "../config";
import $, { error } from 'jquery';

export default class Home extends React.Component{
    constructor(){
        super()
        this.state={
            token: "",
            action: "",
            admins: [],
            admin_id: "",
            name: "",
            username: "",
            password: "",
            fillPassword: true
        }

        if(localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getAdmin = () => {
        let url = base_url + "/admin"

        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({admins: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    componentDidMount(){
        this.getAdmin()
    }

    Add = () => {
        $("#modal_admin").modal("show")
        this.setState({
            action: "insert",
            admin_id: 0,
            name: "",
            username: "",
            password: "",
            fillPassword: true,
        })
    }

    Edit = selectedItem => {
        $("#modal_admin").modal("show")
        this.setState({
            action: "update",
            admin_id: selectedItem.admin_id,
            name: selectedItem.name,
            username: selectedItem.username,
            password: "",
            fillPassword: false,
        })
    }

    saveAdmin = e => {
        e.preventDefault()
        $("#modal_admin").modal("hide")
        let form = {
            admin_id: this.state.admin_id,
            name: this.state.name,
            username: this.state.username
        }

        if(this.state.fillPassword){
            form.password = this.state.password
        }

        let url = base_url + "/admin"
        if(this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getAdmin()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update"){
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getAdmin()
            })
            .catch(error => console.log(error))
        }
    }

    Drop = selectedItem => {
        if(window.confirm("Are you sure to delete this item ?")) {
            let url = base_url + "/admin/" + selectedItem.admin_id
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getAdmin()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="title wow bounce animated" data-wow-duration="700ms">Admin List</h3>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.admins.map((item,index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                            onClick={() => this.Edit(item)} style={{borderRadius:"50%"}, {fontSize: "18px"}}>
                                                <span className="fas fa-edit" >
                                                </span>
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                            onClick={() => this.Drop(item)} style={{borderRadius:"50%"}, {fontSize: "18px"}}>
                                                <span className="fas fa-trash" >
                                                </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn btn-success" style={{borderRadius:"50%"}}
                         onClick={() => this.Add()}>
                           <span className="fa fa-plus"></span>
                           
                    </button>

                    {/* Modal Admin */}
                    <div className="modal fade" id="modal_admin">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Admin</h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveAdmin(ev)}>
                                        Admin Name
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.name}
                                            onChange={ev => this.setState({name: ev.target.value})}
                                            required
                                        />

                                        Username
                                        <input type="text" className="form-control mb-1"
                                            value={this.state.username}
                                            onChange={ev => this.setState({username: ev.target.value})}
                                            required
                                        />

                                        { this.state.action === "update" && this.state.fillPassword === false ? (
                                            <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                                onClick={() => this.setState({fillPassword: true})}>
                                                    Change Password
                                            </button>
                                        ) : (
                                            <div>
                                                Password
                                                <input type="password" className="form-control mb-1"
                                                    value={this.state.password}
                                                    onChange={ev => this.setState({password: ev.target.value})}
                                                    required
                                                />
                                            </div>
                                        ) }

                                        <button type="submit" className="btn btn-block btn-warning">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
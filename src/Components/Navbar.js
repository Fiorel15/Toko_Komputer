import React from "react";
import { Link } from "react-router-dom";
import logo from "../logoTelkom.png";

class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }

    render(){
        return(
            <div>
                <nav className="nav">
                    <div className="logo">
                        <div className="logo-icon">
                            <img src={logo} alt="logo" />
                            <span>Moklet Computer Store</span>
                        </div>
                    </div>

                    {/* show and hide menu */}
                    <button className="navbar-toggler" data-toggle="collapse"
                    data-target="#menu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="show white">
                        <ul className="nav-list">
                            <div>
                                <li className="nav-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Product">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Customer">Customers</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Transaction">Transactions</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Admin">Administrator</Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={() => this.Logout()}>Logout</Link>
                                </li>
                            </div>
                            <span class="hide black">x</span>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;
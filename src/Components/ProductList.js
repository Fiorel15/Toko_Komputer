import React from 'react';

class ProductList extends React.Component{
    render(){
        return(
            <div className="col-lg-6 col-sm-12 p-4">
                <div className="card">
                    <div className="card-body row">
                        {/* Menampilkan Gambar */}
                        <div className="col-5">
                            <img src={this.props.image} className="img"
                                height="200" width="150" alt={this.props.name} />
                        </div>

                        {/* Menampilkan Desc */}
                        <div className="col-5"> 
                            <h4 className="text-info">
                                {this.props.name}
                            </h4>
                            <hr style={{border: "2px solid sienna"}} />
                            <h6 className="text-danger">
                               Price : {this.props.price}
                            </h6>
                            <h6 className="text-dark">
                                Stock : {this.props.stock}
                            </h6>

                            {/* Button untuk tambah ke cart belanja */}
                            <button className="btn btn-sm btn-success m-2"
                                onClick={this.props.onCart}>
                                    Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default ProductList;
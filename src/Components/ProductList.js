import React from 'react';

class ProductList extends React.Component{
    render(){
        return(
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body-row">
                        {/* Menampilkan Gambar */}
                        <div className="col-5">
                            <img src={this.props.image} className="img"
                                height="200" width="200" alt= {this.props.name} /> 
                        </div>

                        {/* Menampilkan Deskripsi Products */}
                        <div className="col-7">
                            <h5 className="text-info"> 
                                {this.props.name}
                            </h5>
                            <h6 className="text-danger">
                                Price: {this.props.price}
                            </h6>
                            <h6 className="text-dark">
                                Stock: {this.props.stock}
                            </h6>

                            {/* Button untuk mengedit */}
                            <button className="btn btn-sm btn-primary m-1"
                                onClick={this.props.onEdit}>
                                    Edit
                            </button>

                            {/* Button untuk mengahapus */}
                            <button className="btn btn-sm btn-danger m-1"
                                onClick={this.props.onDrop}>
                                    Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductList;
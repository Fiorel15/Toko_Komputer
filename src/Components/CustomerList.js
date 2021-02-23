import React from 'react';

class CustomerList extends React.Component{
    render(){
        return(
            <div className="card-col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-12 p-2">
                        {/* Image */}
                        <img alt={this.props.name} src={this.props.image}
                            className="img rounded-circle" width="150" height="150" />
                    </div>
                    <div className="desc col-sm-8">
                        {/* Description */}
                        <h5 className="text-bold">
                            Customer Name: {this.props.name}
                        </h5>
                        <h6>
                           Customer Phone: {this.props.phone} 
                        </h6>
                        <h6>
                            Customer Address: {this.props.address}
                        </h6>
                    </div>

                    <div className="col-sm-2">
                        <button className="btn btn-sm btn-primary btn-block"
                            onClick={this.props.onEdit} style={{borderRadius: "40%"}, {fontSize: "20px"}}>
                            <span className="fas fa-user-edit"></span>
                        </button>

                        <button className="btn btn-sm btn-block btn-danger"
                            onClick={this.props.onDrop} style={{borderRadius: "30%"}, {fontSize: "20px"}}>
                                <span className="fas fa-trash"></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerList;
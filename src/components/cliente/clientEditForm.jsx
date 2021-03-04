
import React, { Component}  from "react";
import CustomerEditView from './editForm'

class CustomerEdit extends Component {
    render() {
        return <CustomerEditView 
            customerData = {this.props.location.state.customerData}
            />
    }
}
    


export default CustomerEdit;

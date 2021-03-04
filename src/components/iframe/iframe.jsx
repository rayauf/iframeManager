
import React, { Component } from "react";

import { API_GETCUSTOMERS } from '../services/API'
import Axios from 'axios'



class Customer extends Component {
    state = {
        customers: []
    }


    componentDidMount() {
        Axios.get(API_GETCUSTOMERS + `/1`).then((response) => {
            this.setState({ customers: response.data })
        })
    }
    render() {
        console.log(this.state.customers.iframe);
        return <div dangerouslySetInnerHTML={{ __html: this.state.customers.iframe }}>
        </div>
    }
} //this.state.customers.iframe

export default Customer;

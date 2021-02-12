
import React, { Component } from "react";

import { API_GETCUSTOMERS } from '../services/API'
import Axios from 'axios'



class Customer extends Component {
    state = {
        customers: []
    }

    componentDidMount() {
        Axios.get(API_GETCUSTOMERS + `/30`).then((response) => {
            this.setState({ customers: response.data })
        })
    }
    render() {
        return <div dangerouslySetInnerHTML={{ __html: this.state.customers.iframe}}>
        </div>
    }
}

export default Customer;

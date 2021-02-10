import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

class PrivateRoute extends React.Component {
    
    render() {
        
        const Component = this.props.component;
        // TODO: Improve localstorage token
        // const isAuthenticated = localStorage.getItem('user');
        const isAuthenticated = Cookies.get("user");

        return isAuthenticated ? (
            <Component {...this.props} />
        ) : (
                <Redirect to={{ pathname: "/login" }} />
            );
    }
}

export default PrivateRoute;
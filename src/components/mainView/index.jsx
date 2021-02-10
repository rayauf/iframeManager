import React from 'react'
import  CustomersTable  from './customersTable'
import  NavBar from './navBar'
import Fab from '@material-ui/core/Fab';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from "@material-ui/core";

const fabStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
};

export default function MainView(){

    return(
        <div>
            <NavBar />
            <CustomersTable/>
            <Link to="/cliente/crear">
                <Tooltip title="Agregar Cliente" placement="left">
                    <Fab color="secondary" style={fabStyle} aria-label="add">
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Link>       
        </div>
        
    );
    
}
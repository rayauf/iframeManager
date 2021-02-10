import React from 'react';
import { Link, } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import axios from "axios";
import { API_GETCUSTOMERS } from "../services/API";

async function deleteCustomer(customerId) {
    await axios
        .delete(API_GETCUSTOMERS + `/${customerId}`)
        .then((response) => {
            console.log(response);
            return response.data;
        });
}

export default function DeleteVer(props) {

    const { openPopup, setOpenPopup, id, name } = props;
    const [deletedCustomer, setDeletedCustomer] = React.useState(false);

    let dialogTitle = "";
    let dialogBoddy = "";


    deletedCustomer === false ? dialogTitle = 'Eliminar' : dialogTitle = 'Completado';
    deletedCustomer === false ? dialogBoddy = 'Esta seguro que desa elimnar al cliente "' + name + '" ?.'
        : dialogBoddy = 'Cliente eliminado con exito.';

    const handleClose = () => {
        setOpenPopup(false);
        window.location.reload();
    };

    const onClickDeleteButton = () => {
        deleteService();
    }
    const deleteService = () => {
        deleteCustomer(id);
        setDeletedCustomer(true);
    }


    return (
        <Dialog open={openPopup} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogBoddy}
                </DialogContentText>
                
            </DialogContent>
            <DialogActions>
                {deletedCustomer === false &&
                    <Button onClick={onClickDeleteButton} color="primary">
                        Eliminar
                    </Button>
                }
                {deletedCustomer === false &&
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                }
                {deletedCustomer === true &&
                    <Link to="/main">
                        <Button onClick={handleClose} color="primary">
                            Continuar
                    </Button>
                    </Link>
                }
            </DialogActions>
        </Dialog>
    );
}
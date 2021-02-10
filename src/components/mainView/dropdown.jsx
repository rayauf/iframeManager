import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DeleteNotification from './deleteNotification';


const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        fontFamily: "Roboto",
        color: "#212121",
    }
}))

export default function LongMenu(props) {

    const { id, name, customerData } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openPopup, setOpenPopup] = React.useState(false);
    const open = Boolean(anchorEl);
    const classes = useStyles();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const setDialog = () => {
        handleClose();
        setOpenPopup(true);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreHorizIcon></MoreHorizIcon>
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <Link to={{
                    pathname: `/cliente/${props.id}`,
                    state: { customerData: customerData }
                }}
                    className={classes.link}>
                    <MenuItem>
                        Detalles
                    </MenuItem>
                </Link>

            <MenuItem onClick={setDialog}>
                    Eliminar
                    </MenuItem>
            </Menu>
            <DeleteNotification
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                id={id}
                name={name}>
            </DeleteNotification> 

        </div>
    );
}
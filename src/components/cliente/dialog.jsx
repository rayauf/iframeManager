import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScriptDialog(props) {

    const { openPopup, setOpenPopup, id } = props;
    let history = useHistory();
    const handleClose = () => {
        setOpenPopup(false);
        history.push(`/main`);
    };
    const script = `<div id="diviframe"></div><script>
    const baseurl = 'https://client.emequisdev.com/api/client/';
    const clientId = ${id};
    const options = {
        method: 'get'
    };
    const diviframe = document.getElementById('diviframe');
    fetch(baseurl + clientId, options)
        .then(function (response) {
            return response.json()
        }).then(function (json) {
            console.log(json);
            diviframe.innerHTML = json.iframe;
        })    //print data to console
        .catch(err => console.log('Request Failed', err)); // Catch errors
</script>`
    return (
        <div>
            <Dialog
                open={openPopup}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Cliente creado"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {script}
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Continuar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
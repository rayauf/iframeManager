import {
    Button,
    Grid,
    makeStyles,
    Typography,
    TextField,
} from "@material-ui/core";
import axios from "axios";
import React  from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_GETCUSTOMERS } from '../services/API'
import NavBar from '../mainView/navBar'

const useStyles = makeStyles((theme) => ({
    input: {
        display: "none",
    },
    mar: {
        paddingTop: "5%",
    },
    center: {
        paddingTop: "8%",
        placeContent: "center",
        height: "100%"
    }

}));


export default function CustomerEditView(props) {

    const classes = useStyles();
    const { control } = useForm();
    const customer = props;


    let history = useHistory();

    var meassurements = customer.customerData.iframe;

    var splited = meassurements.split(" ")
    var width = splited[2].replace("px;", "")
    var height = splited[4].replace("px;", "")


    const handleUpdateClient = async (data) => {
        var iframe = data.iframe.toString()
        var regExWidth = /(width)=["']([^"']*)["']/gi;
        var regExHeight = /(height)=["']([^"']*)["']/gi;

        var firstChange = iframe.replace(regExWidth, "width=100%");
        var final = firstChange.replace(regExHeight, "height=100%");

        const body = {
            name: data.name,
            url: data.url,
            email: data.contact,
            iframe: `<div style="width: ${data.width}px; height: ${data.height}px; display: inline-block">${final}</div>`


        };

        await axios
            .put(API_GETCUSTOMERS + `/${customer.customerData.id}`, body)
            .then((response) => {
                console.log(response);
                history.push(`/main`);
            });
    };

    return (
        <div >
            <NavBar />
            <form className={classes.form}>

                <Grid container spacing={2} >
                    <Grid item sm>
                        <div>
                            <Typography gutterBottom component="h1" variant="h4" spacing={2} className={classes.mar}>
                                Editar Cliente
                                    </Typography>
                            <Grid container spacing={2} className={classes.center}>
                                <Grid item xs={8}>
                                    <Controller
                                        name="name"
                                        defaultValue={customer.customerData.name}
                                        render={(props) => (
                                            <TextField
                                                label="Nombre"
                                                variant="outlined"
                                                value={props.value}
                                                onChange={props.onChange}
                                                inputRef={props.ref}
                                                fullWidth
                                                required
                                            />
                                        )}
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Controller
                                        name="contact"
                                        defaultValue={customer.customerData.email}
                                        render={(props) => (
                                            <TextField
                                                label="Contacto"
                                                variant="outlined"
                                                value={props.value}
                                                onChange={props.onChange}
                                                inputRef={props.ref}
                                                autoFocus
                                                fullWidth
                                                required
                                            />
                                        )}
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Controller
                                        name="url"
                                        defaultValue={customer.customerData.url}
                                        render={(props) => (
                                            <TextField
                                                label="Sitio"
                                                variant="outlined"
                                                value={props.value}
                                                onChange={props.onChange}
                                                inputRef={props.ref}
                                                autoFocus
                                                multiline
                                                rows={1}
                                                fullWidth
                                                required
                                            />
                                        )}
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid container item xs={10} alignItems="center" justify="center" spacing={10}>
                                    <Grid item xs={5} >
                                        <Controller
                                            name="width"
                                            defaultValue={width}
                                            render={(props) => (
                                                <TextField
                                                    label="Ancho px"
                                                    variant="outlined"
                                                    value={props.value}
                                                    onChange={props.onChange}
                                                    inputRef={props.ref}
                                                    autoFocus
                                                    multiline
                                                    rows={1}
                                                    fullWidth
                                                    required
                                                />
                                            )}
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Controller
                                            name="height"
                                            defaultValue={height}
                                            render={(props) => (
                                                <TextField
                                                    label="Alto px"
                                                    variant="outlined"
                                                    value={props.value}
                                                    onChange={props.onChange}
                                                    inputRef={props.ref}
                                                    autoFocus
                                                    multiline
                                                    rows={1}
                                                    fullWidth
                                                    required
                                                />
                                            )}
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                    </Grid>
                                </Grid> 
                                <Grid item xs={8}>
                                    <Controller
                                        name="iframe"
                                        defaultValue={customer.customerData.iframe}
                                        render={(props) => (
                                            <TextField
                                                label="Iframe"
                                                variant="outlined"
                                                value={props.value}
                                                onChange={props.onChange}
                                                inputRef={props.ref}
                                                autoFocus
                                                multiline
                                                rows={6}
                                                fullWidth
                                                required
                                            />
                                        )}
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <Button
                                        onClick={() => handleUpdateClient(control.getValues())}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        fullWidth
                                    >
                                        Actualizar
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
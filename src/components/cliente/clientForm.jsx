import {
    Button,
    Grid,
    makeStyles,
    Typography,
    TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_GETCUSTOMERS } from '../services/API'

const useStyles = makeStyles((theme) => ({
    input: {
        display: "none",
    },
    mar: {
        paddingTop:"5%",
    },
    center:{
        paddingTop:"8%",
        placeContent: "center",
        height: "100%"
    }
    
}));


function CustomerCreateView(props) {
    
    const classes = useStyles();
    const { control } = useForm();

    let history = useHistory();

    const handleCreateClient = async (data) => {
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
            .post(API_GETCUSTOMERS, body)
            .then((response) => {
                history.push(`/main`);
            });
    };

    return (
        <div >
            <form className={classes.form}>
                
                <Grid container spacing={2} >
                    <Grid item sm>
                        <div>
                            <Typography gutterBottom component="h1" variant="h4" spacing={2} className={classes.mar}>
                                Agregar Cliente
                                    </Typography>
                            <Grid container spacing={2} className = {classes.center}>
                                <Grid item xs={8}>
                                    <Controller
                                        name="name"
                                        defaultValue=""
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
                                        defaultValue=""
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
                                        defaultValue=""
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
                                <Grid container item xs={10 } alignItems="center" justify="center" spacing={10}>
                                    <Grid item xs={5} >
                                        <Controller
                                            name="width"
                                            defaultValue=""
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
                                            defaultValue=""
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
                                        defaultValue=""
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
                                        onClick={() => handleCreateClient(control.getValues())}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        fullWidth
                                    >
                                        Crear
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

class Customer extends Component {
    render() {
        return <CustomerCreateView />;
    }
}

export default Customer;

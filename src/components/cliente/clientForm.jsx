import {
    Button,
    Grid,
    makeStyles,
    Typography,
    TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { Component, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_GETCUSTOMERS } from '../services/API'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    input: {
        display: "none",
    },
    mar: {
        paddingTop: "5%",
    },
    center: {
        paddingTop: "4%",
        placeContent: "center",
        height: "100%"
    },
    frame: {
        paddingTop: "1%",
        placeContent: "center",
        height: "100%"
    }

}));


function CustomerCreateView(props) {

    const classes = useStyles();
    const { control } = useForm();
    const [columns, setColumns] = React.useState('1');
    const [orientation, setOrientation] = React.useState('H');
    const [frames, setFrames] = React.useState([{
        titleLabel: `Title 1`,
        titleRef: `title1`,
        iframeLabel: `Iframe 1`,
        iframeRef: `iframe1`,
        iframe: "",
        title: ""
    }]);


    const handleChange = (event) => {
        setColumns(event.target.value);
        createIframeBlock(event.target.value);
    };
    const handleChangeOrientation = (event) => {
        setOrientation(event.target.value);

    };
    // useEffect(() => {
    //     createIframeBlock(columns);

    // });

    const createIframeBlock = (columns) => {
        let iframes = []
        for (let i = 0; i < columns; i++) {
            var box = {
                titleLabel: `Title ${i + 1}`,
                titleRef: `title${i + 1}`,
                iframeLabel: `Iframe ${i + 1}`,
                iframeRef: `iframe${i + 1}`,
                iframe: "",
                title: ""
            }
            iframes.push(box);
        }
        setFrames(iframes);
        console.log(frames);
    }

    let history = useHistory();

    const handleIframeData = (data, width, height, title) => {
        var regExWidth = /(width)=["']([^"']*)["']/gi;
        var regExHeight = /(height)=["']([^"']*)["']/gi;

        var firstChange = data.replace(regExWidth, "width=100%");
        var final = firstChange.replace(regExHeight, "height=100%");
        var finalDiv = `<div style="width: ${width}px; height: ${height}px; display: inline-block; margin-top: 2rem;"><hr>${title}</hr>${final}</div>`;
        return finalDiv;
    }

    const handleCreateClient = async (data) => {

        let iframes = [];
        let iframeString = "";

        if (columns === '1') {
            const iframeData = handleIframeData(data.iframe1.toString(), data.width, data.height,data.title1);
            iframes = {
                title: data.title1,
                iframeData: iframeData
            }
            iframeString = orientation === 'H' ? `<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center;">${iframeData}</div>`
                : `<div style="display: flex; flex-direction: column; flex-wrap: wrap; justify-content: space-between; align-items: center;">${iframeData}</div>`
        } else if (columns === '2') {
            const iframeData1 = handleIframeData(data.iframe1.toString(), data.width, data.height, data.title1);
            const iframeData2 = handleIframeData(data.iframe2.toString(), data.width, data.height, data.title2);
            iframes = [{
                title: data.title1,
                iframeData: iframeData1
            },
            {
                title: data.title2,
                iframeData: iframeData2
            }]
            iframeString = orientation === 'H' ? `<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center;">${iframeData1}${iframeData2}</div>`
                : `<div style="display: flex; flex-direction: column; flex-wrap: wrap; justify-content: space-between; align-items: center;">${iframeData1}${iframeData2}</div>`

        } else if (columns === '3') {
            const iframeData1 = handleIframeData(data.iframe1.toString(), data.width, data.height, data.title1);
            const iframeData2 = handleIframeData(data.iframe2.toString(), data.width, data.height, data.title2);
            const iframeData3 = handleIframeData(data.iframe3.toString(), data.width, data.height, data.title3);
            iframes = [{
                title: data.title1,
                iframeData: iframeData1
            },
            {
                title: data.title2,
                iframeData: iframeData2
            },
            {
                title: data.title3,
                iframeData: iframeData3
            }]

            iframeString = orientation === 'H' ? `<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center;">${iframeData1}${iframeData2}${iframeData3}</div>`
                : `<div style="display: flex; flex-direction: column; flex-wrap: wrap; justify-content: space-between; align-items: center;">${iframeData1}${iframeData2}${iframeData3}</div>`

        } else if (columns === '4') {
            const iframeData1 = handleIframeData(data.iframe1.toString(), data.width, data.height, data.title1);
            const iframeData2 = handleIframeData(data.iframe2.toString(), data.width, data.height, data.title2);
            const iframeData3 = handleIframeData(data.iframe3.toString(), data.width, data.height, data.title3);
            const iframeData4 = handleIframeData(data.iframe4.toString(), data.width, data.height, data.title4);
            iframes = [{
                title: data.title1,
                iframeData: iframeData1
            },
            {
                title: data.title2,
                iframeData: iframeData2
            },
            {
                title: data.title3,
                iframeData: iframeData3
            }, {
                title: data.title4,
                iframeData: iframeData4
            }]
            
            iframeString = orientation === 'H' ? `<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center;">${iframeData1}${iframeData2}${iframeData3}${iframeData4}</div>` 
                                                : `<div style="display: flex; flex-direction: column; flex-wrap: wrap; justify-content: space-between; align-items: center;">${iframeData1}${iframeData2}${iframeData3}${iframeData4}</div>`
        }


        const body = {
            company: data.company,
            name: data.name,
            url: data.url,
            email: data.contact,
            iframe: iframeString,
            frames: iframes
        };
        console.log(body);

        await axios
            .post(API_GETCUSTOMERS, body)
            .then((response) => {
                console.log(response);
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
                            <Grid container spacing={2} className={classes.center}>
                                <Grid item xs={8}>
                                    <Controller
                                        name="company"
                                        defaultValue=""
                                        render={(props) => (
                                            <TextField
                                                label="Compañia"
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
                                <Grid container item xs={10} alignItems="center" justify="center" spacing={10}>
                                    <Grid item xs={3} >
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
                                    <Grid item xs={3}>
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
                                    <Grid item xs={2}>
                                        <FormControl className={classes.formControl} fullWidth>
                                            <InputLabel htmlFor="uncontrolled-native">Columnas</InputLabel>
                                            <NativeSelect
                                                defaultValue={1}
                                                onChange={handleChange}
                                                value={columns}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl className={classes.formControl} fullWidth>
                                            <InputLabel htmlFor="uncontrolled-native">Orientación</InputLabel>
                                            <NativeSelect
                                                defaultValue={'H'}
                                                onChange={handleChangeOrientation}
                                                value={orientation}
                                            >
                                                <option value={'H'}>Horizontal</option>
                                                <option value={'V'}>Vertical</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                {
                                    frames.map(iframe =>
                                        <Grid container spacing={2} className={classes.frame}>
                                            <Grid item xs={8}>
                                                <Controller
                                                    name={iframe.titleRef}
                                                    defaultValue=""
                                                    render={(props) => (
                                                        <TextField
                                                            label={iframe.titleLabel}
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
                                            <Grid item xs={8}>
                                                <Controller
                                                    name={iframe.iframeRef}
                                                    defaultValue=""
                                                    render={(props) => (
                                                        <TextField
                                                            label={iframe.iframeLabel}
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
                                        </Grid>
                                    )}

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

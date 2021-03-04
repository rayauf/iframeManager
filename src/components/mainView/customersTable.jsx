import Axios from "axios";
import React, { Component } from "react";
import { API_GETCUSTOMERS }   from "../services/API";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuid } from 'uuid';
import  Dropdown  from './dropdown'

//Styles
const useStyles = makeStyles(() => ({
    root: {
        paddingTop:"5%",
        width: "80%",
        marginBottom: "70px",
        
    },
    paper: {
        width: "100%"
    },
    table: {
        minWidth: 1000
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    searchContainer: {
        display: "flex",
        padding: "15px",
        marginBottom: "5px",
    },
    searchInput: {
        width: "250px",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "4px",
        marginRight: "4px",
    },
}));

// Create Table head cells

const headCells = [
    { id: 'id', numeric: true, label: 'ID' },
    { id: 'company', numeric: false, label: 'Compañia' },
    { id: 'name', numeric: false, label: 'Nombre' },
    { id: 'email', numeric: false, label: 'Contacto' },
    { id: 'creationDate', numeric: false, label: 'Creado' },
    { id: 'updateDate', numeric: false, label: 'Editado' }
]

//Create tableRows for TableBody

function createRows(customers) {
    const customersRows = [];
    
    customers.forEach((customer, index) => {

        customersRows[index] = {
            id: customer.id,
            name: customer.name,
            url: customer.url,
            email: customer.email,
            creationDate: dateFormat(customer.created_at),
            updateDate: dateFormat(customer.updated_at),
            iframe: customer.iframe,
            frames: customer.frames,
            company: customer.company
        }
        
    })
    return customersRows
}

function dateFormat(date){
    const preDate = new Date(date);
    let year = preDate.getFullYear();
    let month = preDate.getMonth() + 1;
    let dt = preDate.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    const formatedDate = year + '-' + month + '-' + dt;
    return formatedDate;
}

//Descending comparator for table

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Sort 

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);   
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



//Create Tavble Head with order properties

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow key={uuid()}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={uuid()}
                        align={"left"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                            style={{ fontWeight: "bold" }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// TableHead Properties
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


//Table view
function CustomerTable(props) {

    const { customers } = props;
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [filter, setFilter] = React.useState("");

    var rows = [];
    
    customers != null ? rows = createRows(customers) : rows = []

    //Handle changes in searchBar
    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    //Set filters for Search
    const filterRows = (rows) => {
        const rowsSearched = [];
        rows.forEach((row) => {
            var name = row.name.toLowerCase();
            var url = row.url.toLowerCase();

            if (name.includes(filter) ||
                url.includes(filter) 
            ) {
                rowsSearched.push(row)
            }
        })
        return rowsSearched;
    }

    //Handles  Sort Type
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    //Handles Pagination 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    //Handles Change per row
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            <Grid container className={classes.searchContainer} justify="flex-end" >
                <SearchIcon className={classes.searchIcon} />
                <TextField
                    className={classes.searchInput}
                    label="Buscar"
                    onChange={handleSearchChange}
                ></TextField>
            </Grid>
            <Paper className={classes.paper} >
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>

                            {rows != null && stableSort(filterRows(rows), getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (

                                        <TableRow key={uuid()}>
                                            <TableCell align='left'>{row.id}</TableCell>
                                            <TableCell align='left'>{row.company}</TableCell>
                                            <TableCell align='left'>{row.name}</TableCell>
                                            <TableCell align='left'>{row.email}</TableCell>
                                            <TableCell align='left'>{row.creationDate}</TableCell>
                                            <TableCell align='left'>{row.updateDate}</TableCell>
                                            <TableCell align="left">
                                                <Dropdown
                                                    id={row.id}
                                                    name={row.name}
                                                    customerData={row}
                                                ></Dropdown>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[9]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

class CustomersTable extends Component {
    state = {
        customers: []
    }

    componentDidMount() {
        Axios.get(API_GETCUSTOMERS ).then((response) => {
            this.setState({ customers: response.data })
        })
    }
    render() {
        return <CustomerTable customers={this.state.customers} />;
    }
}
export default CustomersTable;



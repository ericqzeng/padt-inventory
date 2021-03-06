import React from 'react';
import { connect } from 'react-redux'
import { Grid, Button, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { MenuIcon } from '@material-ui/icons/Menu'
import axios from 'axios';
import ItemCell from './ItemCell'
import Search from './Search'
import ItemDialog from './ItemDialog'
import OrdersDialog from './OrdersDialog'
import AddItemDialog from './AddItemDialog'
import { showAddItemDialog, setOpenOrders, showOrdersDrawer, setUser } from '../redux/actions'

class CatalogPage extends React.Component {
    constructor(props) {
        super(props)

        // Pulls the appropriate orders accessible by this user
        axios.get('/api/account/loggedInUser').then(res => {
            this.props.setUser(res.data)
            if (res.data.admin) {
                axios.get('/api/request/all').then(res2 => {
                    this.props.setOpenOrders(res2.data)
                }, err => {
                    alert(err)
                })
            } else {
                axios.get('/api/request/').then(res2 => {
                    this.props.setOpenOrders(res2.data)
                }, err => {
                    alert(err)
                })
            }
        }, err => {
            alert(err)
        })
    }

    render() {
        document.body.style.backgroundColor = 'beige';

        let table = this.props.data.map((ele, index) => {
            return (
                <ItemCell key={index} index={index} data={ele}></ItemCell>
            )
        })

        let inputs = null
        if (this.props.user.admin) {
            inputs = (
                <Grid container item xs={12} direction='row' justify='space-between'>
                    <Grid item >
                        <Search></Search>
                    </Grid>
                    <div>
                        <Button color='primary' onClick={() => this.props.showAddItemDialog(true)}>Add Item</Button>
                        <Button color='primary' onClick={() => this.props.showOrdersDrawer(true)}>Open Orders</Button>
                    </div>
                </Grid>
            )
        } else {
            inputs = (
                <Grid container item xs={12} direction='row' justify='space-between'>
                    <Grid item>
                        <Search></Search>
                    </Grid>
                    <div>
                        <Button color='primary' onClick={() => this.props.showOrdersDrawer(true)}>Your Orders</Button>
                    </div>
                </Grid>
            )
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar className='appbar'>
                        {/* <IconButton edge="start" color="inherit" aria-label="menu">
                            {/* <MenuIcon /> */}
                        {/* </IconButton> */}
                        {inputs}
                    </Toolbar>
                </AppBar>
                <Grid className="m5" container direction='column' justify='center' alignItems='center' alignContent='center' spacing={5}>
                    <Grid item xs={10} container direction='row' justify='center' alignItems='flex-start' alignContent='center' spacing={1}>
                        {table}
                    </Grid>
                </Grid>

                <ItemDialog></ItemDialog>
                <OrdersDialog></OrdersDialog>
                <AddItemDialog></AddItemDialog>
            </div >
        );
    }
}

export default connect((state) => {
    return state
}, { showAddItemDialog, setOpenOrders, showOrdersDrawer, setUser })(CatalogPage)
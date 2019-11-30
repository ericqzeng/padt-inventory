import React from 'react';
import { connect } from 'react-redux'
import { Grid, Button } from '@material-ui/core';
import axios from 'axios';
import ItemCell from './ItemCell'
import Search from './Search'
import ItemDialog from './ItemDialog'
import OrdersDialog from './OrdersDialog'
import { setOpenOrders, showOrdersDrawer, setUser } from '../redux/actions'

class CatalogPage extends React.Component {
    constructor(props) {
        super(props)

        // Pulls the appropriate ordesr accessible by this user
        axios.get('/api/account/loggedInUser').then(res => {
            this.props.setUser(res.data)
        }, err => {
            alert(err)
        })
        axios.get('/api/request/').then(res => {
            this.props.setOpenOrders(res.data)
        }, err => {
            alert(err)
        })
    }

    render() {
        let table = this.props.data.map((ele, index) => {
            return (
                <ItemCell key={index} index={index} data={ele}></ItemCell>
            )
        })

        let inputs = null
        if (this.props.user.admin) {
            inputs = (
                <Grid container item xs={10} direction='row' justify='center'>
                    <Grid item xs={4}>
                        <Search></Search>
                    </Grid>
                    <Grid container direction='column' item xs={2}>
                        <Button color='primary'>Add Item</Button>
                        <Button color='primary' onClick={() => this.props.showOrdersDrawer(true)}>Open Orders</Button>
                    </Grid>
                </Grid>
            )
        } else {
            inputs = (
                <Grid container item xs={10} direction='row' justify='center'>
                    <Grid item xs={4}>
                        <Search></Search>
                    </Grid>
                    <Grid container direction='column' item xs={2}>
                        <Button color='primary' onClick={() => this.props.showOrdersDrawer(true)}>Your Orders</Button>
                    </Grid>
                </Grid>
            )
        }

        return (
            <div>
                <Grid container direction='column' justify='center' alignItems='center' alignContent='center' spacing={5}>
                    {inputs}

                    <Grid item xs={10} container direction='row' justify='center' alignItems='flex-start' alignContent='center' spacing={1}>
                        {table}
                    </Grid>
                </Grid>
                <ItemDialog></ItemDialog>
                <OrdersDialog></OrdersDialog>
            </div >
        );
    }
}

export default connect((state) => {
    return state
}, { setOpenOrders, showOrdersDrawer, setUser })(CatalogPage)
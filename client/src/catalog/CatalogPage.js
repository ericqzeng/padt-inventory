import React from 'react';
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core';
import axios from 'axios';
import ItemCell from './ItemCell'
import Search from './Search'
import ItemDialog from './ItemDialog'
import OrdersDialog from './OrdersDialog'
import { setOpenOrders } from '../redux/actions'

class CatalogPage extends React.Component {
    constructor(props) {
        super(props)

        // Pulls the appropriate ordesr accessible by this user
        console.log(this.props.email) //TODO: this isn't persistent...(at least cookie is)
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

        return (
            <div>
                <Grid container direction='column' justify='center' alignItems='center' alignContent='center' spacing={5}>
                    <Grid item xs={10}>
                        <Search></Search>
                    </Grid>

                    <Grid item xs={10} container direction='row' justify='center' alignItems='flex-start' alignContent='center' spacing={1}>
                        {table}
                    </Grid>
                </Grid>
                <ItemDialog></ItemDialog>
                <OrdersDialog></OrdersDialog>
            </div>
        );
    }
}

export default connect((state) => {
    return state
}, { setOpenOrders })(CatalogPage)
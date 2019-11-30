import React from 'react';
import { connect } from 'react-redux'
import { Grid, Drawer, Divider, ListItem, ListItemText, List, Paper } from '@material-ui/core';
import { setOpenOrders, showOrdersDrawer } from '../redux/actions'

class OrdersDialog extends React.Component {
    render() {
        let openOrders = this.props.openOrders.map((ele, index) => {
            return (
                <Grid container direction='column'>
                    <Divider />
                    <ListItemText /><h4>{ele.itemName}</h4>
                    <ListItemText />{ele.requestor}
                    <ListItemText />Qty: {ele.qty}
                    <ListItemText />Reason:
                    <ListItemText />{ele.reason}
                </Grid>
            );

        })


        return (
            <Drawer anchor="right" open={this.props.ordersDrawer} onClose={() => this.props.showOrdersDrawer(false)}>
                Your Open Orders
                {openOrders}
            </Drawer >
        )
    }
}

export default connect((state) => {
    return state
}, { setOpenOrders, showOrdersDrawer })(OrdersDialog)
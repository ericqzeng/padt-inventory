import React from 'react';
import { connect } from 'react-redux'
import { Grid, Drawer, ListItem, ListItemText, List } from '@material-ui/core';
import { setOpenOrders, showOrdersDrawer } from '../redux/actions'

class OrdersDialog extends React.Component {
    render() {
        let openOrders = this.props.openOrders.map((ele, index) => {
            return (
                <ListItem key={index}>
                    <ListItemText />{ele.itemID}
                    <ListItemText />{ele.requestor}
                </ListItem>);

        })


        return (
            <Drawer anchor="right" open={this.props.ordersDrawer} onClose={() => this.props.showOrdersDrawer(false)}>
                <List>
                    {openOrders}
                </List>
            </Drawer >
        )
    }
}

export default connect((state) => {
    return state
}, { setOpenOrders, showOrdersDrawer })(OrdersDialog)
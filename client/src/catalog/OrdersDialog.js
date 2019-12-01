import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Grid, Drawer, Divider, ListItemText, List, Paper, Button, Typography } from '@material-ui/core';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { setOpenOrders, showOrdersDrawer } from '../redux/actions'

class OrdersDialog extends React.Component {

    handleFulfill = (index, status) => {
        axios.post('/api/request/fulfillOrder', {
            id: this.props.openOrders[index]._id,
            status: status
        }).then(res => {
            //TODO: sucess message
            var newOpenOrders = JSON.parse(JSON.stringify(this.props.openOrders))
            newOpenOrders.splice(index, 1)
            this.props.setOpenOrders(newOpenOrders)
        }, err => {
            alert(err)
        })
    }

    render() {
        //TODO: give admins ability to approve deny here
        let openOrders = this.props.openOrders.map((ele, index) => {
            return (
                <Grid className='m5' container item direction='column' key={index}>
                    <Divider />
                    <ListItemText /><h4>{ele.itemName}</h4>
                    <ListItemText />{ele.requestor}
                    <ListItemText />Qty: {ele.qty}
                    <ListItemText />Reason:
                    <ListItemText />{ele.reason}
                    {(() => {
                        if (!this.props.user.admin) {
                            if (ele.fulfilled === 'APPROVED') {
                                return (<Typography color='primary'>APRROVED</Typography>)
                            } else if (ele.fulfilled === 'PENDING') {
                                return (<Typography color='secondary'>PENDING</Typography>)
                            } else {
                                return (<Typography color='secondary'>DENIED</Typography>)
                            }
                        } else {
                            return (
                                <Grid container align-items='space-between'>
                                    <Button onClick={() => this.handleFulfill(index, 'APPROVED')}>
                                        <CheckCircleOutlineRoundedIcon color='primary' />
                                    </Button>
                                    <Button onClick={() => this.handleFulfill(index, 'DENIED')}>
                                        <ClearRoundedIcon color='secondary' />
                                    </Button>
                                </Grid>)
                        }
                    })()}
                </Grid>
            );

        })

        if (this.props.user.admin) {
            return (
                <Drawer anchor="right" open={this.props.ordersDrawer} onClose={() => this.props.showOrdersDrawer(false)}>
                    <p className='m5'>All Open Orders</p>
                    {openOrders}
                </Drawer >
            )
        } else {
            return (
                <Drawer anchor="right" open={this.props.ordersDrawer} onClose={() => this.props.showOrdersDrawer(false)}>
                    <p className='m5'>Your Orders</p>
                    {openOrders}
                </Drawer >
            )
        }
    }
}

export default connect((state) => {
    return state
}, { setOpenOrders, showOrdersDrawer })(OrdersDialog)
import React from 'react';
import { connect } from 'react-redux'
import { setItemDialogData, setOpenOrders } from '../redux/actions';
import axios from 'axios';
import { FormHelperText, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@material-ui/core';

class ItemDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            qty: 0,
            reason: ''
        }
    }

    handleClose = (event) => {
        this.props.setItemDialogData(this.props.itemDialogData, false)
        this.setState({
            qty: 0,
            reason: ''
        })
    }

    handleSubmit = (event) => {
        //reason trim
        this.setState({
            ...this.state,
            reason: this.state.reason.trim()
        })
        //validation
        if (this.state.qty < 0) {
            this.setState({
                ...this.state,
                qty: 0
            })
            alert('Invalid requested number!');
        } else if (this.state.reason.trim() === '') {
            this.setState({
                ...this.state,
                reason: ''
            })
            alert('Please include a reason!');
        } else {
            axios.post('/api/request/addOrder', {
                ...this.state,
                itemID: this.props.itemDialogData._id,
                itemName: this.props.itemDialogData.name
            }).then(res => {
                //TODO: show success message
                if (this.props.user.admin) {
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
                this.handleClose()
            }, err => {
                alert(err)
            })
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    render() {
        if (this.props.itemDialogData === null) {
            //init case where no dialogData is loaded
            return <Dialog open={false} children={false}></Dialog>;
        }
        return (
            <Dialog open={this.props.itemDialog} onClose={this.handleClose}>
                <DialogTitle>{this.props.itemDialogData.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{this.props.itemDialogData.images}</DialogContentText>
                    <DialogContentText>{this.props.itemDialogData.type}</DialogContentText>
                    <DialogContentText>Qty: {this.props.itemDialogData.qty}</DialogContentText>
                    <DialogContentText>Years used: {this.props.itemDialogData.years.join(', ')}</DialogContentText>
                    <DialogContentText>Links: {this.props.itemDialogData.links.join(', ')}</DialogContentText>
                    <DialogContentText>Locations: {this.props.itemDialogData.locations.join(', ')}</DialogContentText>
                    <Grid container direction='column'>
                        <FormControl>
                            <TextField className='m5 qtyInput' type='number' name='qty' value={this.state.qty} onChange={this.handleChange}></TextField>
                            <FormHelperText>Requested Number</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField className='m5' type=' text' name='reason' value={this.state.reason} onChange={this.handleChange}></TextField>
                            <FormHelperText>Reason</FormHelperText>
                        </FormControl>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSubmit}>
                        Request
                    </Button>
                </DialogActions>
            </Dialog >
        );
    }
}


export default connect((state) => { return state }, { setItemDialogData, setOpenOrders })(ItemDialog)
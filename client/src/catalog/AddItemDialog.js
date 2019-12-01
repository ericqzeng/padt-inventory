import React from 'react';
import { connect } from 'react-redux'
import { showAddItemDialog } from '../redux/actions';
import axios from 'axios';
import { FormHelperText, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Select, MenuItem } from '@material-ui/core';

class AddItemDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            type: '',
            qty: 0,
            years: [],
            links: [],
            locations: [],
            images: []
        }
    }

    handleClose = (event) => {
        this.props.showAddItemDialog(false);
        this.setState({
            name: '',
            type: '',
            qty: 0,
            years: [],
            links: [],
            locations: [],
            images: []
        })
    }

    handleSubmit = (event) => {
        //name trim
        this.setState({
            ...this.state,
            name: this.state.name.trim()
        })
        //validation
        if (this.state.type === '') {
            alert('Item needs a type!')
        } else if (this.state.qty < 0) {
            this.setState({
                ...this.state,
                qty: 0
            })
            alert('Invalid quantity');
        } else if (this.state.name.trim() === '') {
            this.setState({
                ...this.state,
                name: ''
            })
            alert('Please include a name!');
        } else {
            axios.post('/api/catalog/addItem', {
                ...this.state
            }).then(res => {
                //TODO: show success message
                console.log(res)
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

    //TODO: finish UI for adding items
    render() {
        if (!this.props.addItemDialog) {
            //init case where no dialogData is loaded
            return <Dialog open={false} children={false}></Dialog>;
        }
        return (
            <Dialog open={this.props.addItemDialog} onClose={this.handleClose}>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <TextField type='text' name='name' value={this.state.name} onChange={this.handleChange}></TextField>
                        <FormHelperText>Item Name</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Select name='type' value={this.state.type} onChange={this.handleChange}>
                            <MenuItem value='Costume'>Costume</MenuItem>
                            <MenuItem value='Prop'>Prop</MenuItem>
                            <MenuItem value='Gear'>Gear</MenuItem>
                        </Select>
                        <FormHelperText>Type</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField type='number' name='qty' value={this.state.qty} onChange={this.handleChange}></TextField>
                        <FormHelperText>Quantity</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField type='text' name='years' value={this.state.years} onChange={this.handleChange}></TextField>
                        <FormHelperText>Year Used</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField type='text' name='links' value={this.state.links} onChange={this.handleChange}></TextField>
                        <FormHelperText>Links</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField type='text' name='locations' value={this.state.locations} onChange={this.handleChange}></TextField>
                        <FormHelperText>Locations</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField type='text' name='images' value={this.state.images} onChange={this.handleChange}></TextField>
                        <FormHelperText>Image Links</FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSubmit}>
                        Add Item
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default connect((state) => { return state }, { showAddItemDialog })(AddItemDialog)
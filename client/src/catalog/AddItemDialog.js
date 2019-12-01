import React from 'react';
import { connect } from 'react-redux'
import { showAddItemDialog } from '../redux/actions';
import axios from 'axios';
import { FormHelperText, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Select, MenuItem, Grid } from '@material-ui/core';

class AddItemDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            type: '',
            qty: 0,
            years: '',
            links: '',
            locations: [],
            images: ''
        }
    }

    handleClose = (event) => {
        this.props.showAddItemDialog(false);
        this.setState({
            name: '',
            type: '',
            qty: 0,
            years: '',
            links: '',
            locations: [],
            images: ''
        })
    }

    handleSubmit = (event) => {
        //validation
        if (this.state.type === '') {
            alert('Item needs a type!')
        } else if (this.state.locations.length === 0) {
            alert('Must include at least 1 location!')
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
            //cleanup and send
            this.setState({
                ...this.state,
                name: this.state.name.trim(),
                years: this.state.years.split(',').map((ele, index) => {
                    return ele.trim()
                }),
                links: this.state.links.split(',').map((ele, index) => {
                    return ele.trim()
                }),
                images: this.state.images.split(',').map((ele, index) => {
                    return ele.trim()
                })
            })
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
                    <Grid>
                        <FormControl>
                            <TextField className='m5' type='text' name='name' value={this.state.name} onChange={this.handleChange}></TextField>
                            <FormHelperText>Item Name</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Select className='m5' name='type' value={this.state.type} onChange={this.handleChange}>
                                <MenuItem value='Costume'>Costume</MenuItem>
                                <MenuItem value='Prop'>Prop</MenuItem>
                                <MenuItem value='Gear'>Gear</MenuItem>
                            </Select>
                            <FormHelperText>Type</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField className='m5 qtyInput' type='number' name='qty' value={this.state.qty} onChange={this.handleChange}></TextField>
                            <FormHelperText>Quantity</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container direction='column'>
                        <FormControl>
                            <Select multiple className='m5' name='locations' value={this.state.locations} onChange={this.handleChange}>
                                <MenuItem value='Houston Hall Locker 30'>Houston Hall Locker 30</MenuItem>
                                <MenuItem value='Houston Hall Locker 31'>Houston Hall Locker 31</MenuItem>
                                <MenuItem value='Platt Locker'>Platt Locker</MenuItem>
                            </Select>
                            <FormHelperText>Locations</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField className='m5' type='text' name='years' value={this.state.years} onChange={this.handleChange}></TextField>
                            <FormHelperText>Year Used (comma separated)</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField className='m5' type='text' name='links' value={this.state.links} onChange={this.handleChange}></TextField>
                            <FormHelperText>Links (comma separated)</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <TextField className='m5' type='text' name='images' value={this.state.images} onChange={this.handleChange}></TextField>
                            <FormHelperText>Image Links (comma separated)</FormHelperText>
                        </FormControl>
                    </Grid>
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
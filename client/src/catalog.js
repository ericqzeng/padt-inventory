import React from 'react';
import axios from 'axios'
import { FormHelperText, Button, Select, TextField, FormControl, MenuItem } from '@material-ui/core';

//TODO: maybe just the search component instead?
class Catalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            type: '',
            // years: []
        }
    }

    doSearch = (event) => {
        event.preventDefault()
        console.log('execute serach...')
        var query = {}
        for (let e in this.state) {
            if (this.state[e] !== null && this.state[e] !== '') {
                query[e] = this.state[e]
            }
        }
        console.log(query)
        axios.get('/api/catalog', { params: query }).then(res => {
            console.log(res)
        }, err => {
            alert(err)
        });
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.doSearch} >
                    <FormControl>
                        <TextField name='name' value={this.state.name} onChange={this.changeHandler} placeholder='Item name' />
                    </FormControl>
                    <FormControl>
                        <Select name='type' value={this.state.type} onChange={this.changeHandler}>
                            <MenuItem value=''>Any</MenuItem>
                            <MenuItem value='Costume'>Costume</MenuItem>
                            <MenuItem value='Prop'>Prop</MenuItem>
                            <MenuItem value='Gear'>Gear</MenuItem>
                        </Select>
                        <FormHelperText>Type</FormHelperText>
                    </FormControl>
                    {/* <FormControl>
                        <TextField name="years" value={this.state.years} onChange={this.changeHandler}></TextField>
                        TODO: maybe add year filters?
                    </FormControl> */}
                    <Button onClick={this.doSearch} color='primary'>Full send</Button>
                </form>

            </div>
        );
    }
}

export default Catalog;
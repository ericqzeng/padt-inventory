import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { setResults } from '../redux/actions'
import { FormHelperText, Button, Select, TextField, FormControl, MenuItem, Paper } from '@material-ui/core';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            type: ''
        }
    }

    doSearch = (event) => {
        event.preventDefault()
        var query = {}
        for (let e in this.state) {
            if (this.state[e] !== null && this.state[e] !== '') {
                query[e] = this.state[e]
            }
        }
        console.log('execute serach with:')
        console.log(query)
        axios.get('/api/catalog', { params: query }).then(res => {
            console.log(res)
            if (!Array.isArray(res.data)) {
                alert(res); //is an error
            }
            else {
                this.props.setResults(res.data) //redux
            }
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
                <Paper>
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
                </Paper>
            </div>
        );
    }
}

//redux boilerplate
function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = {
    setResults
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
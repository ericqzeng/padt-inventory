import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { FormHelperText, Button, TextField, FormControl, Grid, Typography } from '@material-ui/core';


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            pass: '',
            yearJoined: '',
            admin: false,
            redirect: false
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        const { redirect, ...data } = this.state
        axios.post('/api/account/addUser', data).then(res => {
            this.setState({
                redirect: true
            })
        }, err => {
            //TODO: errors still don't really work but ok
            console.log(err)
            alert(err)
        })
    }

    //TOOD: login submits not taking onEnter submission, maybe Grid is interfereing?
    render() {
        if (this.state.redirect) {
            return (<Redirect to='/' />)
        } else {
            return (
                <Grid container direction='column' alignItems='center'>
                    <Typography>New User</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container direction='column' alignItems='center'>
                            <FormControl>
                                <TextField name='name' value={this.state.name} onChange={this.handleChange} />
                                <FormHelperText>Name</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField name='email' value={this.state.email} onChange={this.handleChange} />
                                <FormHelperText>Email</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField type='password' name='pass' value={this.state.pass} onChange={this.handleChange} />
                                <FormHelperText>Password</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField name='yearJoined' value={this.state.yearJoined} onChange={this.handleChange} />
                                <FormHelperText>Year Joined</FormHelperText>
                            </FormControl>
                            <Button onClick={this.handleSubmit}>Sign Up</Button>
                        </Grid>
                    </form>
                </Grid>
            );
        }
    }
}

export default connect((state) => {
    return state
})(Signup)


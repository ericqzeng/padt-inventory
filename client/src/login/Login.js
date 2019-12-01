import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { FormHelperText, Button, TextField, FormControl, Grid, Typography } from '@material-ui/core';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pwd: '',
            redirect: false,
            signup: false
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
        axios.post('/api/account/login', {
            email: this.state.email,
            pwd: this.state.pwd
        }).then(res => {
            this.setState({
                redirect: true
            })
        }, err => {
            //TODO: login error messages don't work?
            console.log(err.message);
            alert(err)
        })
    }

    handleSignup = (event) => {
        this.setState({
            ...this.state,
            signup: true
        })
    }

    //TOOD: login submits not taking onEnter submission, maybe Grid is interfereing?
    render() {
        if (this.state.redirect) {
            return (<Redirect to='/catalog' />)
        } else if (this.state.signup) {
            return (<Redirect to='/signup' />)
        } else {
            return (
                <Grid container direction='column' alignItems='center'>
                    <Typography>PADT Inventory</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container direction='column' alignItems='center'>
                            <FormControl>
                                <TextField name='email' value={this.state.email} onChange={this.handleChange} />
                                <FormHelperText>Email</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <TextField type='password' name='pwd' value={this.state.pwd} onChange={this.handleChange} />
                                <FormHelperText>Password</FormHelperText>
                            </FormControl>
                            <Grid container item xs={12} justify='center'>
                                <Button onClick={this.handleSubmit}>Login</Button>
                                <Button onClick={this.handleSignup}>Signup</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            );
        }
    }
}

export default connect((state) => {
    return state
})(Login)


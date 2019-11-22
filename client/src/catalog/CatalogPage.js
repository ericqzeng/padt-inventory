import React from 'react';
import { connect } from 'react-redux'
import { FormHelperText, Button, Select, TextField, FormControl, MenuItem, Paper, Grid, Typography } from '@material-ui/core';
import ItemCell from './ItemCell'
import Search from './Search'
import ItemDialog from './ItemDialog'

class CatalogPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let table = this.props.data.map((ele, index) => {
            return (
                <ItemCell key={index} index={index} data={ele}></ItemCell>
            )
        })

        return (
            <div>
                <Grid container direction='column' justify='center' alignItems='center' alignContent='center' spacing={5}>
                    <Grid item xs={10}>
                        <Search></Search>
                    </Grid>

                    <Grid item xs={10} container direction='row' justify='center' alignItems='flex-start' alignContent='center' spacing={1}>
                        {table}
                    </Grid>
                </Grid>
                <ItemDialog></ItemDialog>
            </div>
        );
    }
}

export default connect((state) => {
    return state
})(CatalogPage)
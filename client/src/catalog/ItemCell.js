import React from 'react';
import { connect } from 'react-redux';
import { setItemDialogData } from '../redux/actions';
import { Grid, Typography, Card } from '@material-ui/core';

class ItemCell extends React.Component {
    constructor(props) {
        super(props)
    }

    itemClicked() {
        console.log('clicked!')
        this.props.setItemDialogData(this.props.data, true)
        //TODO: expand to detailed view and allow for reservation
    }

    //TODO: get photos from S3
    render() {
        let index = this.props.index
        let data = this.props.data
        return (
            <Grid key={index} item xs={4} onClick={() => this.itemClicked()}>
                <Card>
                    <Typography variant='body1'>{data.images}</Typography>
                    <Typography variant='h6'>{data.name}</Typography>
                    <Grid container justify="space-between" direction="row">
                        <Typography variant='body2'>{data.type}</Typography>
                        <Typography variant='body2'>Qty: {data.qty}</Typography>
                    </Grid>
                </Card>
            </Grid>
        )
    }
}

export default connect(null, { setItemDialogData })(ItemCell)
import React from 'react';
import { connect } from 'react-redux';
import { setItemDialogData } from '../redux/actions';
import { Grid, Typography, Card, CardMedia, CardContent, CardActionArea } from '@material-ui/core';

class ItemCell extends React.Component {

    itemClicked() {
        console.log('clicked!')
        this.props.setItemDialogData(this.props.data, true)
        //TODO: expand to detailed view and allow for reservation
    }

    //TODO: get photos from S3
    render() {
        let index = this.props.index
        let data = this.props.data

        let cardMedia = this.props.data.images[0] ? (
            <CardMedia
                component="img"
                alt={this.props.data.images[0]}
                height="200"
                image={this.props.data.images[0]} />
        ) : (
                <CardMedia />
            );
        return (
            <Grid key={index} item xs={6} md={4} onClick={() => this.itemClicked()}>
                <Card>
                    <CardActionArea>
                        {cardMedia}
                        <CardContent>
                            <Typography variant='h6'>{data.name}</Typography>
                            <Grid container justify="space-between" direction="row">
                                <Typography variant='body2'>{data.type}</Typography>
                                <Typography variant='body2'>Qty: {data.qty}</Typography>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
}

export default connect(null, { setItemDialogData })(ItemCell)
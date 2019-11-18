import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input'

class Catalog extends React.Component {
    constructor(props) {
        super(props)
    }

    doSearch = (event) => {
        console.log('execute serach!')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.doSearch} >
                    <Input placeholder='Name Search'></Input>
                    <Button onClick={this.doSearch} color='primary'>ayyo</Button>
                </form>

            </div>
        );
    }
}

export default Catalog;
import React, {PureComponent} from 'react';
import {Box, Container} from '@material-ui/core';

export default class ContenContainer extends PureComponent {

    render() {
        return (
            <Container maxWidth="md">
                {this.props.children}
            </Container>
        );
    }
}


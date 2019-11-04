import React, {Component} from 'react';
import {Box, Button} from "@material-ui/core";
import {UserAPI} from '../../apis/UserAPI'

export default class HomeComponent extends Component {

    render() {
        return (
            <Box className="row5" height="100%">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        UserAPI.singOut()
                    }}>
                    Đăng xuất
                </Button>
            </Box>
        );
    }
}

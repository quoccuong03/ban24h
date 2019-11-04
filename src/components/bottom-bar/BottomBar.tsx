import React, {PureComponent} from 'react';
import {boundMethod} from 'autobind-decorator';
import {Box, withStyles, createStyles, WithStyles} from '@material-ui/core';
import {CSSProperties} from "@material-ui/core/styles/withStyles";

type ClassKey = "container"
const styles = createStyles<ClassKey, CSSProperties>({
    container: {height: 200, minHeight: 200, backgroundColor: "yellow"}
});

interface Props extends WithStyles<ClassKey> {
    // data: SiteStateObj
}

class BottomBar extends PureComponent<Props> {


    render() {
        let {classes} = this.props;
        return (
            <Box className={classes.container}>
                Bottom BarF
            </Box>
        );
    }
}

export default withStyles<any, any, any>(styles)(BottomBar);

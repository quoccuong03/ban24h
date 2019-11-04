import React, {PureComponent} from 'react';
import {withStyles, createStyles, WithStyles, Theme, Card} from '@material-ui/core';
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import clsx from "clsx";

const styles = ({spacing}: Theme) => createStyles({
    container: {padding: spacing(1), marginBottom: spacing(3)} as CSSProperties,
});

interface Props extends WithStyles<typeof styles> {
    className?: string
}

class CardContentCommon extends PureComponent<Props> {


    render() {
        let {classes} = this.props;
        return (
            <Card className={clsx("full-w", classes.container, this.props.className)}>
                {this.props.children}
            </Card>
        );
    }
}

export default withStyles(styles)(CardContentCommon);

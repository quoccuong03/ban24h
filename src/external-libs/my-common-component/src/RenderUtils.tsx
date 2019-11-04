import React, {ReactElement} from 'react';
import {CircularProgress, PropTypes, StandardProps, Typography, Divider} from '@material-ui/core';

export class RenderUtils {

    static renderDivider(params?: { key?: any, className?: string }) {
        return <Divider {...params} />;
    }

    static renderText(params: TextProps) {
        let {text, child, ...other} = params;
        return (
            <Typography {...other}>
                {text}
                {child}
            </Typography>
        );
    }

    static renderProgress(params?: CircularProgressProps): ReactElement {
        return (
            <CircularProgress {...params}            />
        );
    }
}

//
// export function makeStyles(theme: Theme) {
//     return createStyles({
//         root: { /* ... */ },
//         paper: { /* ... */ },
//         button: { /* ... */ },
//     });
//
//     // return makeStyles((theme: Theme) =>
//     //     createStyles({
//     //         button: {
//     //             margin: theme.spacing(1),
//     //         },
//     //         input: {
//     //             display: 'none',
//     //         },
//     //     }),
//     // );
// }

export type CircularProgressProps = {
    key?: any
    className?: string
    color?: 'primary' | 'secondary' | 'inherit';
    disableShrink?: boolean;
    size?: number | string;
    thickness?: number;
    value?: number;
    variant?: 'determinate' | 'indeterminate' | 'static';
}

export type TextProps = {
    key?: any
    text: string,
    child?: any
    className?: string
    align?: PropTypes.Alignment;
    color?:
        | 'initial'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'textPrimary'
        | 'textSecondary'
        | 'error';
    component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
    display?: 'initial' | 'block' | 'inline';
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'srOnly' | 'inherit';
}

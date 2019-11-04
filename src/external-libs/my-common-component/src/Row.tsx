import React, {PureComponent} from 'react';
import clsx from "clsx";

interface Props {
    className?: string
    dial?: number
    flex1?: boolean
}

export default class Row extends PureComponent<Props> {

    render() {
        let {className, dial, flex1} = this.props;
        let classN = clsx(className, flex1 ? "flex-row-1" : "flex-row", dial != null && ("row-dial" + dial));
        return (
            <div className={classN}>
                {this.props.children}
            </div>
        );
    }
}

import React, {PureComponent} from 'react';
import clsx from "clsx";

interface Props {
    className?: string
    dial?: number
    flex1?: boolean
}

export default class Col extends PureComponent<Props> {

    render() {
        let {className, dial, flex1} = this.props;
        let classN = clsx(className, flex1 ? "flex-col-1" : "flex-col", dial != null && ("col-dial" + dial));
        return (
            <div className={classN}>
                {this.props.children}
            </div>
        );
    }
}

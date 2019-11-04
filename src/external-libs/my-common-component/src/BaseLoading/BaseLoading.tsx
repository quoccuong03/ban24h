import React, {Component, ReactElement} from 'react';
import {isEqual} from "lodash"
import {CommonUtils, sendError} from "../../../my-common-utils/src";
import styles from "./BaseLoading.module.scss";
import {RenderUtils} from "../RenderUtils";
import {Typography} from "@material-ui/core";

export interface BaseLoadingProps {
    renderLoading?: () => any,
    renderError?: () => any, //renderErrorView(reloadCallback)
    diableAutoLoad?: boolean,
}

export interface BaseLoadingStates {
    isLoading?: boolean,
    isError?: boolean
}

/*
- Có thể gọi setState trong hàm onLoadStartAsync
- Chỉ update State change
- Không sử dụng VContainerLoad vì khi muốn setState cho chính component này
* */
export abstract class BaseLoading<P extends BaseLoadingProps, S extends BaseLoadingStates> extends Component<P, S> {

    protected abstract onLoadStartAsync(): Promise<boolean>

    protected abstract renderContent(): ReactElement

    protected getInittialState(): S {
        return null;
    }

    protected isShowProgressLoading(): boolean {
        return false
    }

    protected abstract renderContainer(child);

    constructor(props) {
        super(props);
        let obj = this.getInittialState();
        if (obj == null) obj = {} as any;
        obj.isLoading = true;
        this.state = obj;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.state, nextState);
    }

    async componentDidMount() {
        if (!this.props.diableAutoLoad) {
            return this.reload();
        }
    }

    public async reload() {
        try {
            let success = await this.onLoadStartAsync();
            this.setState({isLoading: false, isError: !success})
        } catch (e) {
            sendError("BaseLoading Load");
            sendError(e);
            this.setState({isLoading: false, isError: true})
        }
    }

    render(): any {
        let child;
        if (this.state.isLoading)
            child = this._renderLoading();
        else if (this.state.isError)
            child = this._renderError();
        else
            child = this.renderContent();
        return this.renderContainer(child);
    }

    private _renderError() {
        return RenderUtils.renderText({
            text: "Có lỗi sảy ra, vui lòng thử lại sau",
            className: styles.error, variant: "body1"
        })
    }

    private _renderLoading() {
        if (!this.isShowProgressLoading()) return null;
        return RenderUtils.renderProgress({className: styles.loading});
    }
}

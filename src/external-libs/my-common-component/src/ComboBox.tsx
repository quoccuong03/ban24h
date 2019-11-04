import React, {Component, PureComponent} from 'react';
import { withStyles, createStyles, WithStyles, Select, InputBase, NativeSelect} from '@material-ui/core';
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import {isEmpty} from "../../my-common-utils/src";
import {isEqual} from "lodash"

type ClassKey = 'height'
const styles = createStyles<ClassKey, CSSProperties>({
    height: {height: 40}
});

export interface ComboBoxItemData {
    value: string | number | string[],
    title: string
}

interface Props extends WithStyles<ClassKey> {
    sourceData: {
        listItems?: ComboBoxItemData[]
        fetchData?: () => Promise<ComboBoxItemData[]>
    }
    onChange?: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void
    /**Giá trị sẽ được selected, nó là value trong cái seleced*/
    value?: string | number | string[]
    /* thường hay sử dụng cho FormControl */
    id?: string
    className?: string
    placeHoder?: string
    disabled?: boolean
}

type States = { loading: boolean, listItems?: ComboBoxItemData[] };

/**Chỉ fetch dũ liệu 1 lần, nếu có hàm fetchData*/
class ComboBox extends Component<Props, States> {
    constructor(props) {
        super(props);
        // this.props.classes.
        let {sourceData} = this.props;
        this.state = {loading: false, listItems: sourceData.listItems};
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<States>, nextContext: any): boolean {
        if (this.props.disabled && nextProps.disabled) return false;
        return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
    }

    async componentDidMount() {
        return this.loadingData();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<States>, snapshot?: any): void {
        this.loadingData();
    }

    private async loadingData() {
        if (!this.props.disabled && isEmpty(this.state.listItems) && !this.state.loading && this.props.sourceData.fetchData != null) {
            let listItems = await this.props.sourceData.fetchData();
            this.setState({listItems: listItems, loading: false});
        }
    }

    render() {
        let {classes} = this.props;
        return (
            <NativeSelect
                className={this.props.className}
                value={this.props.value}
                disabled={this.props.disabled}
                onChange={this.props.onChange}
                input={<BootstrapInput id={this.props.id} className={classes.height}/>}
            >
                {this.props.placeHoder && <option value="">{this.props.placeHoder}</option>}
                {this._renderOptions()}
            </NativeSelect>
        );
    }

    _renderOptions(): any {
        let {sourceData} = this.props;
        if (this.state.loading) {
            return (
                <>
                    <option value="load">Loading...</option>
                </>
            );
        } else if (!isEmpty(this.state.listItems)) {
            return this.state.listItems.map((value, index) => {
                return <option key={index} value={value.value}>{value.title}</option>;
            })
        }
    }
}

export default withStyles<any, any, any>(styles)(ComboBox);

const stylesBootstrapInput = (theme) => createStyles<any, any>({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        // fontFamily: [
        //     '-apple-system',
        //     'BlinkMacSystemFont',
        //     '"Segoe UI"',
        //     'Roboto',
        //     '"Helvetica Neue"',
        //     'Arial',
        //     'sans-serif',
        //     '"Apple Color Emoji"',
        //     '"Segoe UI Emoji"',
        //     '"Segoe UI Symbol"',
        // ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
});

const BootstrapInput = withStyles<any, any, any>(stylesBootstrapInput)(InputBase);

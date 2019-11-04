import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './GlobalStyles.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import {Provider} from "react-redux";
import {initPrototype} from "./external-libs/my-common-utils/src";

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept();
}

initPrototype();

class AppRedux extends Component {
    render() {
        return (<Provider store={store}>
            <App/>
        </Provider>);
    }
}

ReactDOM.render(<AppRedux/>, document.getElementById('root'));
// ReactDOM.render(<AppRedux/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

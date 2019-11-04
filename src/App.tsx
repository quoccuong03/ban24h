import React from 'react';
import { CssBaseline} from '@material-ui/core';
import HeaderBar from "./components/header-bar/HeaderBar";
import {createMuiTheme} from '@material-ui/core/styles';
import {blue} from "@material-ui/core/colors";
import SinginComponent from './layout/user-login/SinginComponent';
import {StylesProvider, ThemeProvider} from '@material-ui/styles';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomeComponent from "./layout/home/HomeComponent";
import DangTinComponent from "./layout/dang-tin/DangTinComponent";
import SignupComponent from "./layout/user-login/SignupComponent";
import {RenderUtils} from "./external-libs/my-common-component/src";
import ForgotPassComponent from "./layout/user-login/ForgotPassComponent";
import ResetMessage from "./layout/user-login/ResetMessage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
let theme = createMuiTheme({
    palette: {
        primary: blue,
        type: "light"
    }
});

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <CssBaseline/>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <HeaderBar
                    />
                    <ToastContainer />
                    {RenderUtils.renderDivider()}
                    <Switch>
                        <Route exact path="/" component={HomeComponent}/>
                        <Route exact path="/dangtin" component={DangTinComponent}/>
                        <Route exact path="/signin" component={SinginComponent}/>
                        <Route exact path="/signup" component={SignupComponent}/>
                        <Route exact path="/forgot-pass" component={ForgotPassComponent}/>
                        <Route exact path="/send-password-email/:email" component={ResetMessage}/>
                        <Route component={HomeComponent}/>
                    </Switch>
                </ThemeProvider>
            </StylesProvider>
        </BrowserRouter>
    );
};

export default App;

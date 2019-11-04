import React, {Component, CSSProperties,} from 'react';
import {AppBar, IconButton, Toolbar, Button, Box, Hidden, Theme, createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';
import {IReduxState} from "../../redux/store";
import {loginSuccess, logoutSuccess} from "../../redux/user/UserReducers";
import connect from 'redux-connect-decorator';
import {User} from "../../models/ObjsType";
import {RouteComponentProps, RouteProps, withRouter} from "react-router-dom";
import {boundMethod} from "autobind-decorator";
import clsx from "clsx";
import ContenContainer from "../ContenContainer";
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {FirebaseAuthUtils} from "../../external-libs/my-firebase-utils/auth/FirebaseAuthUtils";
import { Link } from 'react-router-dom';
interface Props extends WithStyles<ClassKey> {
    user?: User
    logoutSuccess?: VoidFunction,
    loginSuccess?: (user: User) => void
}

function mapStateToProps(state: IReduxState, ownProps?: Props) {
    return {
        user: state.userState.user
    }
}

@connect(mapStateToProps, {loginSuccess, logoutSuccess})
class HeaderBar extends Component<Props & RouteComponentProps> {
    componentDidMount(): void {
        FirebaseAuthUtils.onAuthStateChanged((fb_user) => {
            if (fb_user == null) {
                this.props.logoutSuccess();
            } else {
                let user: User = {name: fb_user.displayName, email: fb_user.email, img: fb_user.photoURL, id: fb_user.uid};
                this.props.loginSuccess(user)
            }
        });
    }

    @boundMethod
    _btnDangTinClick() {
        this._changePath("/dangtin");
    }

    render() {
        let {classes, location} = this.props;
        let currentPath = location.pathname;
        return (
            <Box className={clsx(classes.container, classes.height, "row5")}>
                <ContenContainer>
                    <Box className="flex-row full-w row4">
                        <Box className="flex-row-1">
                            <Link to="/" className={clsx("row5", classes.height)}>
                                <img className={this.props.classes.logo} src="assets/logo.png"/>
                            </Link>
                        </Box>
                        {this._renderAccount()}
                        <Button color="primary" variant="outlined"
                                onClick={()=>{
                                    this.props.history.push('/dangtin')
                                }}
                                className={`${classes.buttonDangtin} buttonDangtin`}>
                            Đăng tin
                            <CreateIcon className={classes.createIcon}/>
                        </Button>
                    </Box>
                </ContenContainer>
            </Box>
        );
    }

    _renderAccount() {
        let {classes, user} = this.props;
        if (user != null) {
            //TODO href
            return (
                <Link to="/"  className={clsx("row5", classes.height, classes.containerAccount)}>
                    <AccountCircleIcon color="primary"/>
                    <Typography className={classes.accountText}>
                        {user.name || user.email}
                    </Typography>
                </Link>
            );
        }

        return (
            <Link  to="/signin" color="textSecondary"
                  className={clsx("row5", classes.height, classes.containerAccount)}>
                <AccountCircleIcon className={classes.logoAccount}/>
                <Typography>
                    Đăng nhập
                </Typography>
            </Link>
        );
    }

    //region utils
    _changePath(path: string) {
        if (this.props.location.pathname !== path)
            this.props.history.push(path);
    }

    //endregion
}


type ClassKey = "accountText" | "logoAccount" | "containerAccount" | "container" | "height" | "logo" | "buttonDangtin" | "createIcon";
const styles = ({spacing}: Theme) => createStyles<ClassKey, CSSProperties>({
    buttonDangtin: {height: 40},
    container: {backgroundColor: "white"},
    containerAccount: {marginRight: spacing(1)},
    logoAccount: {marginRight: 2},
    accountText: {maxWidth: 120, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: "hidden"},
    height: {height: 51},
    logo: {height: 25},
    createIcon: {fontSize: 16, marginLeft: spacing(1)}
});


// @ts-ignore
export default withStyles<any, any, any>(styles)(withRouter<Props>(HeaderBar));

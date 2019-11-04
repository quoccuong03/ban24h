declare module 'redux-connect-decorator' {
    /* Example
    interface Props {
        user?: User
    }

    function mapStateToProps(state: IReduxState, ownProps?: Props): Props {
        return {
            user: state.user.user
        }
    }

    @connect(mapStateToProps, {loginSuccess, logoutSuccess})
    export class HeaderBar extends Component<Props> {
        ....
    * */
    const connect: (mapStateToProps, mapDispatchToProps) => any;

    export default connect;
}


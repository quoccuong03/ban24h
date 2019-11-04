import React, { PureComponent } from 'react'
import {  toast } from 'react-toastify';
export class FacebookLoginButton extends PureComponent {

  constructor(){
    super()
    this.state = {
      FB: null
    }
    this.initializeFacebookLogin = this.initializeFacebookLogin.bind(this)
    this.facebookLogin = this.facebookLogin.bind(this)
    this.checkLoginStatus = this.checkLoginStatus.bind(this)
  }

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin());
  }
  
  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin());
  }


  initializeFacebookLogin() {
    this.setState({FB : window.FB})
  }

  checkLoginStatus ()  {
    this.state.FB.getLoginStatus(this.facebookLoginHandler)
  }

  facebookLoginHandler = (response) => {
    const {FB} =  window
    if (response.status === 'connected') {
      FB.api('/me?fields=languages,id,email,name,birthday,gender,location', userData => {
        let result = {
          ...response,
          ...userData
        };
        if(this.props.onResponse){
          this.props.onResponse(result)
        }
      })
    } else {
      const message =  response.error &&  response.error.message ? response.error.message : 'Đã có lỗi xảy ra.'
      toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT
      })
    }
  }

  facebookLogin (){
    const {FB} = window
    if (!FB) {
      // showErrorAlert(["Something was wrong !"])
      return
    }else{
      FB.getLoginStatus(response => {
        FB.login(this.facebookLoginHandler, {scope: 'public_profile,email,user_birthday,user_gender,user_location'});
      })
    } 
  }

  render() {
    return (
      <img  className="sign-in__button sign-in__button-facebook" src='/assets/img/face_book_button.svg' alt='facebook' onClick={()=>this.facebookLogin()}></img>
    )
  }
}

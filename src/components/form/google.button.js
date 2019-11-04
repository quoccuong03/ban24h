import React, { PureComponent } from 'react'
import {  toast } from 'react-toastify';
export class GoogleLoginButton extends PureComponent {
  
  constructor(props){
    super(props)
    this.state = {
      googleAuth: null
    }
    this.googleLoginHandler= this.googleLoginHandler.bind(this)
  }

  componentDidMount() {
    document.addEventListener('GoogleObjectReady', this.initializeGoogleLogin());
  }
  
  componentWillUnmount() {
    document.removeEventListener('GoogleObjectReady', this.initializeGoogleLogin());
  }

  initializeGoogleLogin() {
    this.setState({
      googleAuth: window.gapi&&window.gapi.auth2 ? window.gapi.auth2 : ""
    })
  }

  handleGoogleLogin(){
    let { googleAuth } =this.state
  
    if(!googleAuth||googleAuth!==""){
      if(window.gapi) {
        googleAuth=window.gapi
      }
    }

    if(googleAuth) {
      googleAuth.auth2.getAuthInstance().signIn().then((data) =>{
        this.googleLoginHandler(data,this.props.onResponse)
      });
    }else {
      const message =   'Đã có lỗi xảy ra.'
      toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT
      })
    }
  }
  
  googleLoginHandler(googleUser,onResponse){
    //process google data and request API
    let profile = googleUser.getBasicProfile();
    let authResponse= googleUser.getAuthResponse()
    let result={
      ...authResponse,
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
    }
    if(onResponse){
      onResponse(result)
    }
  } 

  render() {
    return (
      <img   className="sign-in__button sign-in__button-google" src='/assets/img/google_button.svg' alt='google' onClick={()=>this.handleGoogleLogin()}></img>
    )
  }
}


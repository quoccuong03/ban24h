import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import {UserAPI} from '../../apis/UserAPI'
import {  toast } from 'react-toastify'
import Validator from "../../helper/Validator"
const rules = {
	email: [
		{ required: true, message: "Trường này không được để  trống" },
		{ email: true, message: "Email không hợp lệ !" }
	]
}


export default class ForgotPassComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			validator: Validator.init(rules),
			email: "",
		}
	}
	handleChange(name, value) {
		const validator = Validator.update(name, value)
	
		this.setState({ [name]: value, validator })
	}
  handleSubmit(e){
    e.preventDefault()
    const {email} = this.state
    const validator = Validator.test({
			email,
		  })
    let checkValidte = validator.isValid
    this.setState({validator}) 
    if(checkValidte){
      UserAPI.resetPassword(email).then(result=>{
        const {isSuccess,errorMessage} = result
  
        if(isSuccess){
          this.props.history.push(`/send-password-email/${email}`)
        }else{
          toast.error(errorMessage, {
            position: toast.POSITION.BOTTOM_LEFT
            })
        }
      })
    }
 
  }
	render() {
    const {email, validator} = this.state
		return (
			<Container component="main" maxWidth="sm">
				<section className="sign-in">
					<div className="sign-in__box">
						<Typography className="sign-in__title" component="h1" variant="h5">
                          Quên mật khẩu
						</Typography>
                        <div className="MuiFormControl-marginNormal sign-in__title-sub">
                        Vui lòng cung cấp thông tin dưới đây để nhận lại mật khẩu của bạn.
                        </div>
						<form onSubmit={(e)=>{this.handleSubmit(e)}} noValidate className="sign-in__form">
							<TextField
								color="secondary"
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Địa chỉ email"
								name="email"
								autoComplete="email"
								autoFocus
                value={email}
                onChange={(e)=>{this.handleChange('email', e.target.value)}}
                error={validator.email && validator.email.message? true : false}
								helperText={validator.email && validator.email.message ? validator.email.message: null}
							/>
							
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className="MuiFormControl-marginNormal">
								Lấy lại mật khẩu
							</Button>

						</form>
					</div>
				</section>
			</Container>
		)
	}
}

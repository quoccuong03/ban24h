import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { CircularProgress } from "@material-ui/core"
import { Link } from "react-router-dom"
import Validator from "../../helper/Validator"
import { UserAPI } from "../../apis/UserAPI"
import { toast } from "react-toastify"

const rules = {
	email: [
		{ required: true, message: "Trường này không được để  trống" },
		{ email: true, message: "Email không hợp lệ !" }
	],
	password: [{ required: true, message: "Trường này không được để  trống" }]
}

export default class SignupComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			validator: Validator.init(rules),
			email: "",
			password: "",
			isSubmit: false
		}
	}

	handleChange(name, value) {
		const validator = Validator.update(name, value)

		this.setState({ [name]: value, validator })
	}

	handleAfterSigninUp(result) {
		const { isSuccess, errorMessage } = result
		this.setState({
			isSubmit: false
		},()=>{
			if (!isSuccess) {
				toast.error(errorMessage, {
					position: toast.POSITION.BOTTOM_LEFT
				})
			} else {
				toast.success("Tài khoản của bạn đã được đăng ký thành công", {
					position: toast.POSITION.BOTTOM_LEFT
				})
				this.props.history.push("/")
			}
		})
	}
	handleSubmit(e) {
		e.preventDefault()
		const { email, password } = this.state
		const validator = Validator.test({
			email,
			password
		})
		let checkValidte = validator.isValid
		this.setState({ validator })
		if (checkValidte) {
			this.setState({
				isSubmit: true
			},()=>{
				UserAPI.createUserWithEmailAndPassword(email, password).then(result => {
					this.handleAfterSigninUp(result)
				})
			})
			
		}
	}
	render() {
		const { email, password, validator , isSubmit} = this.state
		return (
			<Container component="main" maxWidth="sm">
				<section className="sign-in">
					<div className="sign-in__box">
						<Typography className="sign-in__title" component="h1" variant="h5">
							Đăng ký
						</Typography>
						<form
							onSubmit={e => {
								this.handleSubmit(e)
							}}
							noValidate
							className="sign-in__form">
							<TextField
								color="secondary"
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Địa chỉ email"
								name="email"
								autoComplete="new-password"
								autoFocus
								onChange={e => {
									this.handleChange("email", e.target.value)
								}}
								value={email}
								error={validator.email && validator.email.message ? true : false}
								helperText={
									validator.email && validator.email.message ? validator.email.message : null
								}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="mật khẩu"
								type="password"
								id="password"
								autoComplete="new-password"
								value={password}
								onChange={e => {
									this.handleChange("password", e.target.value)
								}}
								error={validator.password && validator.password.message ? true : false}
								helperText={
									validator.password && validator.password.message
										? validator.password.message
										: null
								}
							/>

							<div className="loader__parent">
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									disabled={isSubmit}
									className="MuiFormControl-marginNormal">
									Đăng ký
								</Button>
								{isSubmit && <CircularProgress className="loader" />}
							</div>
							<div className="MuiFormControl-marginNormal text-right">
								<Link to={`/signin`}>
									<span className="sign-in__question">Bạn đã có tài khoản? </span> Đăng nhập
								</Link>
							</div>
						</form>
					</div>
				</section>
			</Container>
		)
	}
}

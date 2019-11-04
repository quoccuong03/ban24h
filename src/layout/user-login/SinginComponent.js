import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
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

export default class SinginComponent extends Component {
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

	handleAfterSignin(result) {
		const { isSuccess, errorMessage } = result

		this.setState({ isSubmit: false }, () => {
			if (!isSuccess) {
				toast.error(errorMessage, {
					position: toast.POSITION.BOTTOM_LEFT
				})
			} else {
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
		if (checkValidte) {
			this.setState({ isSubmit: true }, () => {
				UserAPI.signInWithEmailAndPassword(email, password).then(result => {
					this.handleAfterSignin(result)
				})
			})
		}
		this.setState({ validator })
	}

	handleSignInFace() {
		UserAPI.signInWithFaceBook().then(result => {
			this.handleAfterSignin(result)
		})
	}

	handleGoogleLogin() {
		UserAPI.signInWithGoogle().then(result => {
			this.handleAfterSignin(result)
		})
	}
	render() {
		const { email, password, validator, isSubmit } = this.state

		return (
			<Container component="main" maxWidth="sm">
				<section className="sign-in">
					<div className="sign-in__box">
						<Typography component="h1" variant="h5">
							Đăng nhập
						</Typography>

						<div className="MuiFormControl-marginNormal">
							<div className="sign-in__social">
								<img
									className="sign-in__button sign-in__button-facebook"
									src="/assets/img/face_book_button.svg"
									alt="facebook"
									onClick={() => this.handleSignInFace()}
								/>

								<img
									className="sign-in__button sign-in__button-google"
									src="/assets/img/google_button.svg"
									alt="google"
									onClick={() => this.handleGoogleLogin()}
								/>
							</div>
						</div>

						<form
							onSubmit={e => {
								this.handleSubmit(e)
							}}
							className="sign-in__form">
							<div className="flex">
								<div className="sign-in__line--or" />
								<div className="sign-in__line--text">Hoặc</div>
								<div className="sign-in__line--or" />
							</div>

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
								autoComplete="current-password"
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
									Đăng nhập
								</Button>
								{isSubmit && <CircularProgress className="loader" />}
							</div>
							<Grid className="MuiFormControl-marginNormal" container>
								<Grid item xs>
									<Link className="sign-in__lost-pass" to={`/forgot-pass`}>
										Quên mật khẩu?
									</Link>
								</Grid>
								<Grid item>
									<Link to={`/signup`}>
										<span className="sign-in__question">Bạn chưa là thành viên?</span>{" "}
										{" Đăng ký ngay"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</section>
			</Container>
		)
	}
}

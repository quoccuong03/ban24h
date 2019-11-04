import React, { Component } from "react"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"


export default class ResetMessageComponent extends Component {
    constructor(props) {
        super(props)
		this.state={

        }
        this.mail = props.match.params.email
	}

	render() {
		return (
			<Container component="main" maxWidth="sm">
				<section className="sign-in">
					<div className="sign-in__box">
						<Typography className="sign-in__title" component="h1" variant="h5">
                        Gửi thông tin mật khẩu
						</Typography>
                      
                        <div className="MuiFormControl-marginNormal sign-in__reset-message">
                            <span className='sign-in__reset-text'>
                            Muaban.net đã gửi thư thay đổi mật khẩu đến email {this.mail} của quý khách. Hãy làm theo hướng dẫn trong thư để thay đổi mật khẩu.
                            </span>
                            <span className='sign-in__reset-text'>
                            Thư có thể không có trong phần inbox, bạn nên kiểm tra thêm phần Spam/Bulk.
                            </span>
                        </div>
                     
                    </div>
				</section>
			</Container>
		)
	}
}

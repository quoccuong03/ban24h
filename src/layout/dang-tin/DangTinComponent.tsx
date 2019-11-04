import React, { Component, CSSProperties, PureComponent } from "react"
import ContenContainer from "../../components/ContenContainer"
import DangTinStep3 from "./DangTinStep3"
import {
	Box,
	Card,
	createStyles,
	Theme,
	withStyles,
	WithStyles,
	Button,
	IconButton
} from "@material-ui/core"
import Col from "../../external-libs/my-common-component/src/Col"
import { RenderUtils } from "../../external-libs/my-common-component/src"
import DangTinStep1 from "./DangTinStep1"
import DangTinStep2 from "./DangTinStep2"
import Row from "../../external-libs/my-common-component/src/Row"
import BackIcon from "@material-ui/icons/ArrowBackIos"
import { TinObjInput } from "../../models/ObjsType"
import { UserAPI } from "../../apis/UserAPI"
import { DataTypeUtils } from "../../external-libs/my-common-utils/src/DataTypeUtils"
import { boundMethod } from "autobind-decorator"

interface Props extends WithStyles<ClassKey> {}

type States = { step: number; tinIObj: TinObjInput; cateId: string ;cateSubId: string }

class DangTinComponent extends PureComponent<Props, States> {
	constructor(props) {
		super(props)
		let currentUser = UserAPI.getCurrentUser()
		this.state = {
			step: 1,
			tinIObj: {
				id: DataTypeUtils.getCurrentTimeSeconds() + currentUser.id.hashCode()
			},
			cateId: "bds",
			cateSubId: "",
		}
	}

	private _submitDangTin() {
		// TODO: Cập nhật this.state.tinIObj và gọi hàm này
		alert(JSON.stringify(this.state.tinIObj))
	}

	render() {
		let { classes } = this.props
		return (
			<Col className={classes.container}>
				<ContenContainer>
					{this._renderTop()}
					{this._renderContent()}
				</ContenContainer>
			</Col>
		)
	}

	_handleOnchange(step, cateId ,cateSubId) {
		this.setState({
			step,
			cateId,
			cateSubId
		})
	}
	_renderContent() {
		let { classes } = this.props
		let { step ,cateId ,cateSubId} = this.state
		if (step === 1)
			return (
				<DangTinStep1
					className={classes.contentContainer}

					onChangePage={(step, cateId,cateSubId) => {
						this._handleOnchange(step, cateId,cateSubId)
					}}
				/>
			)
		if (step === 2)
			return (
				<DangTinStep2
					className={classes.contentContainer}
					cateId={cateId}
					cateSubId={cateSubId}
					onChangePage={(step, cateId ,cateSubId) => {
						this._handleOnchange(step, cateId,cateSubId)
					}}
				/>
			)

		return <DangTinStep3 cateId={cateId} cateSubId={cateSubId} className={classes.contentContainer} />
	}

	@boundMethod
	_backClick() {
		if (this.state.step <= 1) return
		this.setState({ step: this.state.step - 1 })
	}

	_renderBackbtn(): any {
		if (this.state.step <= 1) return
		return (
			<Button  variant="outlined" onClick={this._backClick}>
				<BackIcon />
			</Button>
		)
	}

	_renderTop() {
		let { classes } = this.props
		let title
		if (this.state.step === 1) {
			title = "Chọn danh mục tin đăng"
		} else if (this.state.step === 2) {
			title = "STEP 2"
		} else {
			title = "Nhập thông tin"
		}

		return (
			<Row dial={4} className={classes.headerContainer}>
				{this._renderBackbtn()}
				{RenderUtils.renderText({
					text: title,
					variant: "h6",
					className: "flex-1",
					align: "center"
				})}
			</Row>
		)
	}
}

type ClassKey = "headerContainer" | "container" | "contentContainer"
const styles = ({ spacing }: Theme) =>
	createStyles<ClassKey, CSSProperties>({
		container: { backgroundColor: "white" },
		headerContainer: { padding: spacing(1), fontWeight: "bold",paddingLeft:'unset' },
		contentContainer: { marginTop: spacing(3), minHeight: 300 }
	}
	
	)

// @ts-ignore
export default withStyles<any, any, any>(styles)(DangTinComponent)

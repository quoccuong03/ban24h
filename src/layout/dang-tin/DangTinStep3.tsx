import React, { PureComponent } from "react"
import { boundMethod } from "autobind-decorator"
import {
	Box,
	withStyles,
	createStyles,
	WithStyles,
	Typography,
	TextField,
	Theme,
	Button,
	CircularProgress
} from "@material-ui/core"
import { CSSProperties } from "@material-ui/core/styles/withStyles"
import { RenderUtils } from "../../external-libs/my-common-component/src"
import ComboBox, {
	ComboBoxItemData
} from "../../external-libs/my-common-component/src/ComboBox"
import { DangTinUtils } from "./DangTinUtils"
import SelectAdressComponent from "./SelectAdressComponent"
import { green } from "@material-ui/core/colors"
import UploadImageComponent from "./UploadImageComponent"
import { TinObj } from "../../models/ObjsType"
import { pick } from "lodash"
import clsx from "clsx"
import Validator from "../../helper/Validator"
import NumberToWord from "../../helper/numberToword"
const rules = {
	contactName: [{ required: true, message: "Trường này không được để  trống" }],
	contactNumber: [
		{ required: true, message: "Trường này không được để  trống" },
		{ phone: true, message: "Số điện thoại không hợp lệ" }
	],
	acreage: [{ required: true, message: "Trường này không được để  trống" }],
	des: [{ required: true, message: "Trường này không được để  trống" }],
	huyen: [{ required: true, message: "Trường này không được để  trống" }],
	price: [
		{ required: true, message: "Trường này không được để  trống" },
		{ maxLength: true, max: 15, message: "Giá tiền quá lớn" }
	],
	street: [{ required: true, message: "Trường này không được để  trống" }],
	subCateId: [{ required: true, message: "Trường này không được để  trống" }],
	tinh: [{ required: true, message: "Trường này không được để  trống" }],
	title: [
		{ required: true, message: "Trường này không được để  trống" },
		{ minLength: true, min: 30, message: "Tiêu để  phải từ 30-70 ký tự" },
		{ maxLength: true, max: 70, message: "Tiêu để  phải từ 30-70 ký tự" }
	],
	xa: [{ required: true, message: "Trường này không được để  trống" }],
	contactEmail: [{ email: true, message: "Email không hợp lệ" }]
}
interface Props extends WithStyles<ClassKey> {
	className?: string
	cateId: string
	cateSubId: string
}

type States = {
	submiting: boolean
	tinh?: string
	huyen?: string
	xa?: string
	street: string
	cateId?: string
	price?: string
	title: string
	des: string
	contactName: string
	contactNumber: string
	contactEmail: string
	subCateId: string
	acreage?: string
	validator?: any
	image?: any
	action?: boolean
}

class DangTinStep3 extends PureComponent<Props, States> {
	constructor(props) {
		super(props)
		this.state = {
			submiting: false,
			contactEmail: "",
			street: "",
			title: "",
			des: "",
			contactName: "",
			contactNumber: "",
			subCateId: props.cateSubId || "",
			validator: Validator.init(rules),
			tinh: "",
			huyen: "",
			xa: "",
			price: "",
			acreage: "",
			action: false,
			image: []
		}
	}

	@boundMethod
	async _btnDangTinClick() {
		if (this.state.submiting) return
		let tinObj: TinObj = pick(this.state, [
			"title",
			"des",
			"subCateId",
			"tinh",
			"huyen",
			"xa",
			"price",
			"acreage",
			"contactName",
			"contactNumber",
			"contactEmail",
			"street"
		])
		tinObj.cateId = this.props.cateId
		tinObj.price = tinObj.price.replace(/,/g, "")
		const validator = Validator.test(tinObj)

		let checkValidte = validator.isValid

		this.setState({ validator, action: !this.state.action })
		if (checkValidte) {
			this.setState({ submiting: true })
		}
	}

	@boundMethod
	_onChangeInput(event) {
		const target = event.target
		const value = target.type === "checkbox" ? target.checked : target.value
		const name = target.name
		const validator = Validator.update(name, value)
		if (name === "price") {
			let newValue = value.toString().replace(/,/g, "")
			newValue = newValue.replace(/ /g, "")

			if (
				((+newValue && newValue.length < 16) || newValue === "") &&
				newValue.indexOf(".") === -1
			) {
				const newPrice = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
				this.setState({ [name]: newPrice, validator } as any)
			}
		} else {
			console.log(validator)
			this.setState({ [name]: value, validator } as any)
		}
	}

	//region select adress
	@boundMethod
	_onChangeSelelctAdress(tinh: string, huyen: string, xa: string) {
		let validator = Validator.update("tinh", tinh)
		validator = Validator.update("huyen", huyen)
		validator = Validator.update("xa", xa)
		this.setState({ tinh: tinh, huyen: huyen, xa: xa, validator })
	}

	_renderSelectAdress() {
		const { validator } = this.state

		return (
			<SelectAdressComponent
				tinh={this.state.tinh}
				huyen={this.state.huyen}
				xa={this.state.xa}
				onChange={this._onChangeSelelctAdress}
				error_tinh={
					validator.tinh && validator.tinh.message ? validator.tinh.message : null
				}
				error_xa={validator.xa && validator.xa.message ? validator.xa.message : null}
				error_huyen={
					validator.huyen && validator.huyen.message ? validator.huyen.message : null
				}
			/>
		)
	}

	//endregion

	//region button submit
	renderButtonSubmit() {
		let { classes } = this.props
		return (
			<div className={classes.btnSubmitContainer}>
				<Button
					color="primary"
					disabled={this.state.submiting}
					variant="contained"
					onClick={() => {
						this._btnDangTinClick()
					}}>
					Đăng tin
				</Button>
				{this.state.submiting && (
					<CircularProgress size={24} className={classes.buttonProgress} />
				)}
			</div>
		)
	}

	//endregion

	//region contact
	private _renderContact() {
		return (
			<Box mt={4} className="full-w">
				<Typography component="span" variant={"h6"}>
					Thông tin liên hệ
				</Typography>
				{RenderUtils.renderDivider()}
				{this._renderContactName()}
				{this._renderContactNumber()}
				{this._renderContactEmail()}
			</Box>
		)
	}

	private _renderContactEmail() {
		let { classes } = this.props
		const { validator } = this.state
		let child1 = DangTinUtils._renderLeftText("Email", false)
		let child2 = (
			<TextField
				InputProps={{ className: classes.heightCommon }}
				name="contactEmail"
				value={this.state.contactEmail}
				onChange={this._onChangeInput}
				fullWidth
				placeholder="Email"
				variant="outlined"
				inputProps={{ "aria-label": "bare" }}
				error={validator.contactEmail && validator.contactEmail.message ? true : false}
				helperText={
					validator.contactEmail && validator.contactEmail.message
						? validator.contactEmail.message
						: null
				}
			/>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	private _renderContactNumber() {
		let { classes } = this.props
		let child1 = DangTinUtils._renderLeftText("Số di động", true)
		let { validator } = this.state
		let child2 = (
			<TextField
				InputProps={{ className: classes.heightCommon }}
				fullWidth
				placeholder="Số di động"
				variant="outlined"
				inputProps={{ "aria-label": "bare" }}
				name="contactNumber"
				value={this.state.contactNumber}
				onChange={this._onChangeInput}
				error={
					validator.contactNumber && validator.contactNumber.message ? true : false
				}
				helperText={
					validator.contactNumber && validator.contactNumber.message
						? validator.contactNumber.message
						: null
				}
			/>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	private _renderContactName() {
		let { classes } = this.props
		let child1 = DangTinUtils._renderLeftText("Người liên hệ", true)
		let { validator } = this.state
		let child2 = (
			<TextField
				InputProps={{ className: classes.heightCommon }}
				fullWidth
				placeholder="Người liên hệ"
				variant="outlined"
				inputProps={{ "aria-label": "bare" }}
				name="contactName"
				value={this.state.contactName}
				onChange={this._onChangeInput}
				error={validator.contactName && validator.contactName.message ? true : false}
				helperText={
					validator.contactName && validator.contactName.message
						? validator.contactName.message
						: null
				}
			/>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	//endregion
	handleChangeImage(data) {
		const validator = Validator.update("acreage", data.length)
		this.setState({
			validator,
			image: data,
			acreage: data.length
		})
	}
	//region đăng hình ảnh
	private _renderDangHinhAnh() {
		let { classes } = this.props
		const { validator } = this.state
		let child1 = DangTinUtils._renderLeftText("Đăng hình ảnh", true)

		let child2 = (
			<UploadImageComponent
				handleChangeImage={data => {
					this.handleChangeImage(data)
				}}
				error_img={
					validator.acreage && validator.acreage.message
						? validator.acreage.message
						: null
				}
			/>
		)

		// (
		// <TextField
		//     rows="4"
		//     fullWidth
		//     multiline
		//     placeholder="Test"
		//     variant="outlined"
		//     inputProps={{'aria-label': 'bare'}}
		// />
		// );
		return DangTinUtils._renderRow(child1, child2, false)
	}

	//endregion

	//region EditText
	private _renderDes() {
		let { validator } = this.state
		let child1 = DangTinUtils._renderLeftText("Nội dung", true)
		let child2 = (
			<TextField
				rows="6"
				fullWidth
				multiline
				placeholder="Giới thiệu chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi: Gần công viên, ..."
				variant="outlined"
				inputProps={{ "aria-label": "bare" }}
				name="des"
				value={this.state.des}
				onChange={this._onChangeInput}
				error={validator.des && validator.des.message ? true : false}
				helperText={
					validator.des && validator.des.message ? validator.des.message : null
				}
			/>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	private _renderTitle() {
		let { classes } = this.props
		let child1 = DangTinUtils._renderLeftText("Tiêu đề", true)
		let { validator } = this.state
		let child2 = (
			<TextField
				InputProps={{ className: classes.heightCommon }}
				fullWidth
				placeholder="Tóm tắt ngắn gọn nội dung, dùng Tiếng Việt có dấu"
				variant="outlined"
				inputProps={{ "aria-label": "bare" }}
				name="title"
				value={this.state.title}
				onChange={this._onChangeInput}
				error={validator.title && validator.title.message ? true : false}
				helperText={
					validator.title && validator.title.message ? validator.title.message : null
				}
			/>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	private _renderGia() {
		let { classes } = this.props
		let child1 = DangTinUtils._renderLeftText("Giá", true)
		let { validator, price } = this.state
		const newValue = price.toString().replace(/,/g, "")
		let child2 = (
			<>
				<TextField
					InputProps={{ className: classes.heightCommon }}
					fullWidth
					variant="outlined"
					inputProps={{ "aria-label": "bare" }}
					name="price"
					value={this.state.price}
					onChange={this._onChangeInput}
					error={validator.price && validator.price.message ? true : false}
					helperText={
						validator.price && validator.price.message ? validator.price.message : null
					}
				/>

				{this.state.price && (
					<div className="MuiFormControl-marginNormal money-text">
						{NumberToWord.getFullText(newValue) + " đồng."}
					</div>
				)}
			</>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	private _renderRowDiaChi() {
		let { classes } = this.props
		let { validator } = this.state
		let child1 = DangTinUtils._renderLeftText("Tên đường", true)
		let child2 = (
			<TextField
				InputProps={{ className: classes.heightCommon }}
				fullWidth
				variant="outlined"
				inputProps={{ "aria-label": "bare" }}
				name="street"
				value={this.state.street}
				onChange={this._onChangeInput}
				error={validator.street && validator.street.message ? true : false}
				helperText={
					validator.street && validator.street.message ? validator.street.message : null
				}
			/>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	//endregion

	//region loai bds
	@boundMethod
	private getSubCategory() {
		return DangTinUtils.getSubCategory(this.props.cateId)
	}

	private _renderKindBds() {
		let child1 = DangTinUtils._renderLeftText("Loại bất động sản", true)
		let cates = require("../../utils/data/cates.json")
		let listItems = cates[this.props.cateId].subCateoryObjs.map(value => {
			let item: ComboBoxItemData = { value: value.id, title: value.name }
			return item
		})
		const { validator } = this.state
		let child2 = (
			<>
				<ComboBox
					className="full-w"
					placeHoder={"--- Chọn Loại bất động sản ---"}
					value={this.state.subCateId}
					onChange={event => {
						const validator = Validator.update("subCateId", event.target.value)
						this.setState({ subCateId: event.target.value as any, validator })
					}}
					sourceData={{ listItems: listItems }}
				/>
				{validator.subCateId && validator.subCateId.message ? (
					<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
						{validator.subCateId.message}
					</p>
				) : null}
			</>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	//endregion

	render() {
		let { classes } = this.props

		return (
			<Box className={clsx("col2", this.props.className)}>
				{this._renderSelectAdress()}
				{this._renderRowDiaChi()}
				{RenderUtils.renderDivider({ className: classes.separate })}
				{this._renderKindBds()}
				{this._renderGia()}
				{this._renderTitle()}
				{this._renderDes()}
				{this._renderDangHinhAnh()}
				{this._renderContact()}
				{this.renderButtonSubmit()}
			</Box>
		)
	}
}

type ClassKey =
	| "heightCommon"
	| "edtDes"
	| "separate"
	| "btnSubmitContainer"
	| "buttonProgress"
const styles = ({ spacing }: Theme) =>
	createStyles<ClassKey, CSSProperties>({
		heightCommon: { height: 40 } as CSSProperties,
		edtDes: { height: 200 },
		separate: { marginTop: spacing(2) },
		btnSubmitContainer: {
			margin: spacing(2),
			position: "relative"
		},
		buttonProgress: {
			color: green[500],
			position: "absolute",
			top: "50%",
			left: "50%",
			marginTop: -12,
			marginLeft: -12
		}
	})

export default withStyles<any, any, any>(styles)(DangTinStep3)

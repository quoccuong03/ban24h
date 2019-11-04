import React, { PureComponent } from "react"
import {
	Box,
	withStyles,
	createStyles,
	WithStyles,
	Theme,
	Typography
} from "@material-ui/core"
import { CSSProperties } from "@material-ui/core/styles/withStyles"
import Dropzone, { DropEvent } from "react-dropzone"
import clsx from "clsx"
import AddAPhoto from "@material-ui/icons/AddAPhoto"
import UploadAPI from "../../apis/UploadAPI"
import { isEqual } from "lodash"
import { toast } from "react-toastify"
import { CircularProgress } from "@material-ui/core"
type ClassKey = "container" | "icon"
const styles = ({ spacing }: Theme) =>
	createStyles<ClassKey, CSSProperties>({
		container: {
			minHeight: spacing(10),
			borderColor: "#eeeeee",
			padding: spacing(2),
			borderWidth: 2,
			borderRadius: 2,
			borderStyle: "dashed",
			backgroundColor: "#fafafa",
			color: "#bdbdbd",
			outline: "none",
			transition: "border .24s ease-in-out"
		},
		icon: {
			fontSize: spacing(6),
			marginBottom: spacing(3)
		}
	})

interface Props extends WithStyles<ClassKey> {
	error_img?: string
	handleChangeImage?: any
}
type States = {
	image?: any
}
class UploadImageComponent extends PureComponent<Props, States> {
	constructor(props) {
		super(props)
		this.state = {
			image: []
		}
		this._onImageDrop = this._onImageDrop.bind(this)
	}

	componentDidUpdate(prevProps, prevStae) {
		if (!isEqual(this.state.image, prevStae.image)) {
			if (this.props.handleChangeImage) {
				this.props.handleChangeImage(this.state.image)
			}
		}
	}
	_onImageDrop(acceptedFiles: File[], rejectedFiles: File[], event: DropEvent) {
		const { image } = this.state
		acceptedFiles.forEach(file => {
			UploadAPI.uploadMutipleFile(file).then(result => {
				if (result.isSuccess) {
					const { image } = this.state
					const newImage = []
					let checkExist= true
					image.forEach(url => {
						if(url==='loading' && checkExist){
							newImage.push(result.url)
							checkExist= false
						}else{
							newImage.push(url)
						}
					});
					this.setState({
						image: newImage
					})
				} else {
					//neu co loi thi xoa img do di
					const newImage = []
					let checkExist= true
					image.forEach(url => {
						if(url!=='loading' ){
							newImage.push(url)
						}
					});
					this.setState({
						image: newImage
					})
					const errorMessage =
						result.errorMessage || "Bạn phải đăng nhập trước khi upload ảnh."
					toast.error(errorMessage, {
						position: toast.POSITION.BOTTOM_LEFT
					})
				}
			})
			image.push("loading")
		})
		this.setState({ image })
	}
	handleDeleteImage(index) {
		const { image } = this.state
		const newImage = []
		image.forEach((element, elementIndex) => {
			if (index !== elementIndex) {
				newImage.push(element)
			}
		})

		this.setState({
			image: newImage
		})
	}
	render() {
		let { classes, error_img } = this.props
		const { image } = this.state
		return (
			<div className="flex-col">
				<Dropzone multiple={true} accept="image/*" onDrop={this._onImageDrop}>
					{({ getRootProps, getInputProps }) => {
						return (
							<>
								<div
									className=""
									{...getRootProps({ className: clsx(classes.container, "col5") })}>
									<input {...getInputProps()} />
									<AddAPhoto className={classes.icon} />
									<Typography>Click vào dấu cộng ở trên để up hình</Typography>
									<Typography> bạn có thể up tối đa 30 hình, mỗi hình tối đa 6MB</Typography>
								</div>
								<div className="zone-drop MuiFormControl-marginNormal">
									{image.map((url, index) => {
										return (
											<div key={`iamge-${index}`} className="zone-drop__thumb">
												<div className={"zone-drop__thumb-inner "}>
													{url !== "loading" && (
														<>
															<img src={url} className="zone-drop__img" />
															<span
																onClick={() => {
																	this.handleDeleteImage(index)
																}}
																className="icon icon-delete zone-drop__icon"
															/>
														</>
													)}
													{url === "loading" &&<div className='zone-drop__img'>
													<CircularProgress className='loader__img' />
													</div>}
												</div>
											</div>
										)
									})}
								</div>
							</>
						)
					}}
				</Dropzone>

				{error_img ? (
					<p className=" MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
						{error_img}
					</p>
				) : null}
			</div>
		)
	}
}

export default withStyles<any, any, any>(styles)(UploadImageComponent)

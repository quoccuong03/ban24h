import React, { PureComponent } from "react"
import { boundMethod } from "autobind-decorator"
import { withStyles, createStyles, WithStyles } from "@material-ui/core"
import { DangTinUtils } from "./DangTinUtils"
import ComboBox from "../../external-libs/my-common-component/src/ComboBox"
import { isEmpty } from "../../external-libs/my-common-utils/src"

const styles = createStyles({
	// img: {} as CSSProperties,
})

interface Props extends WithStyles<typeof styles> {
	tinh?: string
	huyen?: string
	xa?: string
	onChange: (tinh: string, huyen: string, xa: string) => void
    error_xa?: string
    error_tinh?: string
    error_huyen?: string
}

class SelectAdressComponent extends PureComponent<Props> {
	static defaultProps = { tinh: "", huyen: "", xa: "" }

	@boundMethod onChangeTinh(
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) {
		this.props.onChange(event.target.value as any, null, undefined)
	}

	@boundMethod onChangeHuyen(
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) {
		this.props.onChange(this.props.tinh, event.target.value as any, undefined)
	}

	@boundMethod onChangeXa(
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) {
		this.props.onChange(this.props.tinh, this.props.huyen, event.target
			.value as any)
	}

	@boundMethod getListTinh() {
		return DangTinUtils.getListTinh()
	}

	@boundMethod getListHuyen() {
		return DangTinUtils.getListHuyen(this.props.tinh)
	}

	@boundMethod getListXa() {
		return DangTinUtils.getListXa(this.props.huyen)
	}
    
	render() {
        let { classes } = this.props
      
		return (
			<>
				{this._renderRowTinh()}
				{this._renderRowHuyen()}
				{this._renderRowXa()}
			</>
		)
	}

	private _renderRowTinh() {
		let child1 = DangTinUtils._renderLeftText("Tỉnh/Thành", true)
        const { error_tinh } = this.props

		let child2 = (
			<>
				<ComboBox
					className="full-w"
					placeHoder={"--- Chọn Tỉnh/Thành ---"}
					value={this.props.tinh}
					onChange={this.onChangeTinh}
					sourceData={{
						fetchData: this.getListTinh
					}}
				/>

				{ error_tinh? (
					<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
						{error_tinh}
					</p>
				) : null}
			</>
		)
		return DangTinUtils._renderRow(child1, child2, true)
	}

	private _renderRowHuyen() {
        let child1 = DangTinUtils._renderLeftText("Quận/Huyện", true)
        const { error_huyen } = this.props
		let child2 = (
			<>
				<ComboBox
					key={"h" + this.props.tinh}
					className="full-w"
					placeHoder={"--- Chọn Quận/Huyện ---"}
					value={this.props.huyen}
					disabled={isEmpty(this.props.tinh)}
					onChange={this.onChangeHuyen}
					sourceData={{
						fetchData: this.getListHuyen
					}}
				/>
				{error_huyen ? (
					<p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
						{ error_huyen }
					</p>
				) : null}
			</>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}

	private _renderRowXa() {
        let child1 = DangTinUtils._renderLeftText("Phường/Xã", true)
        const { error_xa } = this.props
		let child2 = (
            <>
			<ComboBox
				key={"x" + this.props.huyen}
				value={this.props.xa}
				className="full-w"
				placeHoder={"--- Chọn Phường/Xã ---"}
				disabled={isEmpty(this.props.huyen)}
				onChange={this.onChangeXa}
				sourceData={{
					fetchData: this.getListXa
				}}
			/>
            {error_xa ? (
                <p className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">
                    {error_xa}
                </p>
            ) : null}
            </>
		)
		return DangTinUtils._renderRow(child1, child2, false)
	}
}

export default withStyles(styles)(SelectAdressComponent)

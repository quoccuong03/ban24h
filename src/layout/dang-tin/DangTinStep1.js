import React, { PureComponent } from "react"
import Col from "../../external-libs/my-common-component/src/Col"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Cates from "../../utils/data/cates.json"
import Grid from "@material-ui/core/Grid"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import Divider from "@material-ui/core/Divider"
class DangTinStep1 extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			isAction: false,
			index: "",
			isMobile: window.innerWidth < 679,
		}
	}
	handleOnClick(name) {
		if(this.props.onChangePage){
			this.props.onChangePage(2, name,'')
		}
		// this.setState({
		// 	isAction: true,
		// 	index: name
		// })
	}
	handleSubCate(cateId,cateSubId){
		if(this.props.onChangePage){
			this.props.onChangePage(2, cateId,cateSubId)
		}
	}
	render() {
		const { isAction, index, isMobile } = this.state

		return (
			<Col className={this.props.className}>
				<Grid container spacing={3}>
					<Grid item xs={isAction && !isMobile ? 6 : 12}>
						<List component="nav" aria-label="main mailbox folders">
							<ListItem button>
								<ListItemText
									primary={
										< >
											<span className="Dangtin__sub-mobile">Chọn chuyên mục đăng</span>
											<span className="icon icon-looks_one" />
										</>
									}
								/>
							</ListItem>
							<Divider />
							{Object.keys(Cates).map(name => {
								return (
									<div key={name}>
										<ListItem
											onClick={() => {
												this.handleOnClick(name)
											}}
											button>
											<ListItemIcon>
												<span className={Cates[name].icon} />
											</ListItemIcon>
											<ListItemText primary={Cates[name].name} />
											<KeyboardArrowRight />
										</ListItem>
										<Divider />
									</div>
								)
							})}
						</List>
					</Grid>

					{/* {isAction && (
						<Grid item xs={isMobile ? 12 : 6}>
							<List component="nav">
								<ListItem button>
									<ListItemText
										primary={
											<>
											<span className="Dangtin__sub-mobile">Chọn chuyên mục đăng tiếp theo</span>
											<span className="icon icon-looks_two" />
											</>
										}
									/>
								</ListItem>
								<Divider />

								{Cates[index].subCateoryObjs.map(item => {
									return (
										<div key={item.id}>
											<ListItem onClick={()=>{this.handleSubCate(index,item.id)}} button>
												<ListItemText primary={item.name} />
												<Divider />
											</ListItem>
											<Divider />
										</div>
									)
								})}
							</List>
						</Grid>
					)} */}
				</Grid>
			</Col>
		)
	}
}

export default DangTinStep1

import React, {PureComponent} from 'react';
import { withStyles, createStyles, WithStyles} from '@material-ui/core';
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import Col from "../../external-libs/my-common-component/src/Col";
import Button from '@material-ui/core/Button';


class DangTinStep2 extends PureComponent {


    render() {
        let {classes,cateId,cateSubId} = this.props;
        return (
            <Col>
                  <Button variant="contained" color="primary" onClick={()=>{
                      if(this.props.onChangePage){
                        this.props.onChangePage(3, cateId ,cateSubId)
                     }
                    }}
                    >
                    next
                </Button>
            </Col>
        );
    }
}



export default (DangTinStep2);

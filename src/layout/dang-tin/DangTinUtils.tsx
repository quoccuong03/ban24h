import {ComboBoxItemData} from "../../external-libs/my-common-component/src/ComboBox";
import {CommonUtils, isEmpty} from "../../external-libs/my-common-utils/src";
import {Box, Grid, Typography} from "@material-ui/core";
import React from "react";
import {NetworkUtils} from "../../external-libs/my-common-utils/src/NetworkUtils";
import {DataTypeUtils} from "../../external-libs/my-common-utils/src/DataTypeUtils";

export class DangTinUtils {
    /**bds, bds_nha*/
    static async getSubCategory(cateId: string): Promise<ComboBoxItemData[]> {
        let jsonObj = await NetworkUtils.excuteHttpGET("assets/data/cates.json");
        let subCateoryObjs = jsonObj[cateId].subCateoryObjs;
        let result: ComboBoxItemData[] = [];
        for (let item of subCateoryObjs) {
            result.push({title: item.name, value: item.id});
        }
        return result;
    }

    // region DVHC
    private static getCommonDVHC(jsonObj: object, isHuyen: boolean): ComboBoxItemData[] {
        let result: ComboBoxItemData[] = [];
        for (let key in jsonObj) {
            if (jsonObj.hasOwnProperty(key)) {
                let tinhObj = jsonObj[key];
                if (tinhObj.code)
                    result.push({title: tinhObj.name_with_type, value: tinhObj.code});
            }
        }
        return result.sort((a, b) => {
            let aTitle = DataTypeUtils.convertTiengVietKoDau(a.title);
            let bTitle = DataTypeUtils.convertTiengVietKoDau(b.title);
            if (isHuyen) {
                if (aTitle.startsWith("thanh pho") && !bTitle.startsWith("thanh pho"))
                    return -1;
                if (bTitle.startsWith("thanh pho") && !aTitle.startsWith("thanh pho"))
                    return 1;

                if (aTitle.startsWith("quan") && !bTitle.startsWith("quan"))
                    return -1;
                if (bTitle.startsWith("quan") && !aTitle.startsWith("quan"))
                    return 1;

                if (aTitle.startsWith("thi xa") && !bTitle.startsWith("thi xa"))
                    return -1;
                if (bTitle.startsWith("thi xa") && !aTitle.startsWith("thi xa"))
                    return 1;
            }

            // if (|| aTitle.startsWith("thi xa")) return -1;
            if (aTitle > bTitle) return 1;
            if (aTitle === bTitle) return 0;
            return -1;
        });
    }

    static async getListTinh(): Promise<ComboBoxItemData[]> {
        return this.getCommonDVHC(await NetworkUtils.excuteHttpGET("assets/data/tinh_tp.json"), false);
    }

    static async getListHuyen(tinh: string): Promise<ComboBoxItemData[]> {
        if (isEmpty(tinh)) return [];
        return this.getCommonDVHC(await NetworkUtils.excuteHttpGET("assets/data/quan-huyen/{0}.json".format(tinh)), true);
    }

    static async getListXa(huyen: string): Promise<ComboBoxItemData[]> {
        if (isEmpty(huyen)) return [];
        return this.getCommonDVHC(await NetworkUtils.excuteHttpGET("assets/data/xa-phuong/{0}.json".format(huyen)), false);
    }

    //endregion

    //region render common
    public static _renderLeftText(text: string, addRequireSymbol?: boolean) {
        let requireSymbolUi;
        if (addRequireSymbol)
            requireSymbolUi = (
                <Typography color="error" component="span"> (*)</Typography>
            );
        return (
            <Typography component="span">
                {text}
                {requireSymbolUi}
            </Typography>
        );
    }

    public static _renderRow(child1, child2, isFirstRow) {
        return (
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} md={4}>
                    <Box mt={{md: isFirstRow ? 0 : 2, xs: isFirstRow ? 0 : 2}}>
                        {child1}
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box mt={{md: isFirstRow ? 0 : 2}}>
                        {child2}
                    </Box>
                </Grid>
            </Grid>
        );
    }

    //endregion
}

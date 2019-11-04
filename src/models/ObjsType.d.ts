import {SiteState} from "./SiteConstants";

export interface dvhc {
    title: string
    id: string
}

export interface TinObjInput {
    id?: number,
    userId?: string // Xác định tin thuộc user nào
    title?: string; // length in: [30-70]
    des?: string;
    cateId?: string;
    subCateId?: string;
    tinh?: string; // code
    huyen?: string; // code
    xa?: string; // code
    street?: string // Tên đường
    price?: string;
    acreage?: string;
    contactName?: string;
    contactNumber?: string;
    contactEmail?: string;
    images?: string[];
}

export interface TinObj extends TinObjInput {
    createdAt?: string;
}

export interface User {
    id: string,
    name?: string,
    img?: string,
    email?: string,
}

export interface ApiResultObj {
    isSuccess: boolean,
    errorMessage?: string
}

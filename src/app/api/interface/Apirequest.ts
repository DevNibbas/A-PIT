import { Param } from './Param';
export interface Apirequest {
    url: string;
    params: Param[];
    datas: any[];
    headers: Headers[];
    method: string;

}

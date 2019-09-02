import { HttpHeaders } from '@angular/common/http';
import { Param } from './Param';
export interface Apirequest {
    url: string;
    params: Param[];
    datas: any[];
    headers: HttpHeaders[];
    method: string;

}

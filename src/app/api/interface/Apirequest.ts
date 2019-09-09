import { Param } from './Param';

export class Apirequest {
    url: string;
    params: any[];
    datas: any[];
    headers: any[];
    method: string;
    reportProgress?: boolean;
    responseType?: string;
    constructor() { }
    public getHeaders() {


        const header = { Accept: 'application/json' };
        this.headers.forEach(h => {
            if (h.name) {
                header[h.key] = h.value;
            }
        });
        return header;
    }
    public getParams() {
        const urlparams = {};  // new HttpParams();

        this.params.forEach(p => {
            if (p.key) {
                urlparams[p.key] = p.value;
            }
        });

        return urlparams;
    }
    public getDatas() {
        const data = {};
        this.datas.forEach(d => {
            if (d.key) {
                data[d.key] = d.value;
            }
        });
        return data;
    }

}

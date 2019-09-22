import { IDBContract } from './../interface/IDBContract';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/services/api/env.service';
import { reject } from 'q';

export class Apirequest {
    user: any;
    url: string;
    typeCastedUrl: string;
    params: any[];
    datas: any[];
    headers: any[];
    method: string;
    auth: boolean;
    authtype: string;
    cors: boolean;
    options: any;

    reportProgress?: boolean;
    responseType?: string;
    apiAuth;
    response;
    constructor(private env: EnvService) {
        this.params = [{} as any];
        this.datas = [{} as any];
        this.headers = [{ key: 'Access-Control-Request-Origin', value: '*' } as any, {}];
        this.method = 'GET';
        this.auth = false;
        this.authtype = undefined;
        this.cors = false;

        this.apiAuth = {} as any;
        this.user = JSON.parse(localStorage.getItem('userid'));

    }

    public CheckForCors() {
        if (this.cors) {
            this.typeCastedUrl = environment.corsUrl + this.url;
        } else {
            this.typeCastedUrl = this.url;
        }
    }

    public getHeaders() {
        const header = { Accept: 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' };
        this.headers.forEach(h => {
            if (h.key) {
                header[h.key] = h.value;
            }
        });
        return header;
    }

    public getAuthIfEnabled() {
        if (this.auth && this.authtype === 'Basic Authentication') {
            this.headers.push({
                key: 'Authentication', value: 'Basic ' +
                    btoa(this.apiAuth.username + ':' + this.apiAuth.password)
            });
            this.headers.push({
                key: 'Authorization', value: 'Basic ' +
                    btoa(this.apiAuth.username + ':' + this.apiAuth.password)
            });

        } else if (this.authtype === 'Bearer Token Authentication') {
            this.headers.push({ key: 'Authentication', value: 'Bearer ' + this.apiAuth.bearer });
            this.headers.push({ key: 'Authorization', value: 'Bearer ' + this.apiAuth.bearer });

        }
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

    public getOptions() {
        this.options = {
            headers: this.getHeaders(),
            params: this.getParams(),
            observe: 'response',
            reportProgress: this.reportProgress ? this.reportProgress : false,
            responseType: 'json',
        };

    }

    public parseToReq(dbdata: any) {
        this.user[0] = dbdata[IDBContract._tReqHistoryIndexUserId];
        this.url = dbdata[IDBContract._tReqHistoryIndexURL];
        this.params = dbdata[IDBContract._tReqHistoryIndexParams];
        this.method = dbdata[IDBContract._tReqHistoryIndexMethod];
        this.headers = dbdata[IDBContract._tReqHistoryIndexHeaders];
        this.datas = dbdata[IDBContract._tReqHistoryIndexData];
        this.apiAuth.bearer = dbdata[IDBContract._tReqHistoryIndexBearerToken];
        this.apiAuth.username = dbdata[IDBContract._tReqHistoryIndexAuthUname];
        this.apiAuth.password = dbdata[IDBContract._tReqHistoryIndexAuthPwd];
        this.auth = dbdata[IDBContract._tReqHistoryIndexAuth];
        this.authtype = dbdata[IDBContract._tReqHistoryIndexAuthType];


    }
    public parseToDb() {
        const req: any = {};
        req[IDBContract._tReqHistoryIndexUserId] = this.user[0];
        req[IDBContract._tReqHistoryIndexURL] = this.url;
        req[IDBContract._tReqHistoryIndexParams] = this.params;
        req[IDBContract._tReqHistoryIndexMethod] = this.method;
        req[IDBContract._tReqHistoryIndexHeaders] = this.headers;
        req[IDBContract._tReqHistoryIndexData] = this.datas;
        req[IDBContract._tReqHistoryIndexBearerToken] = this.apiAuth.bearer;
        req[IDBContract._tReqHistoryIndexAuthUname] = this.apiAuth.username;
        req[IDBContract._tReqHistoryIndexAuthPwd] = this.apiAuth.password;
        req[IDBContract._tReqHistoryIndexAuth] = this.auth;
        req[IDBContract._tReqHistoryIndexAuthType] = this.authtype;
        return req;

    }



    parseEnv(objtype?: string) {
        const y: any[] = this.url.match(/\{[a-zA-Z]+.*\}$/);
        return new Promise((res, rej) => {
            for (let e = 0; e < y.length; e++) {
                const key = y[e].replace(/[\{|\}]/g, '');
                this.env.parseEnv(key).then((val: string) => {
                    this.url = this.url.replace(y[e], val);
                });
                if (e === y.length - 1) {
                    res(true);
                }
            }


        });

        // rej(false);


    }

}

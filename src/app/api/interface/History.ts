import { CrudService } from './../../crud.service';
import { IDBContract } from './IDBContract';
export class History {
    allHistory: any[];
    activatedHistory;
    user: any;
    constructor(private db: CrudService) {
        this.user = JSON.parse(localStorage.getItem('userid'));
        this.getAllHistory();

    }


    getAllHistory() {
        if (!this.db.isDBOpened()) {
            return null;
        } else {
            return this.db.getRequestHistory(this.user[0]).then(res => {
                this.allHistory = res;
                console.log(res);
            });
        }

    }
    saveHistory(history: any) {
        this.db.addRequestHistory(history).then(id => {
            history.id = id;
            this.allHistory.push(history);
        });

    }


    loadMoreHistory() {
        // function for lazy load
    }

    deleteHist(id) {

    }


    deleteAllHistory() {
        const x = confirm('you naughty.. want to clear your history :)- ');
        // function for delete  all history
    }

    toggleHistoryList(index) {
        if (this.activatedHistory === this.allHistory[index].id) {
            this.activatedHistory = undefined;
        } else {
            this.activatedHistory = this.allHistory[index].id;
        }
    }


    public parseToJson(dbdata: any) {
        const ret: any = {};
        ret.url = dbdata[IDBContract._tReqHistoryIndexURL];
        const urlparams = {};
        dbdata[IDBContract._tReqHistoryIndexParams].forEach(p => {
            if (p.key) {
                urlparams[p.key] = p.value;
            }
        });
        if (Object.keys(urlparams).length !== 0) {
            ret.params = urlparams;
        }
        ret.method = dbdata[IDBContract._tReqHistoryIndexMethod];
        const headers = {};
        dbdata[IDBContract._tReqHistoryIndexHeaders].forEach(h => {
            if (h.key) {
                headers[h.key] = h.value;
            }
        });
        if (Object.keys(headers).length !== 0) {

            ret.headers = headers;
        }
        const datas = {};
        dbdata[IDBContract._tReqHistoryIndexData].forEach(d => {
            if (d.key) {
                datas[d.key] = d.value;
            }
        });
        if (Object.keys(datas).length !== 0) {
            ret.datas = datas;
        }

        ret.isauthorized = dbdata[IDBContract._tReqHistoryIndexAuth];

        if (ret.isauthorized) {
            ret.authorization = {} as any;
            ret.authorization.bearer = dbdata[IDBContract._tReqHistoryIndexBearerToken];
            ret.authorization.username = dbdata[IDBContract._tReqHistoryIndexAuthUname];
            ret.authorization.password = dbdata[IDBContract._tReqHistoryIndexAuthPwd];
            ret.authorization.type = dbdata[IDBContract._tReqHistoryIndexAuthType];

        }

        return ret;


    }


}


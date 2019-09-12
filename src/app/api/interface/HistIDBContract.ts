export class HistIDBContract {

    /* ---------------------------------------------- */
    public static _transactionRO: IDBTransactionMode = 'readonly';
    public static _transactionRW: IDBTransactionMode = 'readwrite';
    /* ---------------------------------------------- */

    /* ---------------------------------------------- */
    public static _databaseName: string = 'apit-indexedDB';
    public static _dbVersionHistory: number = 1;
    /* ---------------------------------------------- */

    /* ---------------------------------------------- */
    public static _tReqHistoryStoreName: string = 'request_history';
    public static _tReqHistoryIndexUniqueId: string = 'id';
    public static _tReqHistoryIndexUserId: string = 'uid';
    public static _tReqHistoryIndexMethod: string = 'req_method';
    public static _tReqHistoryIndexURL: string = 'req_url';
    public static _tReqHistoryIndexParams: string = 'req_params';
    public static _tReqHistoryIndexHeaders: string = 'req_headers';
    public static _tReqHistoryIndexData: string = 'req_data';
    public static _tReqHistoryIndexAuth: string = 'req_auth';
    public static _tReqHistoryIndexAuthUname: string = 'req_auth_uname';
    public static _tReqHistoryIndexAuthPwd: string = 'req_auth_pwd';
    public static _tReqHistoryIndexBearerToken: string = 'req_auth_bearer_token';
    public static _tReqHistoryIndexAuthType: string = 'req_auth_type';
    /* ---------------------------------------------- */
    public static _tModelStoreName: string = 'model_names';
    public static _tModelIndexName: string = 'name';
    public static _tModelIndexId: string = 'id';
    public static _tModelIndexUid: string = 'uid';
    public static _tModelIndexType: string = 'type';
    public static _tModelIndexData: string = 'data';
    /* ---------------------------------------------- */

    constructor() { }
}

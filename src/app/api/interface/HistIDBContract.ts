export class HistIDBContract {

    /* ---------------------------------------------- */
    public static _transactionRO:IDBTransactionMode = 'readonly';
    public static _transactionRW:IDBTransactionMode = 'readwrite';
    /* ---------------------------------------------- */

    /* ---------------------------------------------- */
    public static _dbNameHistory: string = 'history';
    public static _dbVersionHistory: number = 1;
    /* ---------------------------------------------- */
    public static _dbNameModels: string = 'models';
    public static _dbVersionModelName: number = 1;
    /* ---------------------------------------------- */

    /* ---------------------------------------------- */
    public static _tReqHistoryName: string = 'request_history';
    public static _tReqUniqueId:string = 'id';
    public static _tReqHistoryUserId: string = 'uid';
    public static _tReqHistoryMethod: string = 'req_method';
    public static _tReqHistoryURL: string = 'req_url';
    public static _tReqHistoryParams: string = 'req_params';
    public static _tReqHistoryHeaders: string = 'req_headers';
    public static _tReqHistoryData: string = 'req_data';
    public static _tReqHistoryAuth: string = 'req_auth';
    public static _tReqHistoryAuthUname: string = 'req_auth_uname';
    public static _tReqHistoryAuthPwd: string = 'req_auth_pwd';
    public static _tReqHistoryBearerToken: string = 'req_auth_bearer_token';
    public static _tReqHistoryAuthType: string = 'req_auth_type';
    /* ---------------------------------------------- */
    public static _tModelName: string = 'model_names';
    public static _tModelNameName: string = 'name';
    public static _tModelNameId: string = 'id';
    public static _tModelNameUid: string = 'uid';
    /* ---------------------------------------------- */

    constructor(){}
}
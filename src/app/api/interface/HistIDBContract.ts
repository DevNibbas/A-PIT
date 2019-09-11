export class HistIDBContract {

    public static _transactionRO: IDBTransactionMode = 'readonly';
    public static _transactionRW: IDBTransactionMode = 'readwrite';

    public static _dbNameHistory = 'history';
    public static _dbVersionHistory = 1;

    public static _tReqHistoryName = 'request_history';
    public static _tReqUniqueId = 'id';
    public static _tReqHistoryUserId = 'uid';
    public static _tReqHistoryMethod = 'req_method';
    public static _tReqHistoryURL = 'req_url';
    public static _tReqHistoryParams = 'req_params';
    public static _tReqHistoryHeaders = 'req_headers';
    public static _tReqHistoryData = 'req_data';
    public static _tReqHistoryAuth = 'req_auth';
    public static _tReqHistoryAuthUname = 'req_auth_uname';
    public static _tReqHistoryAuthPwd = 'req_auth_pwd';
    public static _tReqHistoryBearerToken = 'req_auth_bearer_token';
    public static _tReqHistoryAuthType = 'req_auth_type';

    constructor() { }
}

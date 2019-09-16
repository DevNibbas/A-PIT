export class IDBContract {

    /* ---------------------------------------------- */
    public static _transactionRO: IDBTransactionMode = 'readonly';
    public static _transactionRW: IDBTransactionMode = 'readwrite';
    /* ---------------------------------------------- */

    /* ---------------------------------------------- */
    public static _databaseName = 'apit-indexedDB';
    public static _dbVersionHistory = 2;
    /* ---------------------------------------------- */

    /* ---------------------------------------------- */
    public static _methodHeader = 'method_header';
    public static _methodParam = 'method_param';
    public static _methodData = 'method_data';
    public static _methodURL = 'method_url';
    /* ---------------------------------------------- */

    /* ---------------------------------------------- */
    public static _tReqHistoryStoreName = 'request_history';
    public static _tReqHistoryIndexUniqueId = 'id';
    public static _tReqHistoryIndexUserId = 'uid';
    public static _tReqHistoryIndexMethod = 'req_method';
    public static _tReqHistoryIndexURL = 'req_url';
    public static _tReqHistoryIndexParams = 'req_params';
    public static _tReqHistoryIndexHeaders = 'req_headers';
    public static _tReqHistoryIndexData = 'req_data';
    public static _tReqHistoryIndexAuth = 'req_auth';
    public static _tReqHistoryIndexAuthUname = 'req_auth_uname';
    public static _tReqHistoryIndexAuthPwd = 'req_auth_pwd';
    public static _tReqHistoryIndexBearerToken = 'req_auth_bearer_token';
    public static _tReqHistoryIndexAuthType = 'req_auth_type';
    /* ---------------------------------------------- */
    public static _tModelStoreName = 'model_names';
    public static _tModelIndexName = 'name';
    public static _tModelIndexId = 'id';
    public static _tModelIndexUid = 'uid';
    public static _tModelIndexType = 'type';
    public static _tModelIndexData = 'data';
    /* ---------------------------------------------- */

    public static _tEnvStoreName = 'env_vars';
    public static _tEnvIndexName = 'name';
    public static _tEnvIndexId = 'id';
    public static _tEnvIndexUid = 'uid';
    public static _tEnvIndexValue = 'value';

    /* ---------------------------------------------- */

    constructor() { }
}

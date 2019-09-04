import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiTestingContractService {

  HTTP_GET_SUCCESS_CODE:number = 200;
  HTTP_GET_BAD_REQUEST:number = 400;
  HTTP_GET_NOT_FOUND_CODE:number = 404;

  HTTP_POST_SUCCESS_CODE:number = 200;
  HTTP_POST_CREATED_CODE:number = 201;
  HTTP_POST_NO_CONTENT_CODE:number = 204;
  HTTP_POST_BAD_REQUEST:number = 400;
  HTTP_POST_NOT_FOUND_CODE:number = 404;

  HTTP_PUT_SUCCESS_CODE:number = 200;
  HTTP_PUT_CREATED_CODE:number = 201;
  HTTP_PUT_NO_CONTENT_CODE:number = 204;
  HTTP_PUT_BAD_REQUEST:number = 400;
  HTTP_PUT_NOT_FOUND_CODE:number = 404;

  HTTP_DELETE_SUCCESS_CODE:number = 200;
  HTTP_DELETE_QUEUED_CODE:number = 202;
  HTTP_DELETE_NO_CONTENT_CODE:number = 204;
  HTTP_DELETE_BAD_REQUEST:number = 400;
  HTTP_DELETE_NOT_FOUND_CODE:number = 404;

  HTTP_PATCH_SUCCESS_CODE:number = 200;
  HTTP_PATCH_NO_CONTENT_CODE:number = 204;
  HTTP_PATCH_BAD_REQUEST:number = 400;
  HTTP_PATCH_NOT_FOUND_CODE:number = 404;

  HTTP_SERVER_INTERNAL_ERROR:number = 500;

  constructor() { }
}

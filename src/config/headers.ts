
import { HttpHeaders } from "@angular/common/http";

export class appHeaders {

    public static getHeaders() {
        return new HttpHeaders({
            //'Content-Type': 'multipart/form-data; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'api_key':'recap'
        });
    }
    public static getHeaders_formData() {
        return new HttpHeaders({
            //'Content-Type': 'multipart/form-data; charset=utf-8',
            //'Content-Type': 'multipart/form-data;',
            //'Content-Type': 'application/json; charset=utf-8',
            //'Content-Type':'multipart/mixed;boundary=gc0p4Jq0M2Yt08jU534c0p',
            'Content-Type':'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p',
            'enctype' : 'multipart/form-data',
            //'Content-Type': 'false',
            'Accept': 'application/json',
            'api_key':'recap'
        });
    }
}
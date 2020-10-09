
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
            'Content-Type': 'undefined',
            'Accept': 'application/json',
            'api_key':'recap'
        });
    }
}
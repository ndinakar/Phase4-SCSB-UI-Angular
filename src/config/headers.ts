
import { HttpHeaders } from "@angular/common/http";

export class appHeaders {

    public static getHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'api_key':'recap'
        });
    }

}
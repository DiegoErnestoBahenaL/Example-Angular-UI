import {  HttpHeaders } from "@angular/common/http";

export class Core {

    public static createHttpHeadersJson():HttpHeaders{
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
        return headers;
    }

    public static get securedHomePath():any[] { return ['/secured/home']; }
} 
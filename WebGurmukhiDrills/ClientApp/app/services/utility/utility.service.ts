import { Injectable, Inject } from '@angular/core';

@Injectable()
export class UtilityService {
    private localBaseUrl: string;
    constructor( @Inject('BASE_URL') baseUrl: string) {
        this.localBaseUrl = baseUrl;
    }

    getBaseUrl() : string {
        return this.localBaseUrl;
    }
}
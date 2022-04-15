import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UtilityService } from '../utility/utility.service';
import { UsersecurityModel} from './usersecurity.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UsersecurityService {

    private baseUrl: string;
    private usersecurity: UsersecurityModel;
    constructor(private utilityService: UtilityService, private http: Http) {
        this.baseUrl = utilityService.getBaseUrl();
    }

    getUserSecurity() {

        if (this.usersecurity) {
            return Observable.of(this.usersecurity);
        } else {
            return this.http.get(this.baseUrl + 'api/usersecurity')
                .map(data => {
                    this.usersecurity = <UsersecurityModel>data.json();
                    return this.usersecurity;
                });

        }
    }

}
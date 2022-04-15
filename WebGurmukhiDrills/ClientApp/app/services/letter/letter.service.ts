import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LetterGroupData, LetterGroupType } from './letter.model';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class LetterService
{
    private baseUrl : string;
    constructor(private http: Http, private utilityService: UtilityService) {
        this.baseUrl = this.utilityService.getBaseUrl();
    }


    getLetterGroup(groupId: number) {
        return this.http.get(this.baseUrl + 'api/letter/getgroup/' + String(groupId))
            .map(result => { return <LetterGroupData>result.json() });
        
    }

    getLetterGroupTypes() {
        return this.http.get(this.baseUrl + 'api/lettergroups')
            .map(result => { return <LetterGroupType[]> result.json()  });        
    }

}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Questions } from "./question.model";
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class MultiplechoiceService {
    localBaseUrl: string;
    constructor(private http: Http, private utilityService: UtilityService) {
        this.localBaseUrl = utilityService.getBaseUrl();
    }

    // http://localhost:55497/api/LetterMulipleChoice?groupTypes=1&groupTypes=2&groupTypes=3
    getLetterGroupMuliptleChoice(groupIds: number[]) {
        var params = '';
        groupIds.forEach(groupid => {
            if (params) {
                params += '&';
            }
            params += 'groupTypes=' + groupid;
        });
        return this.http.get(this.localBaseUrl + 'api/LetterMulipleChoice?' + params)
            .map(result => { return <Questions>result.json() });

    }

    getWordMultipleChoiceQuestion(id: number, optionLevel: number, isPunjabiAnwser: boolean, showImage: boolean) {
        return this.http.get(this.localBaseUrl + '/api/SubCategory/' + id + '/MulitpleChoice?optionLevel=' + optionLevel + '&isPunjabiAnwser=' + isPunjabiAnwser + '&showImage=' + showImage)
            .map(data => {
                return <Questions>data.json();
            });
    }
}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RandomLetterData } from "./randomletter.model";
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class RandomletterService {
    localBaseUrl: string;
    constructor(private http: Http, private utilityService : UtilityService) {
        this.localBaseUrl = utilityService.getBaseUrl();
    }

    // http://localhost:55497/api/RandomLetter?groupTypes=1&groupTypes=2&groupTypes=3
    getRandomLetter(numberofletters : number, lengthOfLetters:number, groupIds: number[]) {
        var params = '';
        groupIds.forEach(groupid => {
            if (params) {
                params += '&';
            }
            params += 'groupTypes=' + groupid;
        });
        var fullParams = "numberOfLetter=" + String(numberofletters) + "&lengthOfLetter=" + String(lengthOfLetters) +"&" + params;
        return this.http.get(this.localBaseUrl + 'api/RandomLetter?' + fullParams)
            .map(result => { return <RandomLetterData>result.json() });

    }

    compareString(refstring: string, comparestring: string): number[] {
        let mismatchIndex: number[] = [];
        let compareLength = comparestring.length;
        let refLength = refstring.length;
        if (refstring !== comparestring) {
            for (let iloop = 0; iloop < refLength; iloop++) {
                if (compareLength > iloop) {
                    if (refstring[iloop] !== comparestring[iloop]) {
                        mismatchIndex.push(iloop);
                    }
                } else {
                    mismatchIndex.push(iloop);
                }
            } 
        }
        if (mismatchIndex && mismatchIndex.length === 0) {
            if (refstring !== comparestring.substring(0, refLength)) {
                mismatchIndex.push(-1);
            }
            
        }
        return mismatchIndex;
    }
}
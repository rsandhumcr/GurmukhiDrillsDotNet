import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { UtilityService } from '../utility/utility.service';
import { SelectionItem, WordResultset, Category, SubCategory, WordTranslation, WordTranslated } from './word.model';

@Injectable()
export class WordService {

    private baseUrl : string;
    constructor(private utilityService: UtilityService, private http: Http) {
        this.baseUrl = utilityService.getBaseUrl();
    }

    getWordCategorySelection(){
        return this.http.get(this.baseUrl + 'api/WordCategory/Selection')
            .map(data => { return <SelectionItem[]>data.json(); });
    }

    createWordCategory(category: Category) {
        return this.http.put(this.baseUrl + 'api/WordCategory', JSON.stringify(category), this.createOptionJsonContentType())
            .map(data => { return <Category>data.json(); });
    }

    updateWordCategory(category: Category) {
        return this.http.post(this.baseUrl + 'api/WordCategory/' + category.id, JSON.stringify(category), this.createOptionJsonContentType())
            .map(data => { return <Category>data.json(); });
    }

    getWordCategory(id: number) {
        return this.http.get(this.baseUrl + 'api/WordCategory/' + id)
            .map(data => { return <Category>data.json(); });
    }

    getWordSubCategorySelection(id : number) {
        return this.http.get(this.baseUrl + 'api/WordCategory/' + id + '/SubCategory/Selection')
            .map(data => { return <SelectionItem[]>data.json(); });
    }

    createWordSubCategory(subCategory: SubCategory) {
        return this.http.put(this.baseUrl + 'api/SubCategory', JSON.stringify(subCategory), this.createOptionJsonContentType())
            .map(data => { return <SubCategory>data.json(); });
    }

    updateWordSubCategory(subCategory: SubCategory) {
        return this.http.post(this.baseUrl + 'api/SubCategory/' + subCategory.id, JSON.stringify(subCategory), this.createOptionJsonContentType())
            .map(data => { return <SubCategory>data.json(); });
    }


    getWordSubCategory(id: number) {
        return this.http.get(this.baseUrl + 'api/SubCategory/' + id)
            .map(data => { return <SubCategory>data.json(); });
    }


    getWordTranslation(id: number) {
        return this.http.get(this.baseUrl + 'api/WordTranslation/' + id)
            .map(data => {
                return <WordTranslation>data.json();
            });
    }

    createWordTranslation(wordTranslation: WordTranslation) {
        return this.http.put(this.baseUrl + 'api/WordTranslation', JSON.stringify(wordTranslation), this.createOptionJsonContentType())
            .map(data => { return <WordTranslation>data.json(); });
    }

    updateWordTranslation(wordTranslation: WordTranslation) {
        return this.http.post(this.baseUrl + 'api/WordTranslation/' + wordTranslation.id, JSON.stringify(wordTranslation), this.createOptionJsonContentType())
            .map(data => { return <WordTranslation>data.json(); });
    }

    getWordTranslations(id: number) {
        return this.http.get(this.baseUrl + 'api/SubCategory/' + id + '/wordtranslation')
            .map(data => {
                return <WordResultset>data.json();
            });
    }

    getWordTranslationsShuffled(id: number) {
        return this.http.get(this.baseUrl + 'api/SubCategory/' + id + '/wordtranslation/shuffled')
            .map(data => {
                return <WordResultset>data.json();
            });
    }

    createOptionJsonContentType() {
        let head = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: head });
    }

    getWordTranslated(punjabiword: string) {
        return this.http.get(this.baseUrl + 'api/WordTranslation/Translation?punjabi=' + punjabiword)
            .map(data => {
                return <WordTranslated>data.json();
            });
    }

    deleteWordSubCategory(id: number) {
        return this.http.delete(this.baseUrl + 'api/SubCategory/' + id)
            .map(data => { return <boolean>data.json(); });
    }

    deleteWordCategory(id: number) {
        return this.http.delete(this.baseUrl + 'api/WordCategory/' + id)
            .map(data => { return <boolean>data.json(); });
    }

    deleteWordTranslation(id: number) {
        return this.http.delete(this.baseUrl + 'api/WordTranslation/' + id)
            .map(data => { return <boolean>data.json(); });
    }
}
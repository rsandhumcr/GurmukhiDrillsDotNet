/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { WordmatchComponent } from './wordmatch.component';

let component: WordmatchComponent;
let fixture: ComponentFixture<WordmatchComponent>;

describe('wordmatch component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WordmatchComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(WordmatchComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
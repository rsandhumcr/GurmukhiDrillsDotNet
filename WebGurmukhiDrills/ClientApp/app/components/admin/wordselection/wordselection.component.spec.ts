/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { WordselectionComponent } from './wordselection.component';

let component: WordselectionComponent;
let fixture: ComponentFixture<WordselectionComponent>;

describe('wordselection component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WordselectionComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(WordselectionComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
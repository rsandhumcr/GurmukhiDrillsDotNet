/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from "@angular/platform-browser";
import { LetterrandomselectionComponent } from './letterrandomselection.component';

import { RandomQuestion } from '../../../../services/randomletter/randomletter.model';
import { CreateRandomLetterTestData } from '../common/letterrandom.testdata';

let component: LetterrandomselectionComponent,
    fixture: ComponentFixture<LetterrandomselectionComponent>,
    randomQuestionMockData: RandomQuestion[],
    element: HTMLElement;

describe('letter random selection component', () => {
    beforeEach(async(() => {

        let randomLetterTestData = new CreateRandomLetterTestData();
        randomQuestionMockData = randomLetterTestData.generateRandomLetterMockData().questions;

        TestBed.configureTestingModule({
            declarations: [LetterrandomselectionComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(LetterrandomselectionComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        component.questions = randomQuestionMockData;

    }));

    it('should have three buttons for each question', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let questionsection = element.querySelectorAll('.questionbtn');
                expect(questionsection.length).toEqual(3);
            });
        });
    });

    it('should have emit the correct index number after question selection', (done) => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.indexselection.subscribe( (numberindex : number) => {
                expect(numberindex).toEqual(2);
                done();
            });
            component.onIndexClick(2);
        });
    });

});
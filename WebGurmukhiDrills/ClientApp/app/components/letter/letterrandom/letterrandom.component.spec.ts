/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from "@angular/platform-browser";
import { DebugElement, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { RandomLetterData, RandomQuestion, TranslationResultSet } from '../../../services/randomletter/randomletter.model';
import { RandomletterService } from '../../../services/randomletter/randomletter.service';
import { LetterrandomComponent } from './letterrandom.component';
import { LetterrandomselectionComponent } from './letterrandomselection/letterrandomselection.component';
import { LetterrandomenglishComponent } from './letterrandomenglish/letterrandomenglish.component';
import { LetterrandomerrorComponent } from './letterrandomerror/letterrandomerror.component';
import { LetterrandompunjabiComponent } from './letterrandompunjabi/letterrandompunjabi.component';
import { CreateRandomLetterTestData } from './common/letterrandom.testdata';
import { ToastrService } from '../../../services/toastr/toastr.service';
import { LoggerService } from '../../../services/logger/logger.service';

describe('Letterrandom component', () => {
    let fixture: ComponentFixture<LetterrandomComponent>,
        component: LetterrandomComponent,
        element: HTMLElement,
        debugEl: DebugElement,
        mockRandomLetterData: RandomLetterData,
        randomletterServiceMock: any,
        toastrServiceMock: any,
        loggerServiceMock: any; 

    beforeEach(async(() => {

        // Create RandomLetterData mock and data.
        let testData = new CreateRandomLetterTestData();
        mockRandomLetterData = testData.generateRandomLetterMockData();

        randomletterServiceMock = jasmine.createSpyObj('randomletterServiceMock', ['getRandomLetter']);
        randomletterServiceMock.getRandomLetter.and.returnValue(Observable.of(mockRandomLetterData));

        toastrServiceMock = jasmine.createSpyObj('toastrServiceMock', ['postMessage']);
        loggerServiceMock = jasmine.createSpyObj('loggerServiceMock', ['logJson', 'log']);

        TestBed.configureTestingModule({
            declarations: [
                LetterrandomComponent,
                LetterrandomselectionComponent,
                LetterrandomenglishComponent,
                LetterrandomerrorComponent,
                LetterrandompunjabiComponent
            ],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: RandomletterService, useValue: randomletterServiceMock },
                { provide: ToastrService, useValue: ToastrService },
                { provide: ToastrService, useValue: toastrServiceMock },
                { provide: LoggerService, useValue: loggerServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }); 
        fixture = TestBed.createComponent(LetterrandomComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    }));

    describe('initial display', () => {

        it('should show description section by deafult and not questions section', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let description = element.querySelectorAll('.randomdescription');
                let questionsection = element.querySelectorAll('.randomquestions');
                expect(description.length).toBeTruthy();
                expect(questionsection.length).toBeFalsy();
            });
        });

        it('should have language mode as english by default', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.isPunjabi();
                expect(component.isPunjabi()).toBeFalsy();
            });
        });

        it('should have be in punjabi mode when punjabi language radio input is selected', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let punjabiradioel = fixture.debugElement.query(By.css('[name="punjabiRadio"]')).nativeElement;
                punjabiradioel.dispatchEvent(new Event('change'));
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(component.isPunjabi()).toBeTruthy();
                });
            });
        });

        // 
        it('should have switch to question mode when onGroupSelection is processed', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.onGroupSelection([1, 2, 3]);
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    let description = element.querySelectorAll('.randomdescription');
                    let questionsection = element.querySelectorAll('.randomquestions');
                    expect(description.length).toBeFalsy(); 
                    expect(questionsection.length).toBeTruthy();
                });
            });
        });

        it('should have called getRandomLetter on randomletterService when onGroupSelection is processed', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.onGroupSelection([1, 2, 3]);
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(randomletterServiceMock.getRandomLetter).toHaveBeenCalledWith(6,5, [1,2,3]);
                });
            });
        });

        it('should have set selectedRandomQuestion to the first question when onGroupSelection is processed', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.onGroupSelection([1, 2, 3]);
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(component.selectedRandomQuestion).toEqual(mockRandomLetterData.questions[0]);
                });
            });
        });

        it('should have set selectedRandomQuestion to the second question when onClickIndexselection is processed', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.onGroupSelection([1, 2, 3]);
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    component.onClickIndexselection(1);
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        expect(component.selectedRandomQuestion).toEqual(mockRandomLetterData.questions[1]);
                    });
                });
            });
        });
    });
});
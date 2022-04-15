/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule} from "@angular/platform-browser";
import { DebugElement,  NO_ERRORS_SCHEMA } from '@angular/core'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AudioService } from '../../../services/audio/audio.service';
import { LetterService } from '../../../services/letter/letter.service';
import { LetterGroupData, Letter } from '../../../services/letter/letter.model';
import { LetterBoardComponent } from './letterboard.component';
import { LettergroupselectionComponent } from '../common/lettergroupselection/lettergroupselection.component';
import { ToastrService } from '../../../services/toastr/toastr.service';
import { LoggerService  } from '../../../services/logger/logger.service';

describe('letter board component', () =>
{
    let fixture: ComponentFixture<LetterBoardComponent>,
        component: LetterBoardComponent,
        element: HTMLElement,
        debugEl: DebugElement,
        mockLetterGroupData : LetterGroupData,
        audioServiceMock: any,
        letterServiceMock: any,
        toastrServiceMock: any,
        loggerServiceMock: any;

    let generateLetterMockData = (suffixno: number) => {
        var suffixstr = String(suffixno);
        var letter01 = new Letter();
        letter01.punjabi = 'punjabi' + suffixstr;
        letter01.after = false;
        letter01.columnLocation = suffixno;
        letter01.description = 'description' + suffixstr;
        letter01.english = 'english' + suffixstr;
        letter01.englishEquivalent = 'englishEquivalent' + suffixstr;
        letter01.iast = 'iast' + suffixstr;
        letter01.image = 'image' + suffixstr;
        letter01.image1 = 'image1' + suffixstr;
        letter01.name = 'image' + suffixstr;
        letter01.nameFile = 'nameFile' + suffixstr;
        return letter01;
    };

    beforeEach(async(() => {

        // Create letter service mock and data.
        mockLetterGroupData = new LetterGroupData();
        mockLetterGroupData.groupTitle = "groupTitle";
        mockLetterGroupData.audioPrefix = "audioPrefix";
        mockLetterGroupData.imagePrefix = "imagePrefix";
        mockLetterGroupData.letters = [generateLetterMockData(1), generateLetterMockData(2), generateLetterMockData(3)];

        letterServiceMock = jasmine.createSpyObj('letterServiceMock', ['getLetterGroup']);
        letterServiceMock.getLetterGroup.and.returnValue(Observable.of(mockLetterGroupData));

        toastrServiceMock = jasmine.createSpyObj('toastrServiceMock', ['postMessage']);
        loggerServiceMock = jasmine.createSpyObj('loggerServiceMock', ['logJson', 'log']);

        // Create mock audio service.
        audioServiceMock = {};
        audioServiceMock = jasmine.createSpyObj('audioServiceMock', ['playAudioUrl']);
        audioServiceMock.playAudioUrl.and.returnValue();
        
        TestBed.configureTestingModule({
            declarations: [
                LetterBoardComponent,
                LettergroupselectionComponent
            ],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: AudioService, useValue: audioServiceMock },
                { provide: LetterService, useValue: letterServiceMock },
                { provide: ToastrService, useValue: toastrServiceMock },
                { provide: LoggerService, useValue: loggerServiceMock }
            ],
            //schemas: [NO_ERRORS_SCHEMA] // used for shallow test, but can hide other errors.
             
        }); //.compileComponents(); // use with systemJS.
        fixture = TestBed.createComponent(LetterBoardComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    }));

    describe('initial display', () => {
        
        it('should have the correct group title', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                var test = element.querySelector('h4');
                var texttest = test ? test.textContent : '';
                expect(texttest).toContain('groupTitle');
            });
        });

        it('should have 3 letter templates displayed', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                var letterTemplates = element.querySelectorAll('.lettertemplate');
                var amount = letterTemplates ? letterTemplates.length : '';
                expect(amount).toEqual(3);
            });
        });

        it('should have the correct punjabi label', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                var test = element.querySelector('.punjabiletter');
                var texttest = test ? test.textContent : '';
                expect(texttest).toContain('punjabi1');
            });
        });

        it('should have the correct english label', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let test = element.querySelector('.englishletter');
                let texttest = test ? test.textContent : '';
                expect(texttest).toContain('english1');
            });
        });

        it('should have the correct image src', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let test = element.querySelector('img');
                let texttest = test ? test.src : '';
                expect(texttest).toContain('imagePrefix/image1');
            });
        });

        it('should call the audio service when audio buttons are clicked', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let playbutton = <HTMLButtonElement>element.querySelector('.playbtn');
                playbutton.click();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(audioServiceMock.playAudioUrl).toHaveBeenCalledWith('audioPrefix/nameFile1');
                });
            });
        });

        it('when onSelection is invoked letter service getLetterGroup is called', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.onSelection(2);
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(letterServiceMock.getLetterGroup).toHaveBeenCalledWith(2);
                });
            });
        });

    });
});
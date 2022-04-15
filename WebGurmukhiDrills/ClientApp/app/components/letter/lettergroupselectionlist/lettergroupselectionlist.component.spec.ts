/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from "@angular/platform-browser";
import { DebugElement } from '@angular/core'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { LetterService } from '../../../services/letter/letter.service';
import { LetterGroupType } from '../../../services/letter/letter.model';
import { LettergroupselectionlistComponent } from './lettergroupselectionlist.component';
import { ToastrService } from '../../../services/toastr/toastr.service';
import { LoggerService } from '../../../services/logger/logger.service';

describe('Letter group selection list component', () => {
    let fixture: ComponentFixture<LettergroupselectionlistComponent>,
        component: LettergroupselectionlistComponent,
        element: HTMLElement,
        debugEl: DebugElement,
        letterServiceMock: any,
        toastrServiceMock: any,
        loggerServiceMock: any;

    let generateLetterGroupTypeMockData = (suffixno: number) => {
        var suffixstr = String(suffixno);
        var letterGroupType = new LetterGroupType();
        letterGroupType.groupName = 'groupName' + suffixstr;
        letterGroupType.groupType = suffixno;
        letterGroupType.indexes = [suffixno];
        letterGroupType.selected = false;
        return letterGroupType;
    };

    beforeEach(async(() => {

        // Create letter service mock and data.
        let letterGroupTypeMockData = [generateLetterGroupTypeMockData(1), generateLetterGroupTypeMockData(2), generateLetterGroupTypeMockData(3)];
        
        letterServiceMock = jasmine.createSpyObj('letterServiceMock', ['getLetterGroupTypes']);
        letterServiceMock.getLetterGroupTypes.and.returnValue(Observable.of(letterGroupTypeMockData));

        toastrServiceMock = jasmine.createSpyObj('toastrServiceMock', ['postMessage']);
        loggerServiceMock = jasmine.createSpyObj('loggerServiceMock', ['logJson', 'log']);

        TestBed.configureTestingModule({
            declarations: [
                LettergroupselectionlistComponent
            ],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: LetterService, useValue: letterServiceMock },
                { provide: ToastrService, useValue: toastrServiceMock },
                { provide: LoggerService, useValue: loggerServiceMock }
            ],
        }); 
        fixture = TestBed.createComponent(LettergroupselectionlistComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        
    }));

    describe('initial display', () => {

        it('should have getLetterGroupTypes been called', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(letterServiceMock.getLetterGroupTypes).toHaveBeenCalled();
            });
        });

        it('should have 3 letter groups checkboxes displayed', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                var letterTemplates = element.querySelectorAll('.lettergrpchk');
                var amount = letterTemplates ? letterTemplates.length : '';
                expect(amount).toEqual(3);
            });
        });

        it('should have the correct group name', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                var test = element.querySelector('.lettergrpname');
                var texttest = test ? test.textContent : '';
                expect(texttest).toContain('groupName1');
            });
        });

        it('should have selected 1 set to true when checkbox 1 is selected', () => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.handleChange("",1, {});
                expect(component.groupseletion[0].selected).toBeTruthy();
            });
        });

        it('should have emit the correct array after selections', (done) => {
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.processselection.subscribe( (numbers : number[]) => {
                    expect(numbers).toEqual([1, 2]);
                    done();
                });
                component.handleChange("", 1, {});
                component.handleChange("", 2, {});
                component.onShowSelected();
            });
        });

    });
});
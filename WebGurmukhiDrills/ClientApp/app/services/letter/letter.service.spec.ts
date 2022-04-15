import { } from 'jasmine';
import { LetterService } from './letter.service';
import { LetterGroupData} from './letter.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

describe('LetterService', () => {
    let letterservice: LetterService,
        baseurl: string,
        letterGroupData: LetterGroupData,
        utilityServiceMock: any,
        responseObjectMock: any,
        mapMock: any,
        mockHttp: any,
        groupId: number;

    beforeEach(() => {
        baseurl = 'baseurl';
        groupId = 1;
        // response object
        letterGroupData = new LetterGroupData();
        responseObjectMock = { json: Observable.of(letterGroupData)};
        // support map function in test.
        mapMock = { map: () => responseObjectMock };
        // support http call.
        mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
        mockHttp.get.and.returnValue(mapMock);
        // support utility service
        utilityServiceMock = jasmine.createSpyObj('utilityServiceMock', ['getBaseUrl']);
        utilityServiceMock.getBaseUrl.and.returnValue(baseurl);

        letterservice = new LetterService(mockHttp, utilityServiceMock);
    });

    describe('should get letters', () => {

        it('getLetterGroup calls correct url and return expected response', () => {
            // arrange
            // act
            var result = letterservice.getLetterGroup(1);
            // assert
            expect(result).toEqual(responseObjectMock);
            expect(mockHttp.get).toHaveBeenCalledWith(baseurl + 'api/letter/getgroup/' + groupId);
        });

        it('getLetterGroupTypes calls correct url and return expected response', () => {
            // arrange
            // act
            var result = letterservice.getLetterGroupTypes();
            // assert
            expect(result).toEqual(responseObjectMock);
            expect(mockHttp.get).toHaveBeenCalledWith(baseurl + 'api/lettergroups');
        });
    });
});
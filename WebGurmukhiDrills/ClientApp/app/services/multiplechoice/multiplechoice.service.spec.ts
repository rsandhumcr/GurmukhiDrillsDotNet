import { } from 'jasmine';
import { MultiplechoiceService } from './multiplechoice.service';
import { Questions} from './question.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

describe('LetterService', () => {
    let multiplechoiceService: MultiplechoiceService,
        baseurl: string,
        questions: Questions,
        utilityServiceMock: any,
        responseObjectMock: any,
        mapMock: any,
        mockHttp: any;

    beforeEach(() => {
        baseurl = 'baseurl';
        // response object
        questions = new Questions();
        responseObjectMock = { json: Observable.of(questions)};
        // support map function in test.
        mapMock = { map: () => responseObjectMock };
        // support http call.
        mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
        mockHttp.get.and.returnValue(mapMock);
        // support utility service       
        utilityServiceMock = jasmine.createSpyObj('utilityServiceMock', ['getBaseUrl']);
        utilityServiceMock.getBaseUrl.and.returnValue(baseurl);

        multiplechoiceService = new MultiplechoiceService(mockHttp, utilityServiceMock);
    });

    describe('should get questions', () => {

        it('getLetterGroup calls correct url and return expected response', () => {
            // arrange
            let groupIds = [1, 2, 3, 4, 5, 6];
            // act
            var result = multiplechoiceService.getLetterGroupMuliptleChoice(groupIds);
            // assert
            expect(result).toEqual(responseObjectMock);
            expect(mockHttp.get).toHaveBeenCalledWith(baseurl + 'api/LetterMulipleChoice?groupTypes=1&groupTypes=2&groupTypes=3&groupTypes=4&groupTypes=5&groupTypes=6');
        });
    });
});
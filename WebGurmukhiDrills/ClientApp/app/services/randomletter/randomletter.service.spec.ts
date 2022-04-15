import { } from 'jasmine';
import { RandomletterService } from './randomletter.service';
import { RandomLetterData } from './randomletter.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

describe('randomletter', () => {
    let randomletterService: RandomletterService,
        baseurl: string,
        utilityServiceMock: any,
        responseObjectMock: any,
        mapMock: any,
        mockHttp: any,
        groupId: number;

    beforeEach(() => {
        baseurl = 'baseurl';
        groupId = 1;
        // response object
        responseObjectMock = { json: Observable.of(new RandomLetterData())};
        // support map function in test.
        mapMock = { map: () => responseObjectMock };
        // support http call.
        mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
        mockHttp.get.and.returnValue(mapMock);
        // support utility service
        utilityServiceMock = jasmine.createSpyObj('utilityServiceMock', ['getBaseUrl']);
        utilityServiceMock.getBaseUrl.and.returnValue(baseurl);

        randomletterService = new RandomletterService(mockHttp, utilityServiceMock);
    });

    describe('getRandomLetter', () => {

        it('calls correct url and return expected response', () => {
            // arrange
            // act
            var result = randomletterService.getRandomLetter(1,1,[1]);
            // assert
            expect(result).toEqual(responseObjectMock);
            expect(mockHttp.get).toHaveBeenCalledWith(baseurl + 'api/RandomLetter?numberOfLetter=1&lengthOfLetter=1&groupTypes=1');
        });
    });
    describe('compareString', () => {

        it('with same string should return empty response', () => {
            // arrange
            // act
            var result = randomletterService.compareString('', '');
            // assert
            expect(result.length).toEqual(0);
        });

        it('with different string should return one length array response', () => {
            // arrange
            // act
            var result = randomletterService.compareString('a', 'b');
            // assert
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual(0);
        });

        it('with completely different string should return array length of two', () => {
            // arrange
            // act
            var result = randomletterService.compareString('ab', 'cd');
            // assert
            expect(result.length).toEqual(2);
            expect(result[0]).toEqual(0);
            expect(result[1]).toEqual(1);
        });

        it('with slighty different string should return array length of two', () => {
            // arrange
            // act
            var result = randomletterService.compareString('abef', 'abcd');
            // assert
            expect(result.length).toEqual(2);
            expect(result[0]).toEqual(2);
            expect(result[1]).toEqual(3);
        });
    });
});
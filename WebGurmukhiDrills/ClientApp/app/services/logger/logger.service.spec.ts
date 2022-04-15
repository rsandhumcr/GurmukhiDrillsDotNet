import { } from 'jasmine';
import { LoggerService, LogLevelType  } from './logger.service';

describe('LetterService', () => {
    let loggerService: LoggerService;

    beforeEach(() => {
        loggerService = new LoggerService();
    });

    describe('should record logs', () => {

        it('have a debug message debug when one is recorded', () => {
            // arrange
            let message = "debug message";
            // act
            loggerService.log(LogLevelType.Debug, message);
            // assert
            let newData = loggerService.loggedData[0];
            expect(newData.loglevel).toEqual(LogLevelType.Debug);
            expect(newData.messges[0]).toBe(message);
        });

        it('have a info message debug when one is recorded', () => {
            // arrange
            let message = "info message";
            // act
            loggerService.log(LogLevelType.Info, message);
            // assert
            let newData = loggerService.loggedData[0];
            expect(newData.loglevel).toEqual(LogLevelType.Info);
            expect(newData.messges[0]).toEqual(message);
        });

        it('have a Success message debug when one is recorded', () => {
            // arrange
            let message = "Success message";
            // act
            loggerService.log(LogLevelType.Success, message);
            // assert
            let newData = loggerService.loggedData[0];
            expect(newData.loglevel).toEqual(LogLevelType.Success);
            expect(newData.messges[0]).toEqual(message);
        });

        it('have a Error message debug when one is recorded', () => {
            // arrange
            let message = "Error message";
            // act
            loggerService.log(LogLevelType.Error, message);
            // assert
            let newData = loggerService.loggedData[0];
            expect(newData.loglevel).toEqual(LogLevelType.Error);
            expect(newData.messges[0]).toEqual(message);
        });

        it('have a recorded multiple logs', () => {
            // arrange
            let message = "any message";
            // act
            loggerService.log(LogLevelType.Info, message);
            loggerService.log(LogLevelType.Error, message);
            loggerService.log(LogLevelType.Success, message);
            loggerService.log(LogLevelType.Debug, message);
            loggerService.log(LogLevelType.Warning, message);
            // assert
            expect(loggerService.loggedData.length).toEqual(5);
        });


        describe('only log when logging level is higher', () => {
            it('have a recorded multiple logs', () => {
                // arrange
                let message = "logging level set message";
                // act
                loggerService.logLevel = LogLevelType.Success;
                loggerService.log(LogLevelType.Info, message);
                loggerService.log(LogLevelType.Error, message);
                loggerService.log(LogLevelType.Success, message);
                loggerService.log(LogLevelType.Debug, message);
                loggerService.log(LogLevelType.Warning, message);
                // assert
                expect(loggerService.loggedData.length).toEqual(3);
            });            
        });
    });
});
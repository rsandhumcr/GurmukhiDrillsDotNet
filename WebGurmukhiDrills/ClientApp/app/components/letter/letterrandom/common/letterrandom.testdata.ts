import { RandomLetterData, RandomQuestion, TranslationResultSet } from '../../../../services/randomletter/randomletter.model';

export class CreateRandomLetterTestData {

    generateRandomQuestionData(suffixno: number){
        var suffixstr = String(suffixno);
        var randomQuestion = new RandomQuestion();
        randomQuestion.givenAnwser = 'anwser' + suffixstr;
        randomQuestion.anwsered = false;
        randomQuestion.feedback = [suffixstr, 'fb'];
        randomQuestion.translation = new TranslationResultSet();
        randomQuestion.translation.punjabi = 'punjabi' + suffixstr;
        randomQuestion.translation.english = 'english' + suffixstr;
        randomQuestion.translation.equivalentEnglish = 'equivalentEnglish' + suffixstr;
        return randomQuestion;
    };

    public generateRandomLetterMockData() {
        let mockRandomLetterData: RandomLetterData = new RandomLetterData();
        mockRandomLetterData.questions = [this.generateRandomQuestionData(1), this.generateRandomQuestionData(2), this.generateRandomQuestionData(3)];
        mockRandomLetterData.englishLetters = ['a', 'b', 'c'];
        mockRandomLetterData.punjabiLetters = ['d', 'e', 'f'];
        mockRandomLetterData.lengthOfwords = 4;
        mockRandomLetterData.noOfLetters = 5;
        return mockRandomLetterData;
    }
}
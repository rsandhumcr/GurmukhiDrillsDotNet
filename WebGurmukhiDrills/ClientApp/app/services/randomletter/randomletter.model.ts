export class RandomLetterData {
    public noOfLetters: number;
    public lengthOfwords: number;
    public questions: RandomQuestion[];
    public englishLetters: string[];
    public punjabiLetters: string[];
}

export class RandomQuestion {
    public anwsered: boolean;
    public givenAnwser: string;
    public feedback: string[];
    public translation: TranslationResultSet;
}

export class TranslationResultSet {
    public punjabi: string;
    public english: string;
    public equivalentEnglish: string;
    public translation: string;
}
export class LayoutContent {
    public label: string;
    public content: string;
    public contentType: number;
}

export class AnswerData {
    public index: number;
    public optionLabel: string;
    public listLayout: LayoutContent[];
    public correctOption: boolean;
    public isSelected : boolean;

}

export class Question
{
    public layoutQuestion: LayoutContent[];
    public listAnwsers: AnswerData[];
    public anwsered: boolean;
    public correct: boolean;
    public selectedAnwser: string;
    public correctAnwser: string;
    public index: number;
}

export class Questions {
    public title: string;
    public noOfQuestions: number;
    public description: string;
    public questionAnwsered: number;
    public imagePrefix: string;
    public audioPrefix: string;
    public listQuestion: Question[];
}
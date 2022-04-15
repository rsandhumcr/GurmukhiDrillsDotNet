import { AnswerData, Question,Questions, LayoutContent } from "../../../services/multiplechoice/question.model";

export class MutiltpleChoiceTestData {


    generateLayoutContent(index: number, suffix: string) {
        let layoutQuestion = new LayoutContent();
        let strindex = String(index);
        layoutQuestion.label = "label" + suffix + strindex;
        layoutQuestion.content = "content" + suffix + strindex;
        layoutQuestion.contentType = index;
        return layoutQuestion;
    }

    generateAnwserData(index: number, suffix: string) {
        let anwser = new AnswerData();
        anwser.index = index;
        anwser.optionLabel = suffix + String(index);
        anwser.correctOption = (index === 1);
        anwser.isSelected = false;
        anwser.listLayout = [this.generateLayoutContent(1, "one"), this.generateLayoutContent(2, "two"), this.generateLayoutContent(3, "three"), this.generateLayoutContent(4, "four"), this.generateLayoutContent(5, "five"), this.generateLayoutContent(6, "six")];
        return anwser;
    }

    generateQuestionData(index: number) {
        let question = new Question();
        question.index = index;
        question.layoutQuestion = [this.generateLayoutContent(1, "one"), this.generateLayoutContent(2, "two"), this.generateLayoutContent(3, "three")];
        question.listAnwsers = [this.generateAnwserData(1, "one"), this.generateAnwserData(2, "two"), this.generateAnwserData(3, "three")];
        question.anwsered = false;
        question.correct = false;
        question.correctAnwser = question.listAnwsers[0].optionLabel;
        question.selectedAnwser = '';
        return question;
    }

    generateQuestionsTestData() {

        let questions = new Questions();
        questions = new Questions();
        questions.audioPrefix = 'audioPrefix';
        questions.imagePrefix = 'imagePrefix';
        questions.listQuestion = [this.generateQuestionData(0), this.generateQuestionData(1), this.generateQuestionData(2), this.generateQuestionData(3)];
        questions.listQuestion[0].anwsered = true;
        questions.listQuestion[0].correct = true;
        questions.listQuestion[2].anwsered = true;
        questions.listQuestion[2].correct = false;
        questions.description = "question description";
        return questions;
    }
}
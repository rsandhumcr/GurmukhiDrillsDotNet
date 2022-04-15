export class Letter {
    order: number;
    name: string;
    punjabi: string;
    english: string;
    englishEquivalent: string;
    iast: string;
    rowLocation: number;
    columnLocation: number;
    type: string;
    after: boolean;
    description: string;
    image: string;
    image1: string;
    nameFile: string;
    pronouncefile: string;
}

export class LetterGroupData {
    public letters: Letter[];
    public groupTitle: string;
    public audioPrefix: string;
    public imagePrefix: string;
}

export class LetterGroupType {
    public groupType: number;
    public groupName: string;
    public indexes: number[];
    public selected: boolean;
}


export class WordSelectionData {
    public selectedCategoryId: number = 0;
    public selectedSubCategoryId: number = 0;
    public selectedTransId: number = 0;
    public selectionType: SelectionType;
    public actionType: ActionType;

    constructor(categoryId: number, subCategoryId: number, transId: number, selectionType: SelectionType, actionType: ActionType ) {
        this.selectedCategoryId = categoryId;
        this.selectedSubCategoryId = subCategoryId;
        this.selectedTransId = transId;
        this.selectionType = selectionType;
        this.actionType = actionType;
    }
}

export enum SelectionType {
    Category = 1,
    SubCategory = 2,
    Translation = 3
}

export enum ActionType {
    Select = 1,
    Add = 2,
    Edit = 3,
    Delete = 4
}

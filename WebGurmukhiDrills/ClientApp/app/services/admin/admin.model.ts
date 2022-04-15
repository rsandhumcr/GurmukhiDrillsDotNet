
export class Category {
    public id: number;
    public name: string;
    public modifiedBy: string;
    public modifiedOn: Date;
}

export class SubCategory {
    public id: number;
    public name: string;
    public url: string;
    public orderNumber: number;
    public categoryId: number;
    public modifiedBy: string;
    public modifiedOn: Date;
}

export class Translation {
    public id: number;
    public punjabi: string;
    public english: string;
    public character: string;
    public equivalent: string;
    public description: string;
    public audioFileName: string;
    public imageFileName: string;
    public orderNumber: number;
    public subCategoryId: number;
    public modifiedBy: string;
    public modifiedOn: Date;
}
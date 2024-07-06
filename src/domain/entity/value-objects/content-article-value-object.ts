export class ContentArticleValueObject {
    public readonly type: "article" = "article";
    public readonly status:"filled" = "filled";
    public articleContent: string;

    constructor(articleContent: string) {
        this.articleContent = articleContent;
    }
}

export class OperadorMatematico {

    static readonly MAOI = new OperadorMatematico('>=', '≥');

    static readonly MEOI = new OperadorMatematico('<=', '≤');

    Id: String;
    Description: String;

    private constructor(Id: String,
        Description: string) {
        this.Id = Id;
        this.Description = Description;
    }

}
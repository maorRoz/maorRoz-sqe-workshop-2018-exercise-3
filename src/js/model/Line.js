export default class Line {
    constructor(lineType){
        this.lineType = lineType;
        this.lineName = '';
        this.lineCondition = '';
        this.lineValue = '';
        this.lineBody = [];
        this.conditionColor = undefined;
        this.alternate = undefined;
    }

}
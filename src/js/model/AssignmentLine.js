import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'assignmentExpression';

export default class AssignmentLine extends Line {
    constructor(expression){
        const { left , right} = expression;
        super(type);
        this.lineName = extractValue(left || expression);
        this.lineValue = extractValue(right);
        
    }

    toString(){
        const value = this.lineValue ? ` = ${this.lineValue}` : '';
        return `${this.lineName}${value}`;
    }
}
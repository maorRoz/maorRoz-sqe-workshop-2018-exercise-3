import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'returnStatement';

export default class ReturnLine extends Line{
    constructor(statement){
        const { argument } = statement;
        super(type);
        this.lineValue = extractValue(argument);
    }

    toString(){
        return `return ${this.lineValue}`;
    }
}
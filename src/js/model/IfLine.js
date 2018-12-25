import Line from './Line';
import { extractValue } from '../valueExtractor';

const type = 'ifStatement';

export default class IfLine extends Line{
    constructor(statement, body, alternate){
        const { test } = statement;
        super(type);
        this.lineCondition = extractValue(test);
        this.lineBody = body;
        this.alternate = alternate;
    }

    toString(){
        return this.lineCondition;
    }
}
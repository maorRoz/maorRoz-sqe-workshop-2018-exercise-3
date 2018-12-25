import IfLine from './IfLine';

const type = 'elseIfStatement';

export default class ElseIfLine extends IfLine{
    constructor(statement, body, alternate){
        super(statement, body, alternate);
        this.lineType = type;
    }

    toString(){
        return this.lineCondition;
    }
}
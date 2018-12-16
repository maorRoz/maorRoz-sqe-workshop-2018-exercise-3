import Line from './Line';

const type = 'elseStatement';

export default class ElseLine extends Line{
    constructor(body){
        super(type);
        this.lineBody = body;
    }
}
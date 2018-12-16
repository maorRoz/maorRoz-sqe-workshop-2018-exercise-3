import Line from './Line';

const type = 'functionDeclaration';

export default class FunctionLine extends Line{
    constructor(object, body, parameters){
        const { name} = object.id;
        super(type);
        this.parameters = parameters;
        this.lineName = name;
        this.lineBody = body;
    }
}
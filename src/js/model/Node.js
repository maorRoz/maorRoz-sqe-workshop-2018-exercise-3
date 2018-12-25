export default class Node{
    constructor(index, body, env){
        this.index = index;
        this.body = body;
        this.env = env;
        this.toColor = false;
    }

    toTest(){
        return true;
    }

    toString(){
        const toFillColor = this.toColor ? 'fillcolor="#32CD32"' : '';
        return `${this.index}[label="${this.body.join('\n')}" ${toFillColor}];`;
    }

}
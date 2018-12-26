export default class Node{
    constructor(index, body, env){
        this.index = index;
        this.body = body;
        this.env = env;
        this.toColor = false;
        this.shape = 'circle';
    }

    toTest(){
        return true;
    }

    toString(){
        const toFillColor = this.toColor ? 'fillcolor=green' : '';
        return `${this.index}[label="${this.body.join('\n')}" shape=${this.shape} ${toFillColor}];`;
    }

}
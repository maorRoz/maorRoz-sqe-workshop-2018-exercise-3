export default class Node{
    constructor(index, body, env){
        this.index = index;
        this.body = body;
        this.env = env;
        this.hasColor = false;
        this.shape = 'circle';
    }

    toColor(){
        this.hasColor = true;
        return true;
    }

    toString(){
        const toFillColor = this.hasColor ? 'fillcolor=green' : '';
        return `${this.index}[label="${this.body.join('\n')}" shape=${this.shape} ${toFillColor}];`;
    }

}
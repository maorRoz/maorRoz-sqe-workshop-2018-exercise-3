export default class Node{
    constructor(index, body, env){
        this.index = index;
        this.body = body;
        this.env = env;
        this.hasColor = false;
        this.shape = 'circle';
    }

    toString(){
        const toFillColor = this.hasColor ? 'fillcolor=green' : '';
        return `${this.index}[label="${this.body.join('\n')}" xlabel="${this.index}" shape=${this.shape} ${toFillColor}];`;
    }

}
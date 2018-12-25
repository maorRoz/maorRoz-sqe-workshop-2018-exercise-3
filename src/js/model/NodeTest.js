import Node from './Node';

export default class NodeTest extends Node {
    constructor(index, body, trueNext, falseNext, env){
        super(index, body, env);
        this.trueNext = trueNext;
        this.falseNext = falseNext;
    }

    edges(){
        return `${this.index} -> ${this.trueNext} [label='T']; ${this.index} -> ${this.falseNext} [label='F'];`;
    }

}
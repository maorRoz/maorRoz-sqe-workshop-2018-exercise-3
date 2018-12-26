import Node from './Node';

export default class NodeTest extends Node {
    constructor(index, body, trueNext, falseNext, env){
        super(index, body, env);
        this.trueNext = trueNext;
        this.falseNext = falseNext;
        this.shape = 'diamond';
    }
    trueEdge(length){
        return this.trueNext > length ? '' : `${this.index} -> ${this.trueNext} [label="T"]; `;
    }

    falseEdge(length){
        return this.falseNext > length ? '' : `${this.index} -> ${this.falseNext} [label="F"];`;
    }

    edges(length){
        if(this.trueNext > length && this.falseNext > length){
            return;
        }
        return `${this.trueEdge(length)}${this.falseEdge(length)}`;
    }

    toTest(){
        return false;
    }

}
import Node from './Node';

export default class NodeBody extends Node {
    constructor(index, body, next, env){
        super(index, body, env);
        this.next = next;
    }

    edges(){
        return `${this.index} -> ${this.next};`;
    }

}
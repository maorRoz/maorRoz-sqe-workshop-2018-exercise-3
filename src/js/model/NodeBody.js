import Node from './Node';

export default class NodeBody extends Node {
    constructor(index, body, next, env){
        super(index, body, env);
        this.next = next;
        this.shape = 'box';
    }

    edges(length){
        return this.next > length ? undefined : `${this.index} -> ${this.next};`;
    }

}
import Node from './Node';

export default class NodeTest extends Node {
    constructor(index, body, evaluatedTest, trueNext, falseNext, env){
        super(index, body, env);
        this.evaluatedTest = evaluatedTest;
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

    toColor(valueMapper){
        this.hasColor = true;
        
        let toEvalCondition = this.evaluatedTest;
        valueMapper.forEach(entry => {
            const valueToReplace = Array.isArray(entry.value) ? `[${entry.value.join()}]` : entry.value;
            toEvalCondition = toEvalCondition.replace(new RegExp(entry.name, 'g'), valueToReplace);
        });
        const result = eval(toEvalCondition);
        return result ? this.trueNext : this.falseNext ;
    }

}
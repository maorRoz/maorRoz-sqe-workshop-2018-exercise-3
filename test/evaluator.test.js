import { expect } from 'chai';
import getEvaluatedNodeSystem from '../src/js/controller/evaluator';

describe('nodeSystemController Tests', () => {
    it('wtf', () => {
        const evaluatedNodes = getEvaluatedNodeSystem([], [], []);
        expect(evaluatedNodes).to.deep.equal([]);
    });
});
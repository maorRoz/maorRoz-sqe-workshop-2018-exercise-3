import { expect } from 'chai';
import codeToNodeSystem from '../src/js/controller/nodeSystemControler';

describe('nodeSystemController Tests', () => {
    it('wtf', () => {
        const nodes = codeToNodeSystem({ lineBody: []});
        expect(nodes).to.deep.equal([]);
    });
});
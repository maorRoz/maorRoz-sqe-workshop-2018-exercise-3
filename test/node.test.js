/* eslint-disable max-lines-per-function */

import { expect } from 'chai';
import { createExpectedNodeBody, createExpectedNodeTest} from '../src/js/util-test';
describe('Node Tests', () => {
    describe('toString Tests', () => {
        it('No Color', () => {
            const node = createExpectedNodeBody(1, ['x = 7'], 2, null);
            expect(node.toString()).to.equal('1[label="x = 7" xlabel="1" shape=box ];');
        });
    
        it('With Color', () => {
            const node = createExpectedNodeBody(1, ['x = 7'], 2, null);
            node.hasColor = true;
            expect(node.toString()).to.equal('1[label="x = 7" xlabel="1" shape=box fillcolor=green];');
        });
    });

    it('color nodetest', () => {
        const node = createExpectedNodeTest(1, ['x === 7'], 'x===7', 2, 3, null);
        node.toColor([{name: 'x', value:[1,2]}]);
        expect(node.hasColor).to.equal(true);
    });

    describe('Edges Tests', () => {
        it('NodeBody Edges - Next Exist', () => {
            const node = createExpectedNodeBody(1, ['x = 7'], 2, null);
            expect(node.edges(2)).to.equal('1 -> 2;');
        });

        it('NodeBody Edges - Next Not Exist', () => {
            const node = createExpectedNodeBody(1, ['x = 7'], 2, null);
            expect(node.edges(1)).to.equal(undefined);
        });

        it('NodeTest Edges - True and False Not Exist', () => {
            const node = createExpectedNodeTest(1, ['x < 7'], null, 2, 3, null);
            expect(node.edges(1)).to.equal(undefined);
        });

        it('NodeTest Edges - True Not Exist', () => {
            const node = createExpectedNodeTest(1, ['x < 7'], null, 3, 2, null);
            expect(node.edges(2)).to.equal('1 -> 2 [label="F"];');
        });

        it('NodeTest Edges - False Not Exist', () => {
            const node = createExpectedNodeTest(1, ['x < 7'], null, 4, 5, null);
            expect(node.edges(4)).to.equal('1 -> 4 [label="T"]; ');
        });

        it('NodeTest Edges', () => {
            const node = createExpectedNodeTest(1, ['x < 7'], null, 4, 5, null);
            expect(node.edges(5)).to.equal('1 -> 4 [label="T"]; 1 -> 5 [label="F"];');
        });
    });
});
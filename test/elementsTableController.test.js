/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import createMethodAndArguments from '../src/js/controller/elementsTableController';

describe('Element Table Controller Edge Cases', () => {
    it('no body', () => {
        const result = createMethodAndArguments({ body: []});
        expect(result).to.equal(undefined);
    });

    it('no body', () => {
        const result = createMethodAndArguments({ body: [{ type: 'fake' }]});
        expect(result).to.equal(undefined);
    });

});
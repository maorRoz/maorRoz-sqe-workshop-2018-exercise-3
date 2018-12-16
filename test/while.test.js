/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedWhileStatement, createExpectedReturnStatement, createExpectedAssignmentStatement } from '../src/js/util-test';

describe('Loop Tests' , () => {
    let functionElements;
    let testWhile;

    const expectedReturnY = createExpectedReturnStatement('y');
    const expectedWhileLine = createExpectedWhileStatement('t===1', [expectedReturnY]);
    const expectedWrapperWhile = createExpectedWhileStatement('x===1', [expectedWhileLine]);
    describe('While with one line', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nwhile(t === 1)\nreturn y;\n}');
            functionElements = lineBody;
            testWhile = functionElements[0];
        });

        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });

        it('While body length', () => {
            expect(testWhile.lineBody).to.have.lengthOf(1);
        });

        it('While', () => {
            expect(testWhile).to.deep.equal(expectedWhileLine);
        });
    });
    describe('While Body', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nwhile(t === 1){\nreturn y;\n}\n}');
            functionElements = lineBody;
            testWhile = functionElements[0];
        });

        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });

        it('While body length', () => {
            expect(testWhile.lineBody).to.have.lengthOf(1);
        });

        it('While', () => {
            expect(testWhile).to.deep.equal(expectedWhileLine);
        });
    });
    describe('While Inside While', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nwhile(x === 1)\nwhile(t === 1)\nreturn y;\n}');
            functionElements = lineBody;
            testWhile = functionElements[0];
        });
        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });

        it('While body length', () => {
            expect(testWhile.lineBody).to.have.lengthOf(1);
        });
        it('Whiles', () => {
            expect(testWhile).to.deep.equal(expectedWrapperWhile);
        });
    });
});
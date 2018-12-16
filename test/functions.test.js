/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedFunction } from '../src/js/util-test';

describe('Function Tests' , () => {
    let testFunction;

    describe('Function with no arguments', () => {
        beforeEach(() => {
            testFunction = makeTestableFunction('function hello(){}');
        });
        it('Function body length', () => {
            expect(testFunction.lineBody).to.have.lengthOf(0);
        });
        it('Function', () => {
            const expectedFunctionLine = createExpectedFunction('hello');
            expect(testFunction).to.deep.equal(expectedFunctionLine);
        });
    });

    describe('Function Arguments', () => {
        describe('Function with one argument', () => {
            beforeEach(() => {
                testFunction = makeTestableFunction('function hello(n){}');
            });
            it('Function body length', () => {
                expect(testFunction.lineBody).to.have.lengthOf(0);
            });
            it('Function', () => {
                const parameters = ['n'];
                const expectedFunctionLine = createExpectedFunction('hello', parameters);
                expect(testFunction).to.deep.equal(expectedFunctionLine);
            });
        });
        describe('Function with two arguments', () => {
            beforeEach(() => {
                testFunction = makeTestableFunction('function hello(n,m){}');
            });
            it('Function body length', () => {
                expect(testFunction.lineBody).to.have.lengthOf(0);
            });
            it('Function', () => {
                const parameters = ['n','m'];
                const expectedFunctionLine = createExpectedFunction('hello', parameters);
                expect(testFunction).to.deep.equal(expectedFunctionLine);
            });
        });
    });
});
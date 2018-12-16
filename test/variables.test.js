/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedAssignmentStatement } from '../src/js/util-test';

describe('Variable Tests' , () => {
    let functionElements;

    describe('Variables Declarations', () => {
        const expectedVariableLineX = createExpectedAssignmentStatement('x');
        describe('One Variable in Function Body', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nlet x;\n}');
                functionElements = lineBody;
            });
            it('Function body length', () => {
                expect(functionElements).to.have.lengthOf(1);
            });
            it('Variable Line', () => {
                expect(functionElements[0]).to.deep.equal(expectedVariableLineX);
            });
        });
        describe('Two Variables in Function Body', () => {
            const expectedVariableLineX = createExpectedAssignmentStatement('x');
            describe('Two Variables in Function Body in same line', () => {
                const expectedVariableLineY = createExpectedAssignmentStatement('y');
                beforeEach(() => {
                    const { lineBody } = makeTestableFunction('function hello(){\nlet x,y\n}');
                    functionElements = lineBody;
                });
                it('Function body length', () => {
                    expect(functionElements).to.have.lengthOf(2);
                });
                it('Variable Line', () => {
                    expect(functionElements[0]).to.deep.equal(expectedVariableLineX);
                    expect(functionElements[1]).to.deep.equal(expectedVariableLineY);
                });
            });
            describe('Two Variables in Function Body in seperate line', () => {
                const expectedVariableLineY = createExpectedAssignmentStatement('y');
                beforeEach(() => {
                    const { lineBody } = makeTestableFunction('function hello(){\nlet x;\nlet y;\n}');
                    functionElements = lineBody;
                });
                it('Function body length', () => {
                    expect(functionElements).to.have.lengthOf(2);
                });
                it('Variable Line', () => {
                    expect(functionElements[0]).to.deep.equal(expectedVariableLineX);
                    expect(functionElements[1]).to.deep.equal(expectedVariableLineY);
                });
            });
        });
    });
});
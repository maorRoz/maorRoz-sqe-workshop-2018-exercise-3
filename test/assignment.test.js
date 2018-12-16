/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedAssignmentStatement } from '../src/js/util-test';

describe('Assignment Tests' , () => {
    let functionElements;

    const expectedAssignmentX = createExpectedAssignmentStatement('x','1');
    const expectedAssignmentY = createExpectedAssignmentStatement('y','x');
    const expectedAssignmentZ = createExpectedAssignmentStatement('z','x>2');
    describe('One Assignment', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nx = 1;\n}');
            functionElements = lineBody;
        });
        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });
        it('If Line', () => {
            expect(functionElements[0]).to.deep.equal(expectedAssignmentX);
        });
    });
    describe('Two Assignment', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nx = 1;\ny = x;\n}');
            functionElements = lineBody;
        });
        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(2);
        });
        it('If Line', () => {
            expect(functionElements[0]).to.deep.equal(expectedAssignmentX);
            expect(functionElements[1]).to.deep.equal(expectedAssignmentY);
        });
    });
    describe('Two assignment, assignment of binary expression', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nx = 1;\nz = x > 2;\n}');
            functionElements = lineBody;
        });
        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(2);
        });
        it('If Line', () => {
            expect(functionElements[0]).to.deep.equal(expectedAssignmentX);
            expect(functionElements[1]).to.deep.equal(expectedAssignmentZ);
        });
    });
});
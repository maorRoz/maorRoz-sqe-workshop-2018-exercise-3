/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {extractValue} from '../src/js/valueExtractor';

describe('Value Extractor Tests', () => {
    describe('UnaryExpression', () => {
        it('UnaryExpression', () => {
            const unaryExpression = { type: 'UnaryExpression', operator: '-', argument: {type: 'Literal', raw: '5'}};
            const stringResult = extractValue(unaryExpression);
            expect(stringResult).to.equal('-5');
        });
        it('UnaryExpression with parenthesis', () => {
            const unaryExpression = { type: 'UnaryExpression', operator: '-', argument: {type: 'Literal', raw: '5'}};
            const stringResult = extractValue(unaryExpression, true);
            expect(stringResult).to.equal('(-5)');
        });
    });

    describe('BinaryExpression', () => {
        it('BinaryExpression', () => {
            const binaryExpression = { type: 'BinaryExpression', operator: '+', left: {type: 'Literal', raw: '5'}, right: {type: 'Literal', raw: '2'}};
            const stringResult = extractValue(binaryExpression);
            expect(stringResult).to.equal('5+2');
        });
        it('BinaryExpression with parenthesis', () => {
            const binaryExpression = { type: 'BinaryExpression', operator: '+', left: {type: 'Literal', raw: '5'}, right: {type: 'Literal', raw: '2'}};
            const stringResult = extractValue(binaryExpression, true);
            expect(stringResult).to.equal('(5+2)');
        });
    });

    describe('MemberExpression', () => {
        it('Computed MemberExpression', () => {
            const memberExpression = { 
                type: 'MemberExpression',
                object:{ type: 'Identifier', name: 'id'},
                property: {type: 'Literal', raw: '5'},
                computed: true
            };
            const stringResult = extractValue(memberExpression);
            expect(stringResult).to.equal('id[5]');
        });
        it('Not Computed MemberExpression', () => {
            const memberExpression = { 
                type: 'MemberExpression',
                object:{ type: 'Identifier', name: 'id'},
                property: { type: 'Identifier', name: 'field'},
                computed: false
            };
            const stringResult = extractValue(memberExpression);
            expect(stringResult).to.equal('id.field');
        });
    });

    describe('UpdateExpression', () => {
        it('UpdateExpression', () => {
            const updateExpression = { type: 'UpdateExpression', operator: '--', argument: {type: 'Literal', raw: '2'}};
            const stringResult = extractValue(updateExpression);
            expect(stringResult).to.equal('--2');
        });
        it('UpdateExpression with parenthesis', () => {
            const updateExpression = { type: 'UpdateExpression', operator: '++', argument: { type: 'Identifier', name: 'i'}};
            const stringResult = extractValue(updateExpression, true);
            expect(stringResult).to.equal('(++i)');
        });
    });

    
    describe('AssignmentExpression', () => {
        it('AssignmentExpression', () => {
            const assignmentExpression = { type: 'AssignmentExpression', operator: '=', left: { type: 'Identifier', name: 'n'}, right: { type: 'Identifier', name: 'm'}};
            const stringResult = extractValue(assignmentExpression);
            expect(stringResult).to.equal('n=m');
        });
        it('AssignmentExpression with parenthesis', () => {
            const assignmentExpression = { type: 'AssignmentExpression', operator: '=', left: { type: 'Identifier', name: 'i'}, right: {type: 'Literal', raw: '5'}};
            const stringResult = extractValue(assignmentExpression, true);
            expect(stringResult).to.equal('(i=5)');
        });
    });

    it('ArrayExpression', () => {
        const arrayExpression = { type: 'ArrayExpression', elements: [
            { type: 'Identifier', name: 'id'},
            {type: 'Literal', raw: '13'},
            {type: 'Literal', raw: '15'}

        ]};
        const stringResult = extractValue(arrayExpression);
        expect(stringResult).to.equal('[id,13,15]');
    });



    it('Identifier', () => {
        const identifierExpression = { type: 'Identifier', name: 'id'};
        const stringResult = extractValue(identifierExpression);
        expect(stringResult).to.equal('id');
    });

    it('Literal', () => {
        const literalExpression = {type: 'Literal', raw: '13'};
        const stringResult = extractValue(literalExpression);
        expect(stringResult).to.equal('13');
    });

    it('Faked Type', () => {
        const fakedExpression = {type: 'fake'};
        const stringResult = extractValue(fakedExpression);
        expect(stringResult).to.equal('');
    });
});
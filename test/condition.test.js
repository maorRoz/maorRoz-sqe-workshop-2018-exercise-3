/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import {makeTestableFunction, createExpectedIfStatement, createExpectedElseIfStatement,
     createExpectedElseStatement, createExpectedReturnStatement } from '../src/js/util-test';

describe('Condition Tests' , () => {
    let functionElements;
    let testIf;

    const expectedReturnH = createExpectedReturnStatement('h');
    const expectedElseLine = createExpectedElseStatement([expectedReturnH]);
    const expectedReturnT = createExpectedReturnStatement('t');
    const expectedSecondElseIfLine = createExpectedElseIfStatement('x===3', [expectedReturnT]);
    const expectedReturnZ = createExpectedReturnStatement('z');
    const expectedFirstElseIfLine = createExpectedElseIfStatement('x===2', [expectedReturnZ]);
    const expectedReturnY = createExpectedReturnStatement('y');
    const expectedIfLine = createExpectedIfStatement('x===1', [expectedReturnY]);

    describe('Only If', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\n}');
            functionElements = lineBody;
            testIf = functionElements[0];
        });
        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });

        it('If body length', () => {
            expect(testIf.lineBody).to.have.lengthOf(1);
        });

        it('If', () => {
            expect(functionElements[0]).to.deep.equal(expectedIfLine);
        });
    });
    describe('Else Tests', () => {
        let testElseIf;

        describe('One Else If', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\n}');
                functionElements = lineBody;
                testIf = functionElements[0];
                testElseIf = testIf.alternate;
            });
            it('Function body length', () => {
                expect(functionElements).to.have.lengthOf(1);
            });

            it('If body length', () => {
                expect(testIf.lineBody).to.have.lengthOf(1);
            });

            it('Else if body length', () => {
                expect(testElseIf.lineBody).to.have.lengthOf(1);
            });

            it('If Line', () => {
                const currenteExpectedIf = {...expectedIfLine, alternate: expectedFirstElseIfLine};
                expect(testIf).to.deep.equal(currenteExpectedIf);
            });
        });
        describe('Two Else If', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\nelse if(x === 3)\nreturn t;\n}');
                functionElements = lineBody;
                testIf = functionElements[0];
                testElseIf = testIf.alternate;
            });
            it('Function body length', () => {
                expect(functionElements).to.have.lengthOf(1);
            });

            it('If body length', () => {
                expect(testIf.lineBody).to.have.lengthOf(1);
            });

            it('Else if body length', () => {
                expect(testElseIf.lineBody).to.have.lengthOf(1);
            });

            it('If', () => {
                const currentExpectedElseIf = {...expectedFirstElseIfLine, alternate: expectedSecondElseIfLine};
                const currentExpectedIf = {...expectedIfLine, alternate: currentExpectedElseIf};
                expect(testIf).to.deep.equal(currentExpectedIf);
            });
        });
        describe('Two Else If and Else', () => {
            let testElseIf;
            let testElse;

            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\nelse if(x === 2)\nreturn z;\nelse if(x === 3)\nreturn t;\nelse\nreturn h;\n}');
                functionElements = lineBody;
                testIf = functionElements[0];
                testElseIf = testIf.alternate;
                testElse = testElseIf.alternate;
            });

            it('Function body length', () => {
                expect(functionElements).to.have.lengthOf(1);
            });

            it('If body length', () => {
                expect(testIf.lineBody).to.have.lengthOf(1);
            });

            it('Else if body length', () => {
                expect(testElseIf.lineBody).to.have.lengthOf(1);
            });

            it('Else body length', () => {
                expect(testElse.lineBody).to.have.lengthOf(1);
            });

            it('If', () => {
                const currenteExpectedSecondElseIf = {...expectedSecondElseIfLine, alternate: expectedElseLine};
                const currentExpectedFirstElseIf = {...expectedFirstElseIfLine, alternate: currenteExpectedSecondElseIf};
                const currentExpectedIf = {...expectedIfLine, alternate: currentExpectedFirstElseIf};
                expect(testIf).to.deep.equal(currentExpectedIf);
            });
        });
        describe('If with only Else', () => {
            beforeEach(() => {
                const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1)\nreturn y;\nelse{\nreturn h;\n}\n}');
                functionElements = lineBody;
                testIf = functionElements[0];
            });
            it('Function body length', () => {
                expect(functionElements).to.have.lengthOf(1);
            });

            it('If body length', () => {
                expect(testIf.lineBody).to.have.lengthOf(1);
            });

            it('If', () => {
                const currentExpectedIf = {...expectedIfLine, alternate: expectedElseLine};
                expect(testIf).to.deep.equal(currentExpectedIf);
            });
        });
    });
    describe('If inside If', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nif(x > 2)\nif( x === 1)\nreturn y;\n}');
            functionElements = lineBody;
            testIf = functionElements[0];
        });
        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });
        it('If', () => {
            const expectedWrapperIfLine = createExpectedIfStatement('x>2', [expectedIfLine]);
            expect(testIf).to.deep.equal(expectedWrapperIfLine);
        });
    });
    describe('If body', () => {
        beforeEach(() => {
            const { lineBody } = makeTestableFunction('function hello(){\nif(x === 1){\nreturn y;\n}\n}');
            functionElements = lineBody;
            testIf = functionElements[0];
        });
        it('Function body length', () => {
            expect(functionElements).to.have.lengthOf(1);
        });

        it('If body length', () => {
            expect(testIf.lineBody).to.have.lengthOf(1);
        });

        it('If', () => {
            expect(testIf).to.deep.equal(expectedIfLine);
        });
    });
});
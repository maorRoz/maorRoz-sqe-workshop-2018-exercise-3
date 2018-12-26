/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { makeTestableNodeSystem, createExpectedNodeBody, createExpectedNodeTest } from '../src/js/util-test';



describe('nodeSystemController Tests', () => {
    describe('Assignment to Node', () => {
        it('Single Assignment', () => {
            const actualNodeSystem = makeTestableNodeSystem('function test(){ let x = 7;}');
            const expectedNodeBody = createExpectedNodeBody(1, ['x = 7'], 2, [{ name: 'x', value: '7'}]);
            const expectedNodeSystem = [ expectedNodeBody];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });

        it('Two Assignment', () => {
            const actualNodeSystem = makeTestableNodeSystem('function test(x){ let y = x; let z = y + 1;}');
            const expectedNodeBody = createExpectedNodeBody(1, ['y = x', 'z = y+1'], 2, [{ name: 'y', value: 'x'}, {name: 'z', value: '(x)+1'}]);
            const expectedNodeSystem = [ expectedNodeBody];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });
    });

    describe('Return to Node', () => {
        it('Return only', () => {
            const actualNodeSystem = makeTestableNodeSystem('function test(){ return 5;}');
            const expectedNodeBody = createExpectedNodeBody(1, ['return 5'], 2, []);
            const expectedNodeSystem = [ expectedNodeBody];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });

        it('Assignment -> Return', () => {
            const actualNodeSystem = makeTestableNodeSystem('function test(){ let x = 7; return x;}');
            const expectedAssignmentNodeBody = createExpectedNodeBody(1, ['x = 7'], 2, [{ name: 'x', value: '7'}]);
            const expectedReturnNodeBody = createExpectedNodeBody(2, ['return x'], 3);
            const expectedNodeSystem = [ expectedAssignmentNodeBody, expectedReturnNodeBody];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });
    });

    describe('If to Node', () => {
        describe('Only If', () => {
            it('Empty If', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){}}');
                const expectedAssignmentNodeBody = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 3, [{ name: 'm', value: '5'}]);
                const expectedNodeIfExit = createExpectedNodeBody(3, [''], 4, [{ name: 'm', value: '5'}], 'circle');
                const expectedNodeSystem = [ expectedAssignmentNodeBody, expectedNodeIfTest, expectedNodeIfExit];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it('If With Body', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){ m = 6;} m = 7;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 4, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 6'], 4, [{ name: 'm', value: '6'}]);
                const expectedNodeIfExit = createExpectedNodeBody(4, [''], 5, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['m = 7'], 6, [{ name: 'm', value: '7'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest,expectedAssignmentNodeBody2,
                    expectedNodeIfExit, expectedAssignmentNodeBody3];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });
        });

        describe('If with Else', () => {
            it('Empty Else', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){ m = 6;} else{} m = 7;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 4, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 6'], 4, [{ name: 'm', value: '6'}]);
                const expectedNodeIfExit = createExpectedNodeBody(4, [''], 5, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['m = 7'], 6, [{ name: 'm', value: '7'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest,expectedAssignmentNodeBody2,
                    expectedNodeIfExit, expectedAssignmentNodeBody3];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it('Empty If and Else', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){} else{} m = 7;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 3, [{ name: 'm', value: '5'}]);
                const expectedNodeIfExit = createExpectedNodeBody(3, [''], 4, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['m = 7'], 5, [{ name: 'm', value: '7'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest,
                    expectedNodeIfExit, expectedAssignmentNodeBody2];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it('If and Else with body', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){ m = 6;} else{ m = 7} m = 8;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 4, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 6'], 5, [{ name: 'm', value: '6'}]);
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(4, ['m = 7'], 5, [{ name: 'm', value: '7'}]);
                const expectedNodeIfExit = createExpectedNodeBody(5, [''], 6, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody4 = createExpectedNodeBody(6, ['m = 8'], 7, [{ name: 'm', value: '8'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest,expectedAssignmentNodeBody2,
                    expectedAssignmentNodeBody3, expectedNodeIfExit, expectedAssignmentNodeBody4];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });
        });

        describe('If With Else If', () => {
            it('Empty Else If', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){ m = 6;} else if(m === 6){} m = 8;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 4, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 6'], 6, [{ name: 'm', value: '6'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(4, ['m===6'], '(5)===6', 5, 5, [{ name: 'm', value: '5'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(5, [''], 6, [{ name: 'm', value: '5'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(6, [''], 7, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(7, ['m = 8'], 8, [{ name: 'm', value: '8'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest1, expectedAssignmentNodeBody2,
                    expectedNodeIfTest2, expectedNodeIfExit1,expectedNodeIfExit2, expectedAssignmentNodeBody3];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it('Empty Else If and If', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){} else if(m === 6){} m = 8;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===5'], '(5)===5', 5, 3, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(3, ['m===6'], '(5)===6', 4, 4, [{ name: 'm', value: '5'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(4, [''], 5, [{ name: 'm', value: '5'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(5, [''], 6, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(6, ['m = 8'], 7, [{ name: 'm', value: '8'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest1, 
                    expectedNodeIfTest2, expectedNodeIfExit1,expectedNodeIfExit2, expectedAssignmentNodeBody2];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it('If and Else If with body', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){ m = 6;} else if(m === 6){ m = 7} m = 8;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 4, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 6'], 7, [{ name: 'm', value: '6'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(4, ['m===6'], '(5)===6', 5, 6, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['m = 7'], 6, [{ name: 'm', value: '7'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(6, [''], 7, [{ name: 'm', value: '5'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(7, [''], 8, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody4 = createExpectedNodeBody(8, ['m = 8'], 9, [{ name: 'm', value: '8'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest1, expectedAssignmentNodeBody2,
                    expectedNodeIfTest2,expectedAssignmentNodeBody3, expectedNodeIfExit1,
                    expectedNodeIfExit2, expectedAssignmentNodeBody4];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });
        });

        describe('If with 2 Else If and Else', () => {
            it('All bodies are empty', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){} else if(m === 6){} else if(m === 7){} else{} m = 8;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===5'], '(5)===5', 7, 3, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(3, ['m===6'], '(5)===6', 6, 4, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest3 = createExpectedNodeTest(4, ['m===7'], '(5)===7', 5, 5, [{ name: 'm', value: '5'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(5, [''], 6, [{ name: 'm', value: '5'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(6, [''], 7, [{ name: 'm', value: '5'}], 'circle');
                const expectedNodeIfExit3 = createExpectedNodeBody(7, [''], 8, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(8, ['m = 8'], 9, [{ name: 'm', value: '8'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest1,
                    expectedNodeIfTest2, expectedNodeIfTest3, expectedNodeIfExit1,expectedNodeIfExit2,
                    expectedNodeIfExit3, expectedAssignmentNodeBody2];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it('All has bodies', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){ m = 6} else if(m === 6){ m = 7} else if(m === 7){ m = 8} else{ m = 9} m = 10;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 4, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 6'], 11, [{ name: 'm', value: '6'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(4, ['m===6'], '(5)===6', 5, 6, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['m = 7'], 10, [{ name: 'm', value: '7'}]);
                const expectedNodeIfTest3 = createExpectedNodeTest(6, ['m===7'], '(5)===7', 7, 8, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody4 = createExpectedNodeBody(7, ['m = 8'], 9, [{ name: 'm', value: '8'}]);
                const expectedAssignmentNodeBody5 = createExpectedNodeBody(8, ['m = 9'], 9, [{ name: 'm', value: '9'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(9, [''], 10, [{ name: 'm', value: '5'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(10, [''], 11, [{ name: 'm', value: '5'}], 'circle');
                const expectedNodeIfExit3 = createExpectedNodeBody(11, [''], 12, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody6 = createExpectedNodeBody(12, ['m = 10'], 13, [{ name: 'm', value: '10'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest1, expectedAssignmentNodeBody2,
                    expectedNodeIfTest2,expectedAssignmentNodeBody3, 
                    expectedNodeIfTest3, expectedAssignmentNodeBody4, expectedAssignmentNodeBody5,
                    expectedNodeIfExit1,expectedNodeIfExit2,
                    expectedNodeIfExit3, expectedAssignmentNodeBody6];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });
        });

        describe('If inside If', () => {
            it('Inner If empty', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){ m = 6; if( m === 6){}} m = 8;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 6, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 6'], 4, [{ name: 'm', value: '6'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(4, ['m===6'], '(6)===6', 5, 5, [{ name: 'm', value: '6'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(5, [''], 6, [{ name: 'm', value: '6'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(6, [''], 7, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(7, ['m = 8'], 8, [{ name: 'm', value: '8'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest1, expectedAssignmentNodeBody2,
                    expectedNodeIfTest2, expectedNodeIfExit1,expectedNodeIfExit2, expectedAssignmentNodeBody3];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it('Outer and Inner Ifs with bodies', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = 5; if(m === 5){ m = 6; if( m === 6){ m = 7}} m = 8;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 5'], 2, [{ name: 'm', value: '5'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===5'], '(5)===5', 3, 7, [{ name: 'm', value: '5'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 6'], 4, [{ name: 'm', value: '6'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(4, ['m===6'], '(6)===6', 5, 6, [{ name: 'm', value: '6'}]);
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['m = 7'], 6, [{ name: 'm', value: '7'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(6, [''], 7, [{ name: 'm', value: '6'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(7, [''], 8, [{ name: 'm', value: '5'}], 'circle');
                const expectedAssignmentNodeBody4 = createExpectedNodeBody(8, ['m = 8'], 9, [{ name: 'm', value: '8'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeIfTest1, expectedAssignmentNodeBody2,
                    expectedNodeIfTest2,expectedAssignmentNodeBody3,
                    expectedNodeIfExit1,expectedNodeIfExit2, expectedAssignmentNodeBody4];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });
        });
    });

    describe('While to Node', () => {
        describe('Only While', () => {
            it('Empty While', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = [1]; m[0] = 3; while(m[0] === 2){}}');
                const expectedAssignmentNodeBody = createExpectedNodeBody(1, ['m = [1]', 'm[0] = 3'], 2, [{ name: 'm', value: '[3]'}]);
                const expectedNodeWhileNull = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'm', value: '[3]'}]);
                const expectedNodeWhileTest = createExpectedNodeTest(3, ['m[0]===2'], '([3])[0]===2', 2, 4, [{ name: 'm', value: '[3]'}]);
                const expectedNodeWhileExit = createExpectedNodeBody(4, [''], 5, [{ name: 'm', value: '[3]'}], 'circle');
                const expectedNodeSystem = [ expectedAssignmentNodeBody, expectedNodeWhileNull, 
                    expectedNodeWhileTest, expectedNodeWhileExit];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it('While with Body', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = [1]; m[0] = 3; while(m[0] === 2){ m[0] = 4} m[0] = 5;}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = [1]', 'm[0] = 3'], 2, [{ name: 'm', value: '[3]'}]);
                const expectedNodeWhileNull = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'm', value: '[3]'}]);
                const expectedNodeWhileTest = createExpectedNodeTest(3, ['m[0]===2'], '([3])[0]===2', 4, 5, [{ name: 'm', value: '[3]'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['m[0] = 4'], 2, [{ name: 'm', value: '[4]'}]);
                const expectedNodeWhileExit = createExpectedNodeBody(5, [''], 6, [{ name: 'm', value: '[3]'}], 'circle');
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(6, ['m[0] = 5'], 7, [{ name: 'm', value: '[5]'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeWhileNull, 
                    expectedNodeWhileTest,expectedAssignmentNodeBody2, expectedNodeWhileExit, expectedAssignmentNodeBody3];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });
        });

        describe('While inside While', () => {
            it('Inner While Empty', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = [1]; m[0] = 3; while(m[0] === 2){ m[0] = 4; while( m[0] === 4){}} m[0] = 5}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = [1]', 'm[0] = 3'], 2, [{ name: 'm', value: '[3]'}]);
                const expectedNodeWhileNull1 = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'm', value: '[3]'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(3, ['m[0]===2'], '([3])[0]===2', 4, 8, [{ name: 'm', value: '[3]'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['m[0] = 4'], 5, [{ name: 'm', value: '[4]'}]);
                const expectedNodeWhileNull2 = createExpectedNodeBody(5, ['NULL'], 6, [{ name: 'm', value: '[4]'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(6, ['m[0]===4'], '([4])[0]===4', 5, 7, [{ name: 'm', value: '[4]'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(7, [''], 2, [{ name: 'm', value: '[4]'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(8, [''], 9, [{ name: 'm', value: '[3]'}], 'circle');
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(9, ['m[0] = 5'], 10, [{ name: 'm', value: '[5]'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1,expectedNodeWhileNull1,
                    expectedNodeIfTest1, expectedAssignmentNodeBody2, expectedNodeWhileNull2,
                    expectedNodeIfTest2, expectedNodeIfExit1,expectedNodeIfExit2, expectedAssignmentNodeBody3];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });

            it.only('Both Whiles has bodies', () => {
                const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = [1]; m[0] = 3; while(m[0] === 2){ m[0] = 4; while( m[0] === 4){ m[0] = 9}} m[0] = 5}');
                const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = [1]', 'm[0] = 3'], 2, [{ name: 'm', value: '[3]'}]);
                const expectedNodeWhileNull1 = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'm', value: '[3]'}]);
                const expectedNodeIfTest1 = createExpectedNodeTest(3, ['m[0]===2'], '([3])[0]===2', 4, 9, [{ name: 'm', value: '[3]'}]);
                const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['m[0] = 4'], 5, [{ name: 'm', value: '[4]'}]);
                const expectedNodeWhileNull2 = createExpectedNodeBody(5, ['NULL'], 6, [{ name: 'm', value: '[4]'}]);
                const expectedNodeIfTest2 = createExpectedNodeTest(6, ['m[0]===4'], '([4])[0]===4', 7, 8, [{ name: 'm', value: '[4]'}]);
                const expectedAssignmentNodeBody3 = createExpectedNodeBody(7, ['m[0] = 9'], 5, [{ name: 'm', value: '[9]'}]);
                const expectedNodeIfExit1 = createExpectedNodeBody(8, [''], 2, [{ name: 'm', value: '[4]'}], 'circle');
                const expectedNodeIfExit2 = createExpectedNodeBody(9, [''], 10, [{ name: 'm', value: '[3]'}], 'circle');
                const expectedAssignmentNodeBody4 = createExpectedNodeBody(10, ['m[0] = 5'], 11, [{ name: 'm', value: '[5]'}]);
                const expectedNodeSystem = [ expectedAssignmentNodeBody1,expectedNodeWhileNull1,
                    expectedNodeIfTest1, expectedAssignmentNodeBody2, expectedNodeWhileNull2,
                    expectedNodeIfTest2,expectedAssignmentNodeBody3, expectedNodeIfExit1,
                    expectedNodeIfExit2, expectedAssignmentNodeBody4];
                expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
            });
        });
    });

    describe('Complicated Node System', () => {
        it('If inside While', () => {

        });

        it('While inside If', () => {

        });
    });

    describe('Examples', () => {
        it('Example 1', () => {

        });

        it('Example 2', () => {

        });
    });
});
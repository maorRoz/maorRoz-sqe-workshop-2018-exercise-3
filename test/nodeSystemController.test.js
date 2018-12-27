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

            it('Both Whiles has bodies', () => {
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
            const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = [1]; m[0] = 2; while(m[0] === 2){ m[0] = 4; if(m[0] === 4){ m[0] = 5;}} m[0] = 8; }');  
            const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = [1]', 'm[0] = 2'], 2, [{ name: 'm', value: '[2]'}]);
            const expectedNodeWhileNull1 = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'm', value: '[2]'}]);
            const expectedNodeIfTest1 = createExpectedNodeTest(3, ['m[0]===2'], '([2])[0]===2', 4, 8, [{ name: 'm', value: '[2]'}]);
            const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['m[0] = 4'], 5, [{ name: 'm', value: '[4]'}]);
            const expectedNodeIfTest2 = createExpectedNodeTest(5, ['m[0]===4'], '([4])[0]===4', 6, 7, [{ name: 'm', value: '[4]'}]);
            const expectedAssignmentNodeBody3 = createExpectedNodeBody(6, ['m[0] = 5'], 7, [{ name: 'm', value: '[5]'}]);
            const expectedNodeIfExit1 = createExpectedNodeBody(7, [''], 2, [{ name: 'm', value: '[4]'}], 'circle');
            const expectedNodeIfExit2 = createExpectedNodeBody(8, [''], 9, [{ name: 'm', value: '[2]'}], 'circle');
            const expectedAssignmentNodeBody4 = createExpectedNodeBody(9, ['m[0] = 8'], 10, [{ name: 'm', value: '[8]'}]);
            const expectedNodeSystem = [ expectedAssignmentNodeBody1,expectedNodeWhileNull1,
                expectedNodeIfTest1, expectedAssignmentNodeBody2,
                expectedNodeIfTest2,expectedAssignmentNodeBody3, expectedNodeIfExit1,
                expectedNodeIfExit2, expectedAssignmentNodeBody4];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });

        it('While inside If', () => {
            const actualNodeSystem = makeTestableNodeSystem('function test(){ let m = [1]; m[0] = 2; if(m[0] === 2){ m[0] = 4; while(m[0] === 4){ m[0] = 5;}} m[0] = 8; }');  
            const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = [1]', 'm[0] = 2'], 2, [{ name: 'm', value: '[2]'}]);
            const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m[0]===2'], '([2])[0]===2', 3, 8, [{ name: 'm', value: '[2]'}]);
            const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m[0] = 4'], 4, [{ name: 'm', value: '[4]'}]);
            const expectedNodeWhileNull1 = createExpectedNodeBody(4, ['NULL'], 5, [{ name: 'm', value: '[4]'}]);
            const expectedNodeIfTest2 = createExpectedNodeTest(5, ['m[0]===4'], '([4])[0]===4', 6, 7, [{ name: 'm', value: '[4]'}]);
            const expectedAssignmentNodeBody3 = createExpectedNodeBody(6, ['m[0] = 5'], 4, [{ name: 'm', value: '[5]'}]);
            const expectedNodeIfExit1 = createExpectedNodeBody(7, [''], 8, [{ name: 'm', value: '[4]'}], 'circle');
            const expectedNodeIfExit2 = createExpectedNodeBody(8, [''], 9, [{ name: 'm', value: '[2]'}], 'circle');
            const expectedAssignmentNodeBody4 = createExpectedNodeBody(9, ['m[0] = 8'], 10, [{ name: 'm', value: '[8]'}]);
            const expectedNodeSystem = [ expectedAssignmentNodeBody1,
                expectedNodeIfTest1, expectedAssignmentNodeBody2, expectedNodeWhileNull1,
                expectedNodeIfTest2,expectedAssignmentNodeBody3, expectedNodeIfExit1,
                expectedNodeIfExit2, expectedAssignmentNodeBody4];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });
    });

    describe('Examples', () => {
        it('Example 1', () => {
            const actualNodeSystem = makeTestableNodeSystem('function foo(x,y,z){ let a = x + 1; let b = a + y; let c = 0; if(b < z){ c = c + 5; } else if(b < z * 2){ c = c + x + 5;} else{ c = c + z + 5;} return c;}');
            const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['a = x+1', 'b = a+y', 'c = 0'], 2, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            const expectedNodeWhileTest1 = createExpectedNodeTest(2, ['b<z'], '((x+1)+y)<z', 3, 4, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['c = c+5'], 8, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '(0)+5'}]);
            const expectedNodeWhileTest2 = createExpectedNodeTest(4, ['b<(z*2)'], '((x+1)+y)<(z*2)', 5, 6, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['c = (c+x)+5'], 7, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '((0)+x)+5'}]);
            const expectedAssignmentNodeBody4 = createExpectedNodeBody(6, ['c = (c+z)+5'], 7, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '((0)+z)+5'}]);
            const expectedNodeIfExit1 = createExpectedNodeBody(7, [''], 8, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}], 'circle');
            const expectedNodeIfExit2 = createExpectedNodeBody(8, [''], 9, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}], 'circle');
            const expectedAssignmentNodeBody5 = createExpectedNodeBody(9, ['return c'], 10, []);
            const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeWhileTest1, 
                expectedAssignmentNodeBody2,expectedNodeWhileTest2, expectedAssignmentNodeBody3, expectedAssignmentNodeBody4,
                expectedNodeIfExit1, expectedNodeIfExit2, expectedAssignmentNodeBody5];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });

        it('Example 2', () => {
            const actualNodeSystem = makeTestableNodeSystem('function foo(x,y,z){ let a = x + 1; let b = a + y; let c = 0; while(a < z){ c = a + b; z = c * 2; a++;} return z;}');
            const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['a = x+1', 'b = a+y', 'c = 0'], 2, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            const expectedNodeWhileNull = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            const expectedNodeWhileTest = createExpectedNodeTest(3, ['a<z'], '(x+1)<z', 4, 5, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['c = a+b', 'z = c*2', 'a++'], 2, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '(x+1)+((x+1)+y)'}, {name:'z', value:'((x+1)+((x+1)+y))*2'}, {name: 'a++', value: ''}]);
            const expectedNodeWhileExit = createExpectedNodeBody(5, [''], 6, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}], 'circle');
            const expectedAssignmentNodeBody3 = createExpectedNodeBody(6, ['return z'], 7, []);
            const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeWhileNull, 
                expectedNodeWhileTest,expectedAssignmentNodeBody2, expectedNodeWhileExit, expectedAssignmentNodeBody3];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });
    });
});
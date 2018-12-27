/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { makeTestableEvaluatedNodeSystem, createExpectedNodeBody, createExpectedNodeTest } from '../src/js/util-test';

describe('nodeSystemController Tests', () => {
    it('color assignment with return', () => {
        const actualNodeSystem = makeTestableEvaluatedNodeSystem('function test(x){ let m = 1; return x;}', {names: ['x'], values: [1]});
        const expectedAssignmentNodeBody = createExpectedNodeBody(1, ['m = 1'], 2, [{ name: 'm', value: '1'}]);
        expectedAssignmentNodeBody.hasColor = true;
        const expectedReturnNodeBody = createExpectedNodeBody(2, ['return x'], 3 );
        expectedReturnNodeBody.hasColor = true;
        const expectedNodeSystem = [ expectedAssignmentNodeBody, expectedReturnNodeBody];
        expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
    });
    
    it('color while true', () => {
        const actualNodeSystem = makeTestableEvaluatedNodeSystem('function test(x){ let m = 2; while(m === x) { m = 3; } return x;}', {names: ['x'], values: [2]});
        const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 2'], 2, [{ name: 'm', value: '2'}]);
        expectedAssignmentNodeBody1.hasColor = true;
        const expectedNodeWhileNull = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'm', value: '2'}]);
        expectedNodeWhileNull.hasColor = true;
        const expectedNodeWhileTest = createExpectedNodeTest(3, ['m===x'], '(2)===x', 4, 5, [{ name: 'm', value: '2'}]);
        expectedNodeWhileTest.hasColor = true;
        const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['m = 3'], 2, [{ name: 'm', value: '3'}]);
        expectedAssignmentNodeBody2.hasColor = true;
        const expectedNodeWhileExit = createExpectedNodeBody(5, [''], 6, [{ name: 'm', value: '2'}], 'circle');
        const expectedReturnNodeBody = createExpectedNodeBody(6, ['return x'], 7 );
        const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeWhileNull,
            expectedNodeWhileTest, expectedAssignmentNodeBody2, expectedNodeWhileExit,
            expectedReturnNodeBody ];
        expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
    });

    it('color while false', () => {
        const actualNodeSystem = makeTestableEvaluatedNodeSystem('function test(x){ let m = 2; while(m === x) { m = 3; } return x;}', {names: ['x'], values: [3]});
        const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 2'], 2, [{ name: 'm', value: '2'}]);
        expectedAssignmentNodeBody1.hasColor = true;
        const expectedNodeWhileNull = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'm', value: '2'}]);
        expectedNodeWhileNull.hasColor = true;
        const expectedNodeWhileTest = createExpectedNodeTest(3, ['m===x'], '(2)===x', 4, 5, [{ name: 'm', value: '2'}]);
        expectedNodeWhileTest.hasColor = true;
        const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['m = 3'], 2, [{ name: 'm', value: '3'}]);
        const expectedNodeWhileExit = createExpectedNodeBody(5, [''], 6, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeWhileExit.hasColor = true;
        const expectedReturnNodeBody = createExpectedNodeBody(6, ['return x'], 7 );
        expectedReturnNodeBody.hasColor = true;
        const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeWhileNull,
            expectedNodeWhileTest, expectedAssignmentNodeBody2, expectedNodeWhileExit,
            expectedReturnNodeBody ];
        expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
    });

    it('color if true', () => {
        const actualNodeSystem = makeTestableEvaluatedNodeSystem('function test(x){ let m = 2; if(m === x) { m = 3; } return x;}', {names: ['x'], values: [2]});
        const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 2'], 2, [{ name: 'm', value: '2'}]);
        expectedAssignmentNodeBody1.hasColor = true;
        const expectedNodeIfTest = createExpectedNodeTest(2, ['m===x'], '(2)===x', 3, 4, [{ name: 'm', value: '2'}]);
        expectedNodeIfTest.hasColor = true;
        const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 3'], 4, [{ name: 'm', value: '3'}]);
        expectedAssignmentNodeBody2.hasColor = true;
        const expectedNodeIfExit = createExpectedNodeBody(4, [''], 5, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeIfExit.hasColor = true;
        const expectedReturnNodeBody = createExpectedNodeBody(5, ['return x'], 6);
        expectedReturnNodeBody.hasColor = true;
        const expectedNodeSystem = [ expectedAssignmentNodeBody1,
            expectedNodeIfTest, expectedAssignmentNodeBody2, expectedNodeIfExit,
            expectedReturnNodeBody ];
        expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
    });

    it('color if false', () => {
        const actualNodeSystem = makeTestableEvaluatedNodeSystem('function test(x){ let m = 2; if(m === x) { m = 3; } return x;}', {names: ['x'], values: [3]});
        const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 2'], 2, [{ name: 'm', value: '2'}]);
        expectedAssignmentNodeBody1.hasColor = true;
        const expectedNodeIfTest = createExpectedNodeTest(2, ['m===x'], '(2)===x', 3, 4, [{ name: 'm', value: '2'}]);
        expectedNodeIfTest.hasColor = true;
        const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 3'], 4, [{ name: 'm', value: '3'}]);
        const expectedNodeIfExit = createExpectedNodeBody(4, [''], 5, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeIfExit.hasColor = true;
        const expectedReturnNodeBody = createExpectedNodeBody(5, ['return x'], 6);
        expectedReturnNodeBody.hasColor = true;
        const expectedNodeSystem = [ expectedAssignmentNodeBody1,
            expectedNodeIfTest, expectedAssignmentNodeBody2, expectedNodeIfExit,
            expectedReturnNodeBody ];
        expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
    });

    it('color if false, else if true', () => {
        const actualNodeSystem = makeTestableEvaluatedNodeSystem('function test(x){ let m = 2; if(m === x) { m = 3; } else if(m > x){ m = 4;} return x;}', {names: ['x'], values: [1]});
        const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 2'], 2, [{ name: 'm', value: '2'}]);
        expectedAssignmentNodeBody1.hasColor = true;
        const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===x'], '(2)===x', 3, 4, [{ name: 'm', value: '2'}]);
        expectedNodeIfTest1.hasColor = true;
        const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 3'], 7, [{ name: 'm', value: '3'}]);
        const expectedNodeIfTest2 = createExpectedNodeTest(4, ['m>x'], '(2)>x', 5, 6, [{ name: 'm', value: '2'}]);
        expectedNodeIfTest2.hasColor = true;
        const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['m = 4'], 6, [{ name: 'm', value: '4'}]);
        expectedAssignmentNodeBody3.hasColor = true;
        const expectedNodeIfExit1 = createExpectedNodeBody(6, [''], 7, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeIfExit1.hasColor = true;
        const expectedNodeIfExit2 = createExpectedNodeBody(7, [''], 8, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeIfExit2.hasColor = true;
        const expectedReturnNodeBody = createExpectedNodeBody(8, ['return x'], 9);
        expectedReturnNodeBody.hasColor = true;
        const expectedNodeSystem = [ expectedAssignmentNodeBody1,
            expectedNodeIfTest1, expectedAssignmentNodeBody2, expectedNodeIfTest2,
            expectedAssignmentNodeBody3,expectedNodeIfExit1, expectedNodeIfExit2, 
            expectedReturnNodeBody ];
        expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
    });

    it('color if false, else if false', () => {
        const actualNodeSystem = makeTestableEvaluatedNodeSystem('function test(x){ let m = 2; if(m === x) { m = 3; } else if(m > x){ m = 4;} return x;}', {names: ['x'], values: [3]});
        const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 2'], 2, [{ name: 'm', value: '2'}]);
        expectedAssignmentNodeBody1.hasColor = true;
        const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===x'], '(2)===x', 3, 4, [{ name: 'm', value: '2'}]);
        expectedNodeIfTest1.hasColor = true;
        const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 3'], 7, [{ name: 'm', value: '3'}]);
        const expectedNodeIfTest2 = createExpectedNodeTest(4, ['m>x'], '(2)>x', 5, 6, [{ name: 'm', value: '2'}]);
        expectedNodeIfTest2.hasColor = true;
        const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['m = 4'], 6, [{ name: 'm', value: '4'}]);
        const expectedNodeIfExit1 = createExpectedNodeBody(6, [''], 7, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeIfExit1.hasColor = true;
        const expectedNodeIfExit2 = createExpectedNodeBody(7, [''], 8, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeIfExit2.hasColor = true;
        const expectedReturnNodeBody = createExpectedNodeBody(8, ['return x'], 9);
        expectedReturnNodeBody.hasColor = true;
        const expectedNodeSystem = [ expectedAssignmentNodeBody1,
            expectedNodeIfTest1, expectedAssignmentNodeBody2, expectedNodeIfTest2,
            expectedAssignmentNodeBody3,expectedNodeIfExit1, expectedNodeIfExit2, 
            expectedReturnNodeBody ];
        expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
    });

    it('color if false, else if false, else true', () => {
        const actualNodeSystem = makeTestableEvaluatedNodeSystem('function test(x){ let m = 2; if(m === x) { m = 3; } else if(m > x){ m = 4;} else { m = 5;} return x;}', {names: ['x'], values: [3]});
        const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['m = 2'], 2, [{ name: 'm', value: '2'}]);
        expectedAssignmentNodeBody1.hasColor = true;
        const expectedNodeIfTest1 = createExpectedNodeTest(2, ['m===x'], '(2)===x', 3, 4, [{ name: 'm', value: '2'}]);
        expectedNodeIfTest1.hasColor = true;
        const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['m = 3'], 8, [{ name: 'm', value: '3'}]);
        const expectedNodeIfTest2 = createExpectedNodeTest(4, ['m>x'], '(2)>x', 5, 6, [{ name: 'm', value: '2'}]);
        expectedNodeIfTest2.hasColor = true;
        const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['m = 4'], 7, [{ name: 'm', value: '4'}]);
        const expectedAssignmentNodeBody4 = createExpectedNodeBody(6, ['m = 5'], 7, [{ name: 'm', value: '5'}]);
        expectedAssignmentNodeBody4.hasColor = true;
        const expectedNodeIfExit1 = createExpectedNodeBody(7, [''], 8, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeIfExit1.hasColor = true;
        const expectedNodeIfExit2 = createExpectedNodeBody(8, [''], 9, [{ name: 'm', value: '2'}], 'circle');
        expectedNodeIfExit2.hasColor = true;
        const expectedReturnNodeBody = createExpectedNodeBody(9, ['return x'], 10);
        expectedReturnNodeBody.hasColor = true;
        const expectedNodeSystem = [ expectedAssignmentNodeBody1,
            expectedNodeIfTest1, expectedAssignmentNodeBody2, expectedNodeIfTest2,
            expectedAssignmentNodeBody3,expectedAssignmentNodeBody4, 
            expectedNodeIfExit1, expectedNodeIfExit2, 
            expectedReturnNodeBody ];
        expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
    });

    describe('Examples', () => {
        it('Example 1', () => {
            const actualNodeSystem = makeTestableEvaluatedNodeSystem('function foo(x,y,z){ let a = x + 1; let b = a + y; let c = 0; if(b < z){ c = c + 5; } else if(b < z * 2){ c = c + x + 5;} else{ c = c + z + 5;} return c;}', {names: ['x', 'y', 'z'], values: [1,2,3]});
            const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['a = x+1', 'b = a+y', 'c = 0'], 2, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            expectedAssignmentNodeBody1.hasColor = true;
            const expectedNodeWhileTest1 = createExpectedNodeTest(2, ['b<z'], '((x+1)+y)<z', 3, 4, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            expectedNodeWhileTest1.hasColor = true;
            const expectedAssignmentNodeBody2 = createExpectedNodeBody(3, ['c = c+5'], 8, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '(0)+5'}]);
            const expectedNodeWhileTest2 = createExpectedNodeTest(4, ['b<(z*2)'], '((x+1)+y)<(z*2)', 5, 6, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            expectedNodeWhileTest2.hasColor = true;
            const expectedAssignmentNodeBody3 = createExpectedNodeBody(5, ['c = (c+x)+5'], 7, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '((0)+x)+5'}]);
            expectedAssignmentNodeBody3.hasColor = true;
            const expectedAssignmentNodeBody4 = createExpectedNodeBody(6, ['c = (c+z)+5'], 7, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '((0)+z)+5'}]);
            const expectedNodeIfExit1 = createExpectedNodeBody(7, [''], 8, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}], 'circle');
            expectedNodeIfExit1.hasColor = true;
            const expectedNodeIfExit2 = createExpectedNodeBody(8, [''], 9, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}], 'circle');
            expectedNodeIfExit2.hasColor = true;
            const expectedAssignmentNodeBody5 = createExpectedNodeBody(9, ['return c'], 10, []);
            expectedAssignmentNodeBody5.hasColor = true;
            const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeWhileTest1, 
                expectedAssignmentNodeBody2,expectedNodeWhileTest2, expectedAssignmentNodeBody3, expectedAssignmentNodeBody4,
                expectedNodeIfExit1, expectedNodeIfExit2, expectedAssignmentNodeBody5];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });

        it('Example 2', () => {
            const actualNodeSystem = makeTestableEvaluatedNodeSystem('function foo(x,y,z){ let a = x + 1; let b = a + y; let c = 0; while(a < z){ c = a + b; z = c * 2; a++;} return z;}', {names: ['x', 'y', 'z'], values: [1,2,3]});
            const expectedAssignmentNodeBody1 = createExpectedNodeBody(1, ['a = x+1', 'b = a+y', 'c = 0'], 2, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            expectedAssignmentNodeBody1.hasColor = true;
            const expectedNodeWhileNull = createExpectedNodeBody(2, ['NULL'], 3, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            expectedNodeWhileNull.hasColor = true;
            const expectedNodeWhileTest = createExpectedNodeTest(3, ['a<z'], '(x+1)<z', 4, 5, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}]);
            expectedNodeWhileTest.hasColor = true;
            const expectedAssignmentNodeBody2 = createExpectedNodeBody(4, ['c = a+b', 'z = c*2', 'a++'], 2, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '(x+1)+((x+1)+y)'}, {name:'z', value:'((x+1)+((x+1)+y))*2'}, {name: 'a++', value: ''}]);
            expectedAssignmentNodeBody2.hasColor = true;
            const expectedNodeWhileExit = createExpectedNodeBody(5, [''], 6, [{ name: 'a', value: 'x+1'}, { name: 'b', value: '(x+1)+y'}, {name: 'c', value: '0'}], 'circle');
            const expectedAssignmentNodeBody3 = createExpectedNodeBody(6, ['return z'], 7, []);
            const expectedNodeSystem = [ expectedAssignmentNodeBody1, expectedNodeWhileNull, 
                expectedNodeWhileTest,expectedAssignmentNodeBody2, expectedNodeWhileExit, expectedAssignmentNodeBody3];
            expect(actualNodeSystem).to.deep.equal(expectedNodeSystem);
        });
    });
});
import { parseCode } from './code-analyzer';
import createMethodAndArguments from './controller/elementsTableController';
import getEvaluatedNodeSystem from './controller/evaluator';
import codeToNodeSystem from './controller/nodeSystemControler';
import NodeTest from './model/NodeTest';
import NodeBody from './model/NodeBody';



export const makeTestableFunction = (code) => {
    const parsedCode = parseCode(code);
    return createMethodAndArguments(parsedCode);
};

export const makeTestableEvaluatedNodeSystem = (code, parameters) => {
    const testableNodeSystem = makeTestableNodeSystem(code);
    return getEvaluatedNodeSystem(testableNodeSystem, parameters);
};

export const makeTestableNodeSystem = (code) => {
    const testableFunction = makeTestableFunction(code);
    return codeToNodeSystem(testableFunction);
};


export const createExpectedNodeTest = (index, body, evaluatedTest, trueNext, falseNext, env) => {
    return new NodeTest(index, body, evaluatedTest, trueNext, falseNext, env);
};


export const createExpectedNodeBody = (index, body, next, env, shape) => {
    return new NodeBody(index, body, next, env, shape);
};

const createExpectedObject = (objectProperties) =>
{
    const { lineType, lineName='', lineCondition='', lineValue='', lineBody=[], alternate, conditionColor } = objectProperties;
    return { lineType, lineName, lineCondition, lineValue, lineBody,alternate, conditionColor};
};

export const createExpectedFunction = (lineName, parameters=[], lineBody) => {
    const expectedFunction = createExpectedObject({ lineType: 'functionDeclaration', lineName, lineBody });
    expectedFunction.parameters = parameters;
    return expectedFunction;
};

export const createExpectedReturnStatement = (lineValue) => 
    createExpectedObject({ lineType: 'returnStatement', lineValue });

export const createExpectedIfStatement = (lineCondition, lineBody, alternate, conditionColor) => 
    createExpectedObject({ lineType: 'ifStatement', lineCondition, lineBody, alternate, conditionColor });

export const createExpectedElseIfStatement = (lineCondition, lineBody, alternate, conditionColor) => 
    createExpectedObject({ lineType: 'elseIfStatement', lineCondition, lineBody, alternate, conditionColor });

export const createExpectedElseStatement = (lineBody) =>  
    createExpectedObject({ lineType: 'elseStatement', lineBody });

export const createExpectedWhileStatement = (lineCondition, lineBody) => 
    createExpectedObject({ lineType: 'whileStatement', lineCondition, lineBody });

export const createExpectedAssignmentStatement = (lineName,lineValue) => 
    createExpectedObject({ lineType: 'assignmentExpression', lineName, lineValue });

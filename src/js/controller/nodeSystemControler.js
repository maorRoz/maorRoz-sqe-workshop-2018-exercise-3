import NodeBody from '../model/NodeBody';
import NodeTest from '../model/NodeTest';
const handleAlternate = (alternateIndex, statement, locals, nexts) => {
    return statement.lineType === 'elseIfStatement' ?
        handleIf(alternateIndex, statement, locals, nexts) :
        handleBody(alternateIndex, statement.lineBody, locals, nexts);
};

const updateIfBranchesExit = (exitBodyIndex, ifBodyNodes, alternateNodes) => {
    if(ifBodyNodes.length > 0){
        ifBodyNodes[ifBodyNodes.length - 1].next = exitBodyIndex;
    }

    if(alternateNodes.length > 0){
        alternateNodes[alternateNodes.length - 1].next = exitBodyIndex;
    }
};

const handleIf = (testIndex, statement, locals, restBody, nexts) => {
    let trueNextIndex = testIndex + 1;
    let falseNextIndex = testIndex + 1;
    let ifBodyNodes = [];
    let alternateNodes = [];
    if(statement.lineBody.length > 0){
        ifBodyNodes = handleBody(trueNextIndex, statement.lineBody, locals, [undefined]);
        falseNextIndex = testIndex + ifBodyNodes.length + 1;
    }
    if(statement.alternate){
        alternateNodes = handleAlternate(falseNextIndex, statement.alternate, locals, [undefined]);
        trueNextIndex = trueNextIndex === falseNextIndex ? testIndex + alternateNodes.length + 1 : trueNextIndex;
    }
    const nodeTest = new NodeTest(testIndex, [statement.lineCondition], subtituteExpression(statement.lineCondition, JSON.parse(JSON.stringify(locals))), trueNextIndex, falseNextIndex, JSON.parse(JSON.stringify(locals)));
    const exitIfIndex = testIndex + 1 + ifBodyNodes.length + alternateNodes.length;
    const ifExitNode = new NodeBody(exitIfIndex, [''], exitIfIndex + 1, locals, 'circle');
    updateIfBranchesExit(exitIfIndex, ifBodyNodes, alternateNodes);
    const ifNextNodes = handleBody(exitIfIndex + 1, restBody, locals, nexts);
    return [nodeTest, ...ifBodyNodes, ...alternateNodes, ifExitNode, ...ifNextNodes];
};

const handleWhile = (nullIndex, statement, locals, restBody, nexts) => {
    const testIndex = nullIndex + 1;
    const localsBeforeBody = JSON.parse(JSON.stringify(locals));
    const nodeNull = new NodeBody(nullIndex, ['NULL'], testIndex,  localsBeforeBody);
    let trueNextIndex = nullIndex;
    let whileBodyNodes = [];
    if(statement.lineBody.length > 0){
        trueNextIndex = testIndex + 1;
        whileBodyNodes = handleBody(testIndex + 1, statement.lineBody, locals, [undefined]);
        whileBodyNodes[whileBodyNodes.length - 1].next = nullIndex;
    }
    const exitWhileIndex = testIndex + whileBodyNodes.length + 1;
    const exitWhileNode = new NodeBody(exitWhileIndex, [''], exitWhileIndex + 1, localsBeforeBody, 'circle');
    const whileNextNodes = handleBody(exitWhileIndex + 1, restBody,  JSON.parse(JSON.stringify(locals)), nexts); 
    const nodeTest = new NodeTest(testIndex, [statement.lineCondition], subtituteExpression(statement.lineCondition, localsBeforeBody), trueNextIndex, exitWhileIndex, localsBeforeBody);
    return [nodeNull, nodeTest, ...whileBodyNodes, exitWhileNode, ...whileNextNodes];
};
const handleReturn = (nodeIndex, statement) => {
    const returnBody = statement.toString();
    const returnNode =  new NodeBody(nodeIndex, [returnBody], nodeIndex + 1);
    return [returnNode];
};

const typeCodeToParse = {
    ifStatement: handleIf,
    whileStatement: handleWhile,
    returnStatement: handleReturn
};

const subtituteExpression = (expression, locals) => {
    const variables = expression.split(/>|<|!==|===|==|]|[[()+-/*]/);
    variables.forEach(variable => {
        const existLocal = locals.find(local => local.name === variable);
        expression = existLocal ? expression
            .replace(new RegExp(variable, 'g'), `(${existLocal.value})`) : expression;
    });

    return expression;
};

const modifyLocalArray = (local, index, value) => {
    const arrayWithNoBrackets = local.value.replace(/\[|\]/g,'');
    const arrayValues = arrayWithNoBrackets.split(',');
    arrayValues[index] = value;
    local.value = `[${arrayValues.join()}]`;
    return local;
};

const newLocalCreation = (assignment, locals) => {
    const newValue = subtituteExpression(assignment.lineValue, locals);

    if(assignment.lineName.includes('[')){
        const nameWithoutArrayIndex = assignment.lineName.replace(/\[.*\]/g,'');
        const indexWithoutName = assignment.lineName.replace(/.*\[|\]/g, '');
        const evaluatedIndex = JSON.parse(subtituteExpression(indexWithoutName, locals));
        const local = locals.find(local => local.name === nameWithoutArrayIndex);
        const modifiedLocalArray = modifyLocalArray(local, evaluatedIndex, newValue);
        return modifiedLocalArray ;
    }
    return { name: assignment.lineName, value: newValue };
};

const handleAssignment = (assignment, locals) => {
    const extendedLocals = locals.filter(local => local.name !== assignment.lineName && local.name !== assignment.lineName.replace(/\[.*\]/g,''));

    const newLocal = newLocalCreation(assignment, locals);
    extendedLocals.push(newLocal);
    return extendedLocals;
};

const getNextNodes = (nodeIndex, body, index, locals, nexts) => {
    if(index === undefined){
        return handleBody(nodeIndex, nexts[0], locals);
    } 

    const nextNodeBody = body[index];
    const handler = typeCodeToParse[nextNodeBody.lineType];
    return handler(nodeIndex, nextNodeBody, locals, body.slice(index + 1), nexts);
};

const handleNodesBody = (nodeIndex, body, nextNodeBodyIndex, nodeBody, locals, nexts) => {
    let nextIndex = nodeIndex;
    let node = [];
    if(nodeBody.length > 0){
        nextIndex++;
        node = [new NodeBody(nodeIndex, nodeBody, nextIndex, locals)];
    } 
    const nextNodes = getNextNodes(nextIndex, body, nextNodeBodyIndex, JSON.parse(JSON.stringify(locals)), nexts);
    return [...node, ...nextNodes];
};

const handleBody = (nodeIndex, body, locals, nexts) => {
    if(!body || body.length === 0 || !body[0]){
        return [];
    }
    const nodeBody = [];
    let nextNodeBodyIndex;
    body.every((statement, index) => {
        if(statement.lineType === 'assignmentExpression'){
            const extendedLocals = handleAssignment(statement, locals);
            locals = extendedLocals;
            return nodeBody.push(statement.toString());
        } else {
            nextNodeBodyIndex = index;
            return false;
        }
    });
    return handleNodesBody(nodeIndex, body, nextNodeBodyIndex, nodeBody, locals, nexts);
};

const codeToNodeSystem = (method) => {
    const locals = [];
    const nodeSystem = handleBody(1, method.lineBody, locals, [undefined]);
    return nodeSystem;
};

export default codeToNodeSystem;
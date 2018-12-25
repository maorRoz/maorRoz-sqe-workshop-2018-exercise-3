import NodeBody from '../model/NodeBody';
import NodeTest from '../model/NodeTest';


const handleIf = () => null;
const handleWhile = () => null;
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
    if(assignment.lineName.includes('[')){
        const nameWithoutArrayIndex = assignment.lineName.replace(/\[.*\]/g,'');
        const indexWithoutName = assignment.lineName.replace(/.*\[|\]/g, '');
        const evaluatedIndex = JSON.parse(subtituteExpression(indexWithoutName, locals));
        const local = locals.find(local => local.name === nameWithoutArrayIndex);
        const modifiedLocalArray = modifyLocalArray(local, evaluatedIndex, assignment.lineValue);
        return modifiedLocalArray ;
    }
    return { name: assignment.lineName, value: assignment.lineValue };
};

const handleAssignment = (assignment, locals) => {
    const extendedLocals = locals.filter(local => local.name !== assignment.lineName && local.name !== assignment.lineName.replace(/\[.*\]/g,''));

    const newLocal = newLocalCreation(assignment, locals);
    extendedLocals.push(newLocal);
    return extendedLocals;
};

const getNextNodes = (nodeIndex, body, index, locals, next) => {
    if(!index){
        return handleBody(nodeIndex, next, locals);
    } 

    const nextNodeBody = body[index];
    const handler = typeCodeToParse[nextNodeBody.lineType];
    return handler(nodeIndex, nextNodeBody, locals, body.slice(index).concat(next));
};

const handleBody = (nodeIndex, body, locals, next) => {
    if(!body && !next){
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
    const node = new NodeBody(nodeIndex, nodeBody, nodeIndex + 1, locals);
    const nextNodes = getNextNodes(nodeIndex + 1, body, nextNodeBodyIndex, locals, next);
    return [node, ...nextNodes];
};

const codeToNodeSystem = (method) => {
    const locals = [];
    const nodeSystem = handleBody(1, method.lineBody, locals);
    return nodeSystem;
};

export default codeToNodeSystem;
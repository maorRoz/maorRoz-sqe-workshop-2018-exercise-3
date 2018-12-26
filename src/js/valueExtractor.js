
const binaryExpressionExtractValue = (expression, parenthesis) => {
    const { left, operator ,right } = expression;
    const binaryValue = extractValue(left, true)  + operator + extractValue(right, true);
    return parenthesis ? `(${binaryValue})` : binaryValue;
};

const memberExpressionExtractValue = (expression) => {
    const { object, property, computed } = expression;
    const propertyValue = extractValue(property);
    const propertyValueWrap = computed? `[${propertyValue}]` : `.${propertyValue}`;
    return extractValue(object) + propertyValueWrap;
};

const unaryExpressionExtractValue = (expression, parenthesis) => {
    const { argument, operator } = expression;
    const unaryValue =  operator + extractValue(argument, true);
    return parenthesis ? `(${unaryValue})` : unaryValue;
};

const updateExpressionExtractValue = (expression, parenthesis) => {
    const { argument, operator } = expression;
    const updateValue =  extractValue(argument, true) + operator;
    return parenthesis ? `(${updateValue})` : updateValue;
};

const assignmentExpressionExtractValue = (expression, parenthesis) => {
    const {left, right, operator} = expression;
    const assignmentValue = extractValue(left) + operator + extractValue(right);
    return parenthesis ? `(${assignmentValue})` : assignmentValue;
};

const arrayExpressionExtractValue = (expression) => {
    const { elements } = expression;
    return `[${elements.map(element => extractValue(element)).join()}]`;
};

const valueTypesMethods = {
    UnaryExpression: unaryExpressionExtractValue,
    BinaryExpression: binaryExpressionExtractValue,
    MemberExpression: memberExpressionExtractValue,
    UpdateExpression: updateExpressionExtractValue,
    AssignmentExpression: assignmentExpressionExtractValue,
    ArrayExpression: arrayExpressionExtractValue,
    Identifier: (expression) => expression.name,
    Literal: (expression) => expression.raw
};

export const extractValue = (expression, parenthesis = false) => {
    const { type } = expression || {};
    let methodType = valueTypesMethods[type];
    return methodType ? methodType.call(null,expression,parenthesis) : '';
};
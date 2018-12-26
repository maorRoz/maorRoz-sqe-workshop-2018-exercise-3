let currentNodeSystem;

const toEvalNode = (valueMapper, currentNode) => {
    if(!currentNode || currentNode.hasColor){
        return;
    }

    const nextNode = currentNode.toColor(valueMapper);
    toEvalNode(valueMapper, currentNodeSystem[nextNode - 1]);
};

const getEvaluatedNodeSystem = (methodParameters, nodeSystem, argumentsValues) => {
    currentNodeSystem = nodeSystem;
    const valueMapper = methodParameters
        .map((parameter, index) => ({name: parameter, value: argumentsValues[index]}));
    toEvalNode(valueMapper, currentNodeSystem[0]);
    return currentNodeSystem;
};

export default getEvaluatedNodeSystem;
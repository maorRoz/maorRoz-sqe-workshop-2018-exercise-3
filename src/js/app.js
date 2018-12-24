import $ from 'jquery';
import {parseCode} from './code-analyzer';
import createMethodAndArguments from './controller/elementsTableController';
import codeToNodeSystem from './controller/nodeSystemControler';
import toEvalNodeSystem from './controller/evaluator';
import  buildGraph from './view/view';

const argumentsTextIntoValues = () => {
    const argumentsText = $('#argumentsLine').val().split(/(?![^)(]*\([^)(]*?\)\)),(?![^[]*\])/);
    return argumentsText.map(argument => {
        if(argument.length > 0){
            switch(argument[0]){
            case '"':
            case '\'': return argument;
            default: return JSON.parse(argument);
            }
        }
        return '';
    });
};

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        const codeToParse = $('#codePlaceholder').val();
        const parsedCode = parseCode(codeToParse);
        global.method = createMethodAndArguments(parsedCode);
        global.nodeSystem = codeToNodeSystem(global.method);
        const argumentsValues = argumentsTextIntoValues();
        global.evaluatedNodeSystem = toEvalNodeSystem(global.nodeSystem, argumentsValues);
        buildGraph(global.evaluatedNodeSystem);
    });
});
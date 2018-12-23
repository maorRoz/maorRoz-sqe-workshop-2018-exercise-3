import $ from 'jquery';
import esgraph from 'esgraph';
import {parseCode} from './code-analyzer';
import { createMethodAndArguments } from './controller/elementsTableController'; 
import  createOutputFunction from './view/view';

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
        const cfg = esgraph(parsedCode);
        const dot = esgraph.dot(cfg, { counter: 0, source: parsedCode });
        console.log(dot);
     //   const method = createMethodAndArguments(parsedCode);
     //   const argumentsValues = argumentsTextIntoValues();
     //   $('#parsedCode #codeLine' ).remove();
     //   createOutputFunction($('#parsedCode'));
    });
});
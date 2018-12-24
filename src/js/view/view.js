const buildGraph = (/*graphScript*/) => {
    const d3 = require('d3-graphviz');
    d3.graphviz('#graph').renderDot('digraph { node [style="filled"] 5 [fillcolor="#d62728"] a -> { "x+5;\nx+7;"  5 ""} [ label = "1"];{ "x+5;\nx+7;"  5 ""} -> c [ label = "2" ];}');
};

export default buildGraph;
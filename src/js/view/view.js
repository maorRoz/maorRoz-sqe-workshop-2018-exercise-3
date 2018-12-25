import NodeBody from '../model/NodeBody';

const getNodeEdges = (node, length) => {
    if(node instanceof NodeBody && node.next > length){
        return [];
    } 
    return [node.edges()];
    
};

const createGraphFromNodeSystem = (evaluatedNodeSystem) => {
    const nodes = [];
    let edges = [];
    evaluatedNodeSystem.forEach(node => {
        nodes.push(node.toString());
        const nodeEdges = getNodeEdges(node, evaluatedNodeSystem.length);
        edges = [...edges, ...nodeEdges];
    });

    return { nodes: nodes.join(' '), edges: edges.join(' ') };
};

const buildGraph = (evaluatedNodeSystem) => {
    const d3 = require('d3-graphviz');
    const { nodes, edges } = createGraphFromNodeSystem(evaluatedNodeSystem); 
    d3.graphviz('#graph').renderDot(`digraph { node [style="filled"] ${nodes} ${edges} }`);
};

export default buildGraph;
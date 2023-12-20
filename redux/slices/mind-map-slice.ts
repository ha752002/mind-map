import {
    Node,
    Edge,
    NodeChange,
    applyNodeChanges,
    applyEdgeChanges, addEdge, EdgeChange
} from "reactflow";
import {v4 as v4UUID} from "uuid";
import {createSlice, current} from "@reduxjs/toolkit";
import {NodeData} from "@/components/mind-map-node";

export type ReactFlowData = {
    nodes: Node[];
    edges: Edge[];
};

export type MindMapState = {
    id: string,
    mindMapData: ReactFlowData
}

const initialMindMapState: MindMapState = {
    id: "",
    mindMapData: {
        nodes: [
            {
                id: v4UUID(),
                data: {label: 'Hello'},
                position: {x: 0, y: 0},
                positionAbsolute: {x: 0, y: 0},
                type: 'mindMap',
                deletable: false
            }
        ],
        edges: []
    }
}
const mindMapSlice = createSlice({
    name: "mindMap",
    initialState: initialMindMapState,
    reducers: {
        nodesChange: (state: MindMapState, action) => {
            // console.log(action.payload)
            state.mindMapData.nodes = applyNodeChanges(action.payload, state.mindMapData.nodes)
            // state.mindMapData.nodes = nodes
        },
        nodeDeleteChange: (state: MindMapState, action) => {
            // console.log(action.payload)
            const nodeToDelete: NodeChange = {
                id: action.payload,
                type: "remove"
            }
            state.mindMapData.nodes = applyNodeChanges([nodeToDelete], state.mindMapData.nodes)
            // state.mindMapData.nodes = nodes
        },
        edgeDeleteChange: (state: MindMapState, action) => {
            console.log(action.payload)
            const edgeToDelete: EdgeChange = {
                id: action.payload,
                type: "remove"
            }
            const indexDelete = state.mindMapData.edges.indexOf(action.payload)
            state.mindMapData.edges.splice(indexDelete, 1)
            // state.mindMapData.nodes = nodes
        },
        edgesChange: (state: MindMapState, action) => {
            console.log(action.payload)
            state.mindMapData.edges = applyEdgeChanges(action.payload, state.mindMapData.edges)
        },
        connect: (state: MindMapState, action) => {
            console.log(action)
            state.mindMapData.edges = addEdge(action.payload, state.mindMapData.edges)
        },
        addChildNode: (state: MindMapState, action) => {
            console.log(action.payload)
            const parentNode = action.payload.parentNode;
            const childNodePosition = action.payload.childNodePosition;
            const newNode: Node = {
                id: v4UUID(),
                type: 'mindMap',
                data: {label: 'New Node'},
                // deletable: true,
                ...childNodePosition
            }
            console.log(newNode)
            const newEdge: Edge = {
                id: v4UUID(),
                source: parentNode.id,
                target: newNode.id,
                // deletable: true,
                updatable: true,
            };

            state.mindMapData.nodes = [...state.mindMapData.nodes, newNode]

            state.mindMapData.edges = [...state.mindMapData.edges, newEdge]
        }
    },
    extraReducers: builder => {

    }
})
export default mindMapSlice;
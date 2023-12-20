"use client"
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    addEdge,
    OnConnectStart, OnConnectEnd, useReactFlow, NodeOrigin, Panel, BackgroundVariant, MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "@/redux/store";
import mindMapSlice, {MindMapState} from "@/redux/slices/mind-map-slice";
import MindMapNode from "@/components/mind-map-node";
import MindMapEdge from "@/components/mind-map-edge";

const {
    nodesChange,
    edgesChange,
    connect,
    addChildNode,
    edgeDeleteChange
} = mindMapSlice.actions

const nodeTypes = {
    mindMap: MindMapNode,
};
const edgeType = {
    mindMap: MindMapEdge,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
export default function Flow() {
    const {id, mindMapData: {nodes, edges}}: MindMapState = useSelector((state: RootState) => state.mindMap)
    const dispatch = useDispatch();
    const connectingNodeId = useRef<string | null>(null);
    const {screenToFlowPosition, flowToScreenPosition} = useReactFlow()
    const getChildNodePosition = (event: MouseEvent, parentNode?: Node) => {
        if (
            !nodes ||
            // we need to check if these properites exist, because when a node is not initialized yet,
            // it doesn't have a positionAbsolute nor a width or height
            !parentNode?.positionAbsolute ||
            !parentNode?.width ||
            !parentNode?.height
        ) {
            return;
        }
        const panePosition = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });
        console.log(panePosition)
        const position = {
            x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
            y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
        }
        const positionAbsolute = panePosition
        // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
        return {
            position: panePosition,
            positionAbsolute
        };
    };
    const onNodesChange = useCallback(
        (changes: any) => {
            dispatch(nodesChange(changes))
        },
        [dispatch],
    );
    // const onNodesChangePosition = useCallback(
    //     (changes: any, node: any) => {
    //         console.log(changes, node)
    //         dispatch(nodesChangePosition(changes))
    //     },
    //     [dispatch],
    // );
    const onEdgesChange = useCallback(
        (changes: any) => {
            dispatch(edgesChange(changes))
        },
        [dispatch],
    );
    const onEdgesDelete = useCallback(
        (edge: Edge) => {
            dispatch(edgeDeleteChange(edge))
        },
        [dispatch],
    );
    const onConnect = useCallback(
        (params: any) => {
            dispatch(connect(params))
        },
        [dispatch],
    );

    const onConnectStart: OnConnectStart = useCallback((_, {nodeId}) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd: OnConnectEnd = useCallback((event) => {
        // we only want to create a new node if the connection ends on the pane
        const targetIsPane = (event.target as Element).classList.contains(
            'react-flow__pane',
        );
        if (targetIsPane && connectingNodeId.current) {
            const parentNode = nodes.find(node => node.id === connectingNodeId.current);
            const childNodePosition = getChildNodePosition(event as MouseEvent, parentNode);
            if (parentNode && childNodePosition) {
                dispatch(addChildNode({parentNode, childNodePosition}))
            }
        }
    }, [dispatch, getChildNodePosition, nodes]);
    return (
        <div style={{height: '100%'}}>
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                nodeOrigin={nodeOrigin}
                onNodesChange={onNodesChange}
                // onNodeDrag={onNodesChangePosition}
                edgeTypes={edgeType}
                edges={edges}
                onEdgeDoubleClick={(event, edge) => {
                    onEdgesDelete(edge)
                }}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                fitView
                elevateNodesOnSelect
            >
                <Background variant={BackgroundVariant.Cross}/>
                <Controls/>
                <Panel position={"top-center"}>React Flow Mind Map</Panel>
                <MiniMap nodeStrokeWidth={3}/>
            </ReactFlow>
        </div>
    );
}

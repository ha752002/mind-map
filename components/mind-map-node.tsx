import {Handle, NodeProps, Position} from 'reactflow';
import {Button} from "@nextui-org/button";
import {DeleteIcon} from "@nextui-org/shared-icons";
import {useDispatch} from "react-redux";
import mindMapSlice from "@/redux/slices/mind-map-slice";

export type NodeData = {
    label: string;
};
const {nodeDeleteChange} = mindMapSlice.actions
function MindMapNode({id, data}: NodeProps<NodeData>) {
    const dispatch = useDispatch();
    const deleteNode = () => {
        dispatch(nodeDeleteChange(id))
    }
    return (
        <>
            <input defaultValue={data.label}/>
            <Handle id={id} type="target" position={Position.Top}/>
            <Handle id={id} type="source" position={Position.Bottom}/>
            <Button onClick={deleteNode} size={"sm"}><DeleteIcon fontSize={10} width={10} height={10}></DeleteIcon></Button>
        </>
    );
}

export default MindMapNode;
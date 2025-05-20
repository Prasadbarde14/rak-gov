import { Box, Boxes, Timer } from 'lucide-react';
import React from 'react'
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
const nodes = [
    {
        id: 'start',
        type: 'input',
        data: {
            label: 
            <div className='flex justify-between items-center  '>
                <p>Start Timer</p>
                <Timer />
            </div>
        },
        position: { x: 0, y: 100 },
    },
    {
        id: 'task1',
        data: { label: 
            <div className='flex justify-between items-center  '>
                    <p>Get sprint list</p>
                    <Box />
                </div> 
            },
        position: { x: 200, y: 100 },
    },
    {
        id: 'gateway1',
        type: 'default',
        data: { label: 'Is Request Valid?' },
        position: { x: 400, y: 100 },
    },
    {
        id: 'task2',
        data: { label: 'Approve Request' },
        position: { x: 600, y: 50 },
    },
    {
        id: 'task3',
        data: { label: 'Reject Request' },
        position: { x: 600, y: 150 },
    },
    {
        id: 'gateway2',
        type: 'default',
        data: { label: 'More Review Needed?' },
        position: { x: 800, y: 100 },
    },
    {
        id: 'task4',
        data: { label: 'Final Approval' },
        position: { x: 1000, y: 100 },
    },
    {
        id: 'end',
        type: 'output',
        data: { label: 'End Event' },
        position: { x: 1200, y: 100 },
    },
];

const edges = [
    { id: 'e1-2', source: 'start', target: 'task1' },
    { id: 'e2-3', source: 'task1', target: 'gateway1' },
    { id: 'e3-4', source: 'gateway1', target: 'task2', label: 'Yes' },
    { id: 'e3-5', source: 'gateway1', target: 'task3', label: 'No' },
    { id: 'e4-6', source: 'task2', target: 'gateway2' },
    { id: 'e6-7', source: 'gateway2', target: 'task4', label: 'Yes' },
    { id: 'e6-8', source: 'gateway2', target: 'end', label: 'No' },
    { id: 'e5-8', source: 'task3', target: 'end' },
    { id: 'e7-8', source: 'task4', target: 'end' },
];

function ReactFlowComponent() {
    return (
        <div>
            <div style={{ width: '100%', height: '300px' }}>
                <ReactFlow nodes={nodes} edges={edges} fitView>
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    )
}

export default ReactFlowComponent
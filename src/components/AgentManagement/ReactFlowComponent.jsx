import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { Timer, Box, Database, UploadCloud, FileBarChart, Table2, FileText, CheckCircle } from "lucide-react";

const nodes = [
  {
    id: "start",
    type: "input",
    data: {
      label: (
        <div className="flex justify-between items-center">
          <p>Start Timer</p>
          <Timer />
        </div>
      ),
    },
    position: { x: 0, y: 100 },
  },
  {
    id: "clientSource",
    data: {
      label: (
        <div className="flex justify-between items-center">
          <p>Ingest Client Data</p>
          <UploadCloud />
        </div>
      ),
    },
    position: { x: 200, y: 100 },
  },
  {
    id: "validateIngestion",
    data: {
      label: (
        <div className="flex justify-between items-center">
          <p>Validate Data</p>
          <Database />
        </div>
      ),
    },
    position: { x: 400, y: 100 },
  },
  {
    id: "generateSchema",
    data: {
      label: (
        <div className="flex justify-between items-center">
          <p>Generate Schema</p>
          <FileText />
        </div>
      ),
    },
    position: { x: 600, y: 20 },
  },
  {
    id: "generateBQ",
    data: {
      label: (
        <div className="flex justify-between items-center">
          <p>Create BQ Table</p>
          <Table2 />
        </div>
      ),
    },
    position: { x: 600, y: 100 },
  },
  {
    id: "generateAdhoc",
    data: {
      label: (
        <div className="flex justify-between items-center">
          <p>Build Adhoc Report</p>
          <FileBarChart />
        </div>
      ),
    },
    position: { x: 600, y: 180 },
  },
  {
    id: "reviewArtifacts",
    data: {
      label: (
        <div className="flex justify-between items-center">
          <p>Review Artifacts</p>
          <Box />
        </div>
      ),
    },
    position: { x: 800, y: 100 },
  },
  {
    id: "finalApproval",
    data: {
      label: (
        <div className="flex justify-between items-center">
          <p>Final Approval</p>
          <CheckCircle />
        </div>
      ),
    },
    position: { x: 1000, y: 100 },
  },
  {
    id: "end",
    type: "output",
    data: {
      label: (
        <div className="text-green-700 font-semibold">
          End Event
        </div>
      ),
    },
    position: { x: 1200, y: 100 },
  },
];


const edges = [
    { id: 'e1', source: 'start', target: 'clientSource' },
    { id: 'e2', source: 'clientSource', target: 'validateIngestion' },
    { id: 'e3', source: 'validateIngestion', target: 'generateSchema' },
    { id: 'e4', source: 'validateIngestion', target: 'generateBQ' },
    { id: 'e5', source: 'validateIngestion', target: 'generateAdhoc' },
    { id: 'e6', source: 'generateSchema', target: 'reviewArtifacts' },
    { id: 'e7', source: 'generateBQ', target: 'reviewArtifacts' },
    { id: 'e8', source: 'generateAdhoc', target: 'reviewArtifacts' },
    { id: 'e9', source: 'reviewArtifacts', target: 'finalApproval' },
    { id: 'e10', source: 'finalApproval', target: 'end' },
  ];

function ReactFlowComponent() {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">BoB Agent</h2>
        <p className="text-slate-600 text-xs">Real time work-flow</p>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default ReactFlowComponent;

// components/OntologyGraph.jsx
import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { Parser } from 'n3';
import { v4 as uuidv4 } from 'uuid';
const ttlText = `
@prefix : <http://www.rak.gov.ae/psd#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://www.rak.gov.ae/psd> rdf:type owl:Ontology ;
    rdfs:label "RAK Public Services Department Ontology" .

:Works_Agency rdf:type owl:Class .
:Wastewater_Agency rdf:type owl:Class .
:Waste_Management_Agency rdf:type owl:Class .
:Landscape_Agency rdf:type owl:Class .
:Public_Health_Agency rdf:type owl:Class .
:Energy_Management_Agency rdf:type owl:Class .

:Road_Network rdf:type owl:Class ; rdfs:label "Road Network" .
:Maintenance_Schedule rdf:type owl:Class ; rdfs:label "Maintenance Schedule" .
:New_Construction rdf:type owl:Class ; rdfs:label "New Construction Project" .
:Smart_Infrastructure rdf:type owl:Class ; rdfs:label "Smart Infrastructure" .
:Drainage_Network rdf:type owl:Class ; rdfs:label "Drainage Network" .
:Public_Landscaping rdf:type owl:Class ; rdfs:label "Public Landscaping" .

:hasScheduledMaintenance rdf:type owl:ObjectProperty ;
    rdfs:domain :Road_Network ;
    rdfs:range :Maintenance_Schedule ;
    rdfs:label "has scheduled maintenance" .

:isExecutedBy rdf:type owl:ObjectProperty ;
    rdfs:domain :Maintenance_Schedule ;
    rdfs:range :Contractor ;
    rdfs:label "is executed by" .

:connectsTo rdf:type owl:ObjectProperty ;
    rdfs:domain :Drainage_Network ;
    rdfs:range :Sewage_Treatment_Plant ;
    rdfs:label "connects to" .

:supplies rdf:type owl:ObjectProperty ;
    rdfs:domain :Water_Reuse ;
    rdfs:range :Public_Landscaping ;
    rdfs:label "supplies" .

:serves rdf:type owl:ObjectProperty ;
    rdfs:domain :Waste_Collection ;
    rdfs:range :Household ;
    rdfs:label "serves" .

:hasEnvironmentalImpact rdf:type owl:ObjectProperty ;
    rdfs:domain :Waste_Management_Agency ;
    rdfs:range :EnvironmentalImpactReport ;
    rdfs:label "has environmental impact report" .

:hasEnergyEfficiency rdf:type owl:ObjectProperty ;
    rdfs:domain :Energy_Management_Agency ;
    rdfs:range :EnergyEfficiencyReport ;
    rdfs:label "has energy efficiency report" .

:includes rdf:type owl:ObjectProperty ;
    rdfs:domain :Smart_Infrastructure ;
    rdfs:range :TechnologyComponent ;
    rdfs:label "includes" .

:monitors rdf:type owl:ObjectProperty ;
    rdfs:domain :Smart_Infrastructure ;
    rdfs:range :MonitoringSystem ;
    rdfs:label "monitors" .

:roadMaintenanceEfficiency rdf:type owl:DatatypeProperty ;
    rdfs:domain :Maintenance_Schedule ;
    rdfs:range xsd:float ;
    rdfs:label "Road Maintenance Efficiency (%)" .

:trafficFlowImprovement rdf:type owl:DatatypeProperty ;
    rdfs:domain :Road_Network ;
    rdfs:range xsd:float ;
    rdfs:label "Traffic Flow Improvement (%)" .

:sewageTreatmentEfficiency rdf:type owl:DatatypeProperty ;
    rdfs:domain :Sewage_Treatment_Plant ;
    rdfs:range xsd:float ;
    rdfs:label "Sewage Treatment Efficiency (%)" .

:waterReuseRate rdf:type owl:DatatypeProperty ;
    rdfs:domain :Water_Reuse ;
    rdfs:range xsd:float ;
    rdfs:label "Water Reuse Rate (%)" .

:recyclingRate rdf:type owl:DatatypeProperty ;
    rdfs:domain :Recycling_Facility ;
    rdfs:range xsd:float ;
    rdfs:label "Recycling Rate (%)" .

:greenSpaceExpansion rdf:type owl:DatatypeProperty ;
    rdfs:domain :Public_Park ;
    rdfs:range xsd:float ;
    rdfs:label "Green Space Expansion (%)" .

:energyEfficiencyRate rdf:type owl:DatatypeProperty ;
    rdfs:domain :Energy_Management_Agency ;
    rdfs:range xsd:float ;
    rdfs:label "Energy Efficiency Rate (%)" .

:waterConsumptionReduction rdf:type owl:DatatypeProperty ;
    rdfs:domain :Water_Reuse ;
    rdfs:range xsd:float ;
    rdfs:label "Water Consumption Reduction (%)" .

:Road123 rdf:type :Road_Network ;
    :roadMaintenanceEfficiency "85.0"^^xsd:float ;
    :trafficFlowImprovement "10.0"^^xsd:float .

:SewagePlantA rdf:type :Sewage_Treatment_Plant ;
    :sewageTreatmentEfficiency "95.0"^^xsd:float .

:RecyclingFacility1 rdf:type :Recycling_Facility ;
    :recyclingRate "60.0"^^xsd:float .

:EnergyReport2025 rdf:type :EnergyEfficiencyReport ;
    :energyEfficiencyRate "70.0"^^xsd:float .

:WaterReuseInitiative rdf:type :Water_Reuse ;
    :waterReuseRate "50.0"^^xsd:float ;
    :waterConsumptionReduction "20.0"^^xsd:float .
`;
const Ontology = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const parser = new Parser();
    const triples = [];
    const nodesMap = new Map();
    const tempEdges = [];

    parser.parse(ttlText, (error, triple) => {
      if (error) return console.error(error);
      if (!triple) {
        // parsing complete
        setNodes(Array.from(nodesMap.values()));
        setEdges(tempEdges);
        return;
      }

      const subject = triple.subject.value || triple.subject.id;
      const predicate = triple.predicate.value || triple.predicate.id;
      const object = triple.object.value || triple.object.id;

      if (!nodesMap.has(subject)) {
        nodesMap.set(subject, {
          id: subject,
          data: { label: subject.split('#').pop() },
          position: { x: Math.random() * 1600, y: Math.random() * 1600 },
        });
      }

      const isLiteral = triple.object.termType === 'Literal';
      if (!isLiteral && !nodesMap.has(object)) {
        nodesMap.set(object, {
          id: object,
          data: { label: object.split('#').pop() },
          position: { x: Math.random() * 1600, y: Math.random() * 1600 },
        });
      }

      if (!isLiteral) {
        tempEdges.push({
          id: uuidv4(),
          source: subject,
          target: object,
          label: predicate.split('#').pop(),
          animated: true,
          style: { stroke: '#444' },
        });
      }
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};


export default Ontology;

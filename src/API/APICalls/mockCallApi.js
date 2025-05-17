export const graphData=[
    {
      "name": "Average Project Delay",
      "value": 12.3,
      "unit": "days",
      "progress": 137,
      "target": 9,
      "status": "Needs attention",
      "trendData": {
        "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"],
        "values": [15.0, 14.2, 13.8, 13.4, 13.0, 12.8, 12.7, 12.6, 12.4, 12.3]
      }
    },
    {
      "name": "Milestones Met On Time",
      "value": 78,
      "unit": "%",
      "progress": 87,
      "target": 90,
      "status": "Needs attention",
      "trendData": {
        "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"],
        "values": [85, 84, 82, 81, 80, 79, 78, 78, 77, 78]
      }
    },
    {
      "name": "Contractor Response Time",
      "value": 8.5,
      "unit": "hours",
      "progress": 142,
      "target": 6,
      "status": "Needs attention",
      "trendData": {
        "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"],
        "values": [10.5, 9.8, 9.0, 8.7, 8.5, 8.3, 8.4, 8.6, 8.5, 8.5]
      }
    },
    {
      "name": "High-Risk Defects Identified",
      "value": 24,
      "unit": "count",
      "progress": 80,
      "target": 30,
      "status": "OK",
      "trendData": {
        "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"],
        "values": [28, 27, 26, 25, 25, 24, 24, 23, 22, 24]
      }
    },
    // {
    //   "name": "Budget Utilization",
    //   "value": 92,
    //   "unit": "%",
    //   "progress": 103,
    //   "target": 90,
    //   "status": "OK",
    //   "trendData": {
    //     "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"],
    //     "values": [88, 90, 91, 93, 92, 91, 92, 92, 91, 92]
    //   }
    // },
    // {
    //   "name": "Task Completion Rate",
    //   "value": 75,
    //   "unit": "%",
    //   "progress": 95,
    //   "target": 80,
    //   "status": "OK",
    //   "trendData": {
    //     "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"],
    //     "values": [72, 73, 74, 74, 75, 76, 75, 75, 76, 75]
    //   }
    // }
  ]


export const performanceMatrics = [
  {
    title: "Average project delay",
    current: "12.3",
    predicted: "12.35",
    delta: "-0.4%",
    recommendations: [],
    impactAnalysis: 
      {
        performance: "0.4% improvement in performance",
        utilization: "Resource utilization optimized",
      }
  },
  {
    title: "Milestones met on time",
    current: "78",
    predicted: "78.32",
    delta: "-0.4%",
    recommendations: [
      {
        title: "Optimize processes for milestones met on time",
        desc: "Process efficiency improvements could help close the performance gap",
      },
      {
        title: "Accelerate technology adoption for milestones met on time",
        desc: "Increased automation and digital tools could improve performance",
      },
    ],
    impactAnalysis: 
      {
        performance: "0.4% improvement in performance",
        utilization: "Resource utilization optimized",
      }
  },
  {
    title: "Contractor response time",
    current: "8.5",
    predicted: "8.54",
    delta: "-0.5%",
    recommendations: [],
    impactAnalysis: 
      {
        performance: "0.4% improvement in performance",
        utilization: "Resource utilization optimized",
      }
  },
  {
    title: "High-risk defects identified",
    current: "24",
    predicted: "24.1",
    delta: "-0.4%",
    recommendations: [
      {
        title: "Optimize processes for high-risk defects identified",
        desc: "Process efficiency improvements could help close the performance gap",
      },
      {
        title:
          "Accelerate technology adoption for high-risk defects identified",
        desc: "Increased automation and digital tools could improve performance",
      },
    ],
    impactAnalysis: {
        performance: "0.4% improvement in performance",
        utilization: "Resource utilization optimized",
      }
  },
];
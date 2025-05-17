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

 export const AIrecommendations = [
    {
      type: "objective",
      title: "Implement predictive maintenance system for critical infrastructure",
      description:
        "Based on your increasing maintenance costs and emergency repair frequency",
      confidence: 92,
    },
    {
      type: "keyResult",
      title: "Reduce contractor onboarding time by 50%",
      description:
        "Would help address project delays caused by contractor availability issues",
      confidence: 85,
    },
    {
      type: "action",
      title:
        "Create cross-functional rapid response teams for high-priority projects",
      description: "To address the 15% increase in critical path delays this quarter",
      confidence: 88,
    },
  ];
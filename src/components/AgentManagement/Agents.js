

export const defaultAgents = [
  {
    id: 'goal-recommender',
    name: 'Goal Recommendation Agent',
    description: 'Analyzes performance data and suggests strategic objectives',
    type: 'recommender',
    capabilities: [
      {
        name: 'objective-generation',
        description: 'Generates strategic objectives based on KPI trends and gaps',
        parameters: [
          {
            name: 'lookback-period',
            type: 'number',
            required: true,
            default: 90
          },
          {
            name: 'confidence-threshold',
            type: 'number',
            required: true,
            default: 0.8
          }
        ],
        triggers: [
          {
            type: 'schedule',
            configuration: {
              frequency: 'weekly'
            }
          }
        ]
      }
    ],
    configuration: {
      enabled: true,
      mode: 'semi-automatic',
      sensitivity: 0.7,
      notificationChannels: ['email', 'dashboard']
    },
    status: {
      state: 'idle',
      metrics: {
        executionTime: 0,
        successRate: 0,
        errorRate: 0
      }
    }
  },
  {
    id: 'anomaly-detector',
    name: 'KPI Anomaly Detection Agent',
    description: 'Monitors KPIs for anomalies and unusual patterns',
    type: 'analyzer',
    capabilities: [
      {
        name: 'anomaly-detection',
        description: 'Detects statistical anomalies in KPI values',
        parameters: [
          {
            name: 'detection-algorithm',
            type: 'string',
            required: true,
            default: 'zscore'
          },
          {
            name: 'sensitivity',
            type: 'number',
            required: true,
            default: 2.5
          }
        ],
        triggers: [
          {
            type: 'event',
            configuration: {
              eventType: 'kpi-update'
            }
          }
        ]
      }
    ],
    configuration: {
      enabled: true,
      mode: 'automatic',
      threshold: 2.5,
      notificationChannels: ['dashboard', 'slack']
    },
    status: {
      state: 'idle',
      metrics: {
        executionTime: 0,
        successRate: 0,
        errorRate: 0
      }
    }
  },
  {
    id: 'action-optimizer',
    name: 'Action Plan Optimization Agent',
    description: 'Optimizes action plans based on impact and resource constraints',
    type: 'optimizer',
    capabilities: [
      {
        name: 'action-prioritization',
        description: 'Prioritizes actions based on impact and resource availability',
        parameters: [
          {
            name: 'optimization-strategy',
            type: 'string',
            required: true,
            default: 'impact-first'
          },
          {
            name: 'resource-constraints',
            type: 'object',
            required: true,
            default: {}
          }
        ],
        triggers: [
          {
            type: 'condition',
            configuration: {
              condition: 'action-count > 10'
            }
          }
        ]
      }
    ],
    configuration: {
      enabled: true,
      mode: 'semi-automatic',
      sensitivity: 0.8,
      notificationChannels: ['dashboard']
    },
    status: {
      state: 'idle',
      metrics: {
        executionTime: 0,
        successRate: 0,
        errorRate: 0
      }
    }
  },
  {
    id: 'prediction-engine',
    name: 'KPI Prediction Agent',
    description: 'Forecasts KPI trends and predicts future values',
    type: 'predictor',
    capabilities: [
      {
        name: 'trend-prediction',
        description: 'Predicts future KPI values using historical data',
        parameters: [
          {
            name: 'prediction-horizon',
            type: 'number',
            required: true,
            default: 30
          },
          {
            name: 'model-type',
            type: 'string',
            required: true,
            default: 'arima'
          }
        ],
        triggers: [
          {
            type: 'schedule',
            configuration: {
              frequency: 'daily'
            }
          }
        ]
      }
    ],
    configuration: {
      enabled: true,
      mode: 'automatic',
      sensitivity: 0.6,
      notificationChannels: ['dashboard', 'email']
    },
    status: {
      state: 'idle',
      metrics: {
        executionTime: 0,
        successRate: 0,
        errorRate: 0
      }
    }
  }
];
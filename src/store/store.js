import { create } from 'zustand';

const useNetworkStore = create((set, get) => ({
  agentName:'',
  history: [],
  successCount: 0,
  errorCount: 0,
  totalExecutionTime: 0,
  requestCount: 0,

  addRequestLog: (log) => {
    const state = get();
    const {
      executionTime,
      successRate,
      errorRate,
      time
    } = log;


    set({
      history: [...state.history, log],
      successCount: state.successCount + ((successRate)),
      errorCount: state.errorCount + ((errorRate)),
      totalExecutionTime: state.totalExecutionTime + executionTime,
      requestCount: state.requestCount + 1
    });
  },

  getMetrics: () => {
    const state = get();
    const total = state.requestCount;
    const successRate = total ? state.successCount / total : 0;
    const errorRate = total ? state.errorCount / total : 0;
    const avgLatency = total ? state.totalExecutionTime / total : 0;
    const throughput = total ? total / (state.totalExecutionTime / 1000) : 0;

    return {
      successRate: successRate.toFixed(2),
      errorRate: errorRate.toFixed(2),
      avgLatency: avgLatency.toFixed(2),
      throughput: throughput.toFixed(2),
      history: state.history
    };
  }
}));

export default useNetworkStore;

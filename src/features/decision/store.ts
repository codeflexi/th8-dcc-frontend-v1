import { defineStore } from 'pinia';
import { ref } from 'vue';
import { decisionApi } from './api';
import type { DecisionState } from './types';

export const useDecisionStore = defineStore('decision', () => {
  const state = ref<DecisionState>({
    caseId: '',
    recommendation: 'APPROVE',
    confidenceScore: 0,
    rules: [],
    isProcessing: false,
    userDecision: undefined
  });

  async function loadContext(caseId: string) {
    state.value.isProcessing = true;
    state.value.caseId = caseId;
    try {
      const data = await decisionApi.getRules(caseId);
      state.value.rules = data.rules;
      state.value.confidenceScore = data.score;
    } catch (e) {
      console.error(e);
      state.value.error = 'Failed to load rules';
    } finally {
      state.value.isProcessing = false;
    }
  }

  async function submit(action: 'APPROVE' | 'REJECT', reason: string) {
    if (!reason && action === 'REJECT') {
      alert('Please provide a reason for rejection.');
      return;
    }
    
    state.value.isProcessing = true;
    try {
      await decisionApi.submitDecision(state.value.caseId, action, reason);
      state.value.userDecision = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    } catch (e) {
      alert('Failed to submit decision');
    } finally {
      state.value.isProcessing = false;
    }
  }

  return {
    state,
    loadContext,
    submit
  };
});
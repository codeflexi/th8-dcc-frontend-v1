// src/features/decision/types.ts

export type RuleStatus = 'PASS' | 'FAIL' | 'WARNING';

export interface RuleResult {
  id: string;
  code: string;
  name: string;
  description: string;
  status: RuleStatus;
  message?: string;
}

export interface DecisionState {
  caseId: string;
  recommendation: 'APPROVE' | 'REJECT' | 'MANUAL_REVIEW';
  confidenceScore: number;
  rules: RuleResult[];
  userDecision?: 'APPROVED' | 'REJECTED';
  reason?: string;
  isProcessing: boolean;
  error?: string;
}
import { http } from '@/lib/http';
import type { RuleResult } from './types';

export const decisionApi = {
  async getRules(caseId: string): Promise<{ rules: RuleResult[], score: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: 98.5,
          rules: [
            {
              id: 'r1',
              code: 'SPLIT_PO_CHECK',
              name: 'Split PO Detection',
              description: 'Checks for multiple POs to same vendor within 48h',
              status: 'WARNING',
              message: 'Found 2 POs (Total: 3.4M THB) within 24 hours.'
            },
            {
              id: 'r2',
              code: 'BUDGET_LIMIT',
              name: 'Budget Threshold',
              description: 'Verify department budget availability',
              status: 'PASS',
              message: 'Within Q1-2026 Marketing Budget'
            },
            {
              id: 'r3',
              code: 'VENDOR_SLA',
              name: 'Vendor Reliability Score',
              description: 'Checks vendor historical performance',
              status: 'PASS',
              message: 'Vendor Score: A+ (99% On-time)'
            }
          ]
        });
      }, 800);
    });
  },

  async submitDecision(caseId: string, action: 'APPROVE' | 'REJECT', reason: string): Promise<boolean> {
    console.log(`[API] Submitting decision for ${caseId}: ${action} (Reason: ${reason})`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1200);
    });
  }
};
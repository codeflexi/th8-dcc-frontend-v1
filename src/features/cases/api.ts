import { http } from '@/lib/http';
import type { CaseDTO } from '@/types/case';

export const caseApi = {
  async getAll(): Promise<CaseDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'CASE-P0-OVT-2025-006',
            vendor: 'Ovaltine (AB Food)',
            amount: 3200000,
            currency: 'THB',
            status: 'OPEN',
            risk_level: 'HIGH',
            created_at: '2026-01-01T16:25:00',
            priority_score: 95
          },
          {
            id: 'CASE-P0-OVT-2025-007',
            vendor: 'OfficeSup Co.',
            amount: 245000,
            currency: 'THB',
            status: 'OPEN',
            risk_level: 'MEDIUM',
            created_at: '2026-01-02T09:15:00',
            priority_score: 50
          },
           {
            id: 'CASE-P0-OVT-2025-008',
            vendor: 'Packaging Solutions',
            amount: 1050000,
            currency: 'THB',
            status: 'CLOSED',
            risk_level: 'LOW',
            created_at: '2025-12-28T14:30:00',
            priority_score: 20
          }
        ]);
      }, 800);
    });
  }
};
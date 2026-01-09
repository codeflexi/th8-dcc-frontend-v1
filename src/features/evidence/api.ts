import type { EvidenceDoc, AIFinding } from './types';

export const evidenceApi = {
  async getData(caseId: string): Promise<{ docs: EvidenceDoc[], findings: AIFinding[] }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          docs: [
            { id: 'doc_po', name: 'PO-2025-9981.pdf', type: 'PO', pageCount: 2 },
            { id: 'doc_inv', name: 'INV-8821.pdf', type: 'INVOICE', pageCount: 1 }
          ],
          findings: [
            {
              id: 'f1', docId: 'doc_po', page: 1,
              label: 'Vendor Name', value: 'Ovaltine (AB Food)',
              confidence: 99.8, status: 'MATCH', message: 'Matches Master Data',
              box: { x: 10, y: 15, w: 40, h: 5 }
            },
            {
              id: 'f2', docId: 'doc_po', page: 1,
              label: 'Total Amount', value: '3,200,000.00',
              confidence: 98.5, status: 'SUSPICIOUS', message: 'High amount triggers approval flow',
              box: { x: 60, y: 80, w: 25, h: 5 }
            },
            {
              id: 'f3', docId: 'doc_inv', page: 1,
              label: 'Line Item', value: 'Consulting Fee',
              confidence: 85.0, status: 'MISMATCH', message: 'Description vague compared to PO',
              box: { x: 10, y: 40, w: 80, h: 8 }
            }
          ]
        });
      }, 700);
    });
  }
};
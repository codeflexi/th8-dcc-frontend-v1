export interface EvidenceDoc {
  id: string;
  name: string;
  type: 'PO' | 'INVOICE' | 'QUOTATION';
  pageCount: number;
}

export interface AIFinding {
  id: string;
  docId: string;
  page: number;
  label: string; // e.g., "Vendor Name", "Total Amount"
  value: string;
  confidence: number;
  status: 'MATCH' | 'MISMATCH' | 'SUSPICIOUS';
  message: string;
  // Coordinates for highlighting (Mock %)
  box: { x: number; y: number; w: number; h: number }; 
}
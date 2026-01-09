export interface ApiResponse<T> {
  data: T;
  error?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const http = {
  async get<T>(url: string): Promise<T> {
    // For demo purposes, we are not actually calling an API if it's not setup
    // This allows the UI to render with mock data in api.ts files
    console.log(`[HTTP GET] ${url}`);
    return {} as T; 
    
    /* Real implementation:
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return res.json();
    */
  },

  async post<T>(url: string, body: any): Promise<T> {
    console.log(`[HTTP POST] ${url}`, body);
    return {} as T;
  }
};
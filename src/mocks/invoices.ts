// src/mocks/invoices.ts
import { Invoice } from '@/models/Invoice'

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    clientName: 'Acme Corp',
    clientEmail: 'billing@acme.com',
    dateIssued: '2025-07-01',
    dueDate: '2025-07-15',
    items: [
      { description: 'Website Design', quantity: 1, unitPrice: 1500 },
      { description: 'Hosting (1 year)', quantity: 1, unitPrice: 120 },
    ],
    taxRate: 0.18,
    total: 1903.6,
    status: 'sent',
  },
  {
    id: 'INV-002',
    clientName: 'Beta LLC',
    clientEmail: 'finance@beta.com',
    dateIssued: '2025-07-05',
    dueDate: '2025-07-20',
    items: [
      { description: 'Mobile App Development', quantity: 50, unitPrice: 50 },
    ],
    taxRate: 0.18,
    total: 2950,
    status: 'paid',
  },
  {
    id: 'INV-003',
    clientName: 'Gamma Solutions',
    clientEmail: 'accounts@gamma.com',
    dateIssued: '2025-07-10',
    dueDate: '2025-07-25',
    items: [{ description: 'Maintenance', quantity: 12, unitPrice: 100 }],
    taxRate: 0.18,
    total: 1416,
    status: 'overdue',
  },
  {
    id: 'INV-004',
    clientName: 'Delta Inc.',
    clientEmail: 'info@delta.com',
    dateIssued: '2025-07-12',
    dueDate: '2025-07-30',
    items: [{ description: 'SEO Services', quantity: 6, unitPrice: 200 }],
    taxRate: 0.18,
    total: 1416,
    status: 'draft',
  },
]

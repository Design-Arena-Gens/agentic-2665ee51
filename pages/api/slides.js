import { createSlidesPDFStream } from '@/lib/pdf';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="english-literature-benefits.pdf"');

  createSlidesPDFStream(res);
}

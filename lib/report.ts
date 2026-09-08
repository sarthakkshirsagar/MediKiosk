/**
 * Professional patient history report export for MediKiosk.
 * - buildReportHtml(): standalone, print-ready A4 report (Unicode/Indic-script friendly).
 * - downloadReportPdf(): renders it with html2canvas + jsPDF and downloads a real PDF.
 * - printReport(): injects a print-only copy and opens the browser print dialog.
 */
import jsPDF from 'jspdf';
import { formatShortDate, formatTime } from './clock';

export interface ReportItem {
  label: string;
  value: string;
}

export interface ReportBlock {
  heading: string;
  items?: ReportItem[];
  bullets?: string[];
  footnote?: string;
}

export interface ReportModel {
  tagline: string;
  title: string;
  aiSummaryTitle: string;
  aiSummaryBody: string;
  reviewBadge: string;
  generatedLabel: string;
  generatedValue: string;
  statusLabel: string;
  statusValue: string;
  blocks: ReportBlock[];
  footerNote: string;
}

const esc = (s: string) =>
  (s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; background: #ffffff; color: #0B1B2B;
    font-family: -apple-system, 'Segoe UI', 'Noto Sans', 'Noto Sans Devanagari', 'Nirmala UI', 'Mangal', 'Lohit Devanagari', Arial, sans-serif;
    font-size: 13px; line-height: 1.5; }
  .mk { width: 794px; padding: 28px 34px; }
  .mk-head { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #0E63E4; padding-bottom: 12px; }
  .mk-brand { font-size: 26px; font-weight: 800; letter-spacing: 2px; color: #0B1B2B; }
  .mk-brand span { color: #0FA3A3; }
  .mk-tag { font-size: 11px; font-weight: 700; letter-spacing: 1.2px; color: #8397A9; margin-top: 2px; }
  .mk-title { font-size: 18px; font-weight: 800; color: #0E63E4; margin-top: 14px; }
  .mk-meta { text-align: right; font-size: 11px; color: #4C5F72; font-weight: 600; }
  .mk-badge { display: inline-block; background: #FFF3DF; color: #8F5300; border: 1px solid #F4DFBD; border-radius: 999px; padding: 4px 12px; font-size: 11px; font-weight: 800; letter-spacing: 0.6px; margin-top: 10px; }
  .mk-summary { background: #E9F1FE; border: 1px solid #C9DEFB; border-radius: 10px; padding: 12px 14px; margin-top: 14px; }
  .mk-summary h4 { margin: 0 0 4px; font-size: 13px; color: #0A4CB0; }
  .mk-summary p { margin: 0; font-size: 12px; color: #0B1B2B; }
  .mk-block { margin-top: 16px; page-break-inside: avoid; break-inside: avoid; border: 1px solid #E2EAF3; border-radius: 10px; padding: 12px 14px; }
  .mk-block h3 { margin: 0 0 8px; font-size: 14px; color: #0A7C7C; letter-spacing: 0.4px; border-bottom: 1px solid #E2EAF3; padding-bottom: 6px; }
  .mk-row { display: flex; gap: 10px; padding: 4px 0; border-bottom: 1px dashed #EEF3F8; }
  .mk-row:last-child { border-bottom: none; }
  .mk-label { width: 200px; flex-shrink: 0; font-size: 11px; font-weight: 800; color: #8397A9; letter-spacing: 0.5px; padding-top: 2px; }
  .mk-value { flex: 1; font-size: 13px; color: #0B1B2B; font-weight: 600; }
  .mk-bullet { padding: 3px 0 3px 14px; position: relative; font-size: 13px; font-weight: 600; }
  .mk-bullet:before { content: '\\2022'; position: absolute; left: 0; color: #0FA3A3; }
  .mk-note { font-size: 11px; color: #8F5300; background: #FFF3DF; border-radius: 8px; padding: 6px 10px; margin-top: 8px; font-weight: 700; }
  .mk-foot { margin-top: 18px; border-top: 1px solid #E2EAF3; padding-top: 8px; font-size: 10.5px; color: #8397A9; display: flex; justify-content: space-between; font-weight: 600; }
  @page { size: A4; margin: 12mm; }
  @media print {
    body { background: #ffffff; }
    .mk { width: auto; padding: 0; }
  }
`;

function renderBlock(block: ReportBlock): string {
  const rows = (block.items ?? [])
    .map(
      (item) =>
        `<div class="mk-row"><div class="mk-label">${esc(item.label.toUpperCase())}</div><div class="mk-value">${esc(item.value)}</div></div>`,
    )
    .join('');
  const bullets = (block.bullets ?? []).map((b) => `<div class="mk-bullet">${esc(b)}</div>`).join('');
  const note = block.footnote ? `<div class="mk-note">${esc(block.footnote)}</div>` : '';
  return `<div class="mk-block"><h3>${esc(block.heading)}</h3>${rows}${bullets}${note}</div>`;
}

export function buildReportHtml(model: ReportModel, footerLeft: string, footerRight: string): string {
  const now = new Date();
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>MediKiosk - ${esc(model.title)}</title>
<style>${CSS}</style>
</head>
<body>
  <div class="mk">
    <div class="mk-head">
      <div>
        <div class="mk-brand">MEDI<span>KIOSK</span></div>
        <div class="mk-tag">${esc(model.tagline.toUpperCase())}</div>
      </div>
      <div class="mk-meta">
        ${esc(model.generatedLabel)}<br/><strong>${esc(model.generatedValue)}</strong>
      </div>
    </div>
    <div class="mk-title">${esc(model.title)}</div>
    <div><span class="mk-badge">${esc(model.reviewBadge)}</span></div>
    <div class="mk-summary">
      <h4>${esc(model.aiSummaryTitle)}</h4>
      <p>${esc(model.aiSummaryBody)}</p>
    </div>
    <div class="mk-block">
      <h3>${esc(model.statusLabel)}</h3>
      <div class="mk-row"><div class="mk-label">STATUS</div><div class="mk-value">${esc(model.statusValue)}</div></div>
    </div>
    ${model.blocks.map(renderBlock).join('')}
    <div class="mk-foot">
      <div>${esc(footerLeft)}</div>
      <div>${esc(footerRight)} · ${esc(formatShortDate(now))} ${esc(formatTime(now))}</div>
    </div>
  </div>
</body>
</html>`;
}

/** Renders the report into a real, multi-page, downloadable PDF. */
export async function downloadReportPdf(html: string, filename: string): Promise<void> {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-10000px';
  container.style.top = '0';
  container.style.width = '794px';
  container.style.background = '#ffffff';
  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    await doc.html(container as unknown as HTMLElement, {
      html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false },
      margin: [10, 10, 10, 10],
      width: 794,
      windowWidth: 794,
      autoPaging: 'slice',
    });
    doc.save(filename);
  } finally {
    document.body.removeChild(container);
  }
}

/** Opens the browser print dialog with only the clean report layout visible. */
export function printReport(html: string): void {
  const style = document.createElement('style');
  style.id = 'mk-print-style';
  style.textContent = `
    @media print {
      body > *:not(#mk-print-root) { display: none !important; }
      #mk-print-root { display: block !important; position: static !important; }
      #mk-print-root * { visibility: visible !important; }
    }
    #mk-print-root { position: absolute; left: -10000px; top: 0; }
  `;
  const root = document.createElement('div');
  root.id = 'mk-print-root';
  root.innerHTML = html;
  document.head.appendChild(style);
  document.body.appendChild(root);

  const cleanup = () => {
    style.remove();
    root.remove();
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  setTimeout(() => {
    window.print();
    setTimeout(cleanup, 60000);
  }, 250);
}

/** MediKiosk_Patient_History_<Name>_<YYYY-MM-DD>.pdf */
export function reportFileName(patientName?: string, dateIST = ''): string {
  const safe = (patientName ?? '').trim().replace(/\s+/g, '_').replace(/[^\p{L}\p{N}_-]/gu, '');
  const date = dateIST || new Date().toISOString().slice(0, 10);
  return safe ? `MediKiosk_Patient_History_${safe}_${date}.pdf` : 'MediKiosk_Patient_History.pdf';
}

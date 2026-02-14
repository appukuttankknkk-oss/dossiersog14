import { DossierState } from '../types';

/**
 * Native printing is the most reliable way to get high-resolution output
 * that exactly matches the screen layout, especially for complex Hindi fonts.
 
export const exportToPdf = async (elementId: string, filename: string) => {
  window.print();
};
*/
export const exportToPdf = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const opt = {
    margin: [10, 0, 10, 0], // Top, Left, Bottom, Right in mm
    filename: filename,
    image: { type: 'jpeg', quality: 1.0 },
    html2canvas: { 
      scale: 4, // High resolution
      useCORS: true, 
      letterRendering: true,
      dpi: 300,
      logging: false
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break-before',
      avoid: ['tr', 'td', 'img', 'video', 'audio']
    }
  };

  try {
    await html2pdf().from(element).set(opt).save();
  } catch (err) {
    console.error('PDF Generation failed:', err);
  }
};

/**
 * Export specific HTML content to a Word-compatible .doc file.
 * Includes basic CSS styling for tables and Hindi font support in Word.
 */
export const exportToWord = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const preHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Export Dossier</title>
      <style>
        table { border-collapse: collapse; width: 100%; border: 1pt solid black; } 
        td { border: 1pt solid black; padding: 4pt; font-family: 'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif; font-size: 10pt; vertical-align: top; } 
        tr { page-break-inside: avoid; break-inside: avoid; } 
        .bg-gray-50 { background-color: #f9fafb; } 
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-blue-50 { background-color: #eff6ff; }
      </style>
    </head>
    <body>
  `;
  const postHtml = "</body></html>";
  const html = preHtml + element.innerHTML + postHtml;

  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  // Ensure the filename ends with .doc
  const finalFilename = filename.toLowerCase().endsWith('.doc') ? filename : `${filename}.doc`;
  link.download = finalFilename;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

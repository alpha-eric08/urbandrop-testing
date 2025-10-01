export const exportToCSV = (data: any[], filename: string = 'data') => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(item => 
      headers.map(header => {
        const value = item[header];
        // Handle values that might contain commas
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
};

export const exportToJSON = (data: any[], filename: string = 'data') => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
};

export const exportToXML = (data: any[], filename: string = 'data') => {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<${filename}>
${data.map(item => `  <item>
${Object.entries(item).map(([key, value]) => `    <${key}>${value}</${key}>`).join('\n')}
  </item>`).join('\n')}
</${filename}>`;

  downloadFile(xmlContent, `${filename}.xml`, 'application/xml');
};

export const exportToTXT = (data: any[], filename: string = 'data') => {
  const txtContent = data.map(item => 
    Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('\n') + '\n---'
  ).join('\n\n');

  downloadFile(txtContent, `${filename}.txt`, 'text/plain');
};

export const printCustomers = (data: any[]) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const printContent = `
    <html>
      <head>
        <title>Data Export</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .header { text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Data Export</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        <table>
          <thead>
            <tr>
              ${headers.map(header => `<th>${header}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(item => `
              <tr>
                ${headers.map(header => `<td>${item[header]}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  }
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
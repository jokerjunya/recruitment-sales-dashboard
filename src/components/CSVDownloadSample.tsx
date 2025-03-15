import React from 'react';

interface CSVDownloadSampleProps {
  type: 'sales' | 'recruitment';
}

const CSVDownloadSample: React.FC<CSVDownloadSampleProps> = ({ type }) => {
  const generateSampleCSV = (): string => {
    if (type === 'sales') {
      return `Month,Total_Sales,Business_Unit_A,Business_Unit_B,Business_Unit_C
2024-01,1200000,500000,400000,300000
2024-02,1300000,600000,450000,250000
2024-03,1250000,550000,425000,275000`;
    } else {
      return `Month,Applicants,Interviews,Offers,Hires
2024-01,1187,230,168,44
2024-02,673,390,64,72
2024-03,892,310,98,58`;
    }
  };

  const downloadSample = () => {
    const csvContent = generateSampleCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', type === 'sales' ? 'sample_sales_data.csv' : 'sample_recruitment_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadSample}
      className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
    >
      サンプルCSVをダウンロード
    </button>
  );
};

export default CSVDownloadSample; 
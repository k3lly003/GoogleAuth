"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Example table data
const tableData = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

export default function ExportTablePDF() {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Name", "Price"];
    const tableRows = [];

    // Populate the table rows with data
    tableData.forEach((item) => {
      const rowData = [item.id, item.name, item.price];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("table-data.pdf"); // Trigger file download
  };

  return (
    <div>
      <h1>Product Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={handleExportPDF} className="bg-red-500 text-white px-4 py-2 mt-4">
        Export to PDF
      </Button>
    </div>
  );
}

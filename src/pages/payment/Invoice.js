import React from "react";

const Invoice = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">INVOICE</h2>
      <div className="flex justify-between mt-6 border-b pb-4">
        <div>
          <h3 className="font-bold">ISSUED TO:</h3>
          <p>Richard Sanchez</p>
          <p>Thynk Unlimited</p>
          <p>123 Anywhere St., Any City</p>
        </div>
        <div className="text-right">
          <h3 className="font-bold">INVOICE NO: 01234</h3>
          <p>Date: 11.02.2030</p>
          <p>Due Date: 11.03.2030</p>
        </div>
      </div>
      
      <div className="mt-4 border-b pb-4">
        <h3 className="font-bold">PAY TO:</h3>
        <p>Borcele Bank</p>
        <p>Account Name: Adeline Palmerston</p>
        <p>Account No.: 0123 4567 8901</p>
      </div>
      
      <table className="w-full mt-4 text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">DESCRIPTION</th>
            <th className="p-2">UNIT PRICE</th>
            <th className="p-2">QTY</th>
            <th className="p-2">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Brand consultation",
            "Logo design",
            "Website design",
            "Social media templates",
            "Brand photography",
            "Brand guide",
          ].map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item}</td>
              <td className="p-2">$100</td>
              <td className="p-2">1</td>
              <td className="p-2">$100</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 text-right">
        <p className="font-bold">Subtotal: $400</p>
        <p>Tax (10%): $40</p>
        <p className="text-lg font-bold">Total: $440</p>
      </div>
      
      <div className="mt-6 text-right">
        <p className="italic">Adeline Palmerston</p>
      </div>
    </div>
  );
};

export default Invoice;

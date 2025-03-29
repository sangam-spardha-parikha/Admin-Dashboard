import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Icons for actions

const Table = ({ columns, data, actions }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPageOptions = [10, 25, 50, 100, "All"];

  useEffect(() => {
    const filtered = data.filter((item) =>
      columns.some((col) =>
        (item[col.accessor] ?? "").toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, data]);

  // Pagination Logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData =
    rowsPerPage === "All" ? filteredData : filteredData.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = rowsPerPage === "All" ? 1 : Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      {/* Search and Entries Per Page */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/3"
        />
        <select
          className="p-2 border rounded"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(e.target.value === "All" ? "All" : parseInt(e.target.value))}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>

      {/* Responsive Table Wrapper with Horizontal Scroll */}
      <div className="overflow-x-auto max-w-full">
        <table className="w-full border-collapse border border-gray-300 min-w-max">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th key={col.accessor} className="p-2 border text-left">{col.header}</th>
              ))}
              {actions && <th className="p-2 border text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.accessor} className="p-2 border">
                      {item[col.accessor] ?? "N/A"}
                    </td>
                  ))}
                  {actions && (
                    <td className="p-2 border text-center whitespace-nowrap">
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => action.onClick(item)}
                          className="p-2 mx-1 text-white rounded"
                          style={{ backgroundColor: action.color || "#007bff" }}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Centered Pagination */}
      {rowsPerPage !== "All" && (
        <div className="mt-4 flex justify-center items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <div className="mx-4 flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;

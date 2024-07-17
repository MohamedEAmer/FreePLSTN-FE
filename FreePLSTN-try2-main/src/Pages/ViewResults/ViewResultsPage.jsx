import React, { useState, useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { DUMMY_Resulte } from "../../data.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "./ViewResults.css";

const ViewResultsPage = () => {
  const [resultes, setResultes] = useState(DUMMY_Resulte);
  const [studentIdFilter, setStudentIdFilter] = useState("");
  const [finalResultFilter, setFinalResultFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Student ID",
        accessor: "StudentID",
      },
      {
        Header: "Bubble Q Result",
        accessor: "BubbleQresulte",
      },
      {
        Header: "Q2 Result",
        accessor: "Q2resulte",
      },
      {
        Header: "Q3 Result",
        accessor: "Q3resulte",
      },
      {
        Header: "Q4 Result",
        accessor: "Q4resulte",
      },
      {
        Header: "Final Result",
        accessor: "finalResulte",
        sortType: "basic",
      },
    ],
    []
  );

  const filteredData = useMemo(
    () =>
      resultes.filter(
        (res) =>
          (studentIdFilter === "" ||
            res.StudentID.toString().includes(studentIdFilter)) &&
          (finalResultFilter === "" ||
            res.finalResulte.toString().includes(finalResultFilter))
      ),
    [resultes, studentIdFilter, finalResultFilter]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    setSortBy,
  } = useTable({ columns, data: filteredData }, useFilters, useSortBy);

  const handleExport = (format) => {
    if (format === "pdf") {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [columns.map((col) => col.Header)],
        body: rows.map((row) => row.cells.map((cell) => cell.value)),
      });
      doc.save("results.pdf");
    } else if (format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(resultes);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
      XLSX.writeFile(workbook, "results.xlsx");
    }
  };

  const sortFinalResultAscending = () => {
    setSortBy([{ id: "finalResulte", desc: false }]);
  };

  const sortFinalResultDescending = () => {
    setSortBy([{ id: "finalResulte", desc: true }]);
  };

  const sortStudentIdAscending = () => {
    setSortBy([{ id: "StudentID", desc: false }]);
  };

  const sortStudentIdDescending = () => {
    setSortBy([{ id: "StudentID", desc: true }]);
  };

  return (
    <div className=" ">
    <div className="view-results-container ">
      <h2>View Results</h2>
      <div className="filter">
        <input
          type="text"
          placeholder="Filter by Student ID"
          value={studentIdFilter}
          onChange={(e) => setStudentIdFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Final Result"
          value={finalResultFilter}
          onChange={(e) => setFinalResultFilter(e.target.value)}
        />
      </div>
      <div className="sorting-buttons">
        <button onClick={sortFinalResultAscending}>
          Sort Final Result: Low to High
        </button>
        <button onClick={sortFinalResultDescending}>
          Sort Final Result: High to Low
        </button>
        <button onClick={sortStudentIdAscending}>
          Sort Student ID: Low to High
        </button>
        <button onClick={sortStudentIdDescending}>
          Sort Student ID: High to Low
        </button>
      </div>
      <h2>MoExam</h2>
      <table {...getTableProps()} className="results-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="button" onClick={() => handleExport("pdf")}>
        Export as PDF
      </button>
      <button type="button" onClick={() => handleExport("excel")}>
        Export as Excel
      </button>
    </div>
    </div>
  );
};

export default ViewResultsPage;

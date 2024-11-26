import React from "react";

const TransactionsTable = ({ headers, data, isMMTransaction }) => {
  return (
    <table className="table display data-table text-nowrap">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={{ width: header.width || "auto" }}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              {headers.map((header, headerIndex) => {
                const value = item[header.key]; // Get the value based on the key
                
                // Handle special cases
                if (header.key === "created_at") {
                  return (
                    <td key={headerIndex}>
                      {item.created_at?.short_date || "Date not available"}
                      <br />
                      <small>{item.created_at?.time || "Time not available"}</small>
                    </td>
                  );
                }

                if (header.key === "student" || header.key === "user") {
                  return (
                    <td key={headerIndex}>
                      {item.student || item.user || "Unknown User"}
                      <br />
                      <small>{item.school || item.username || "Parent"}</small>
                    </td>
                  );
                }

                if (header.key === "amount" || header.key === "cash_in" || header.key === "cash_out") {
                  // For MM transactions, show default "SUCCESSFUL"
                  if (isMMTransaction) {
                    return (
                      
                      <td key={headerIndex}>
                      <span className="badge bg-teal">
                        <i className="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{ color: "#042954" }}></i>
                        UGX. {item[header.key]}
                      </span>
                      <br />
                     
                      <span className={`badge ${item.status === "3" ? "badge-success" : item.status === "1" ? "badge-warning" : "badge-danger"}`}>
                        {item.status === "3" ? "SUCCESSFUL" : item.status === "1" ? "PENDING" : "FAILED"}
                      </span>
                    </td>
                    );
                  } else {
                    return (
                      <td key={headerIndex}>
                        <span className="badge bg-teal">
                          <i className="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{ color: "#042954" }}></i>
                          UGX. {item[header.key]}
                        </span>
                        <br />
                        <span className="badge badge-success">SUCCESSFUL</span> 
                      </td>
                    );
                  }
                }

                if (header.key === "status") {
                  return (
                    <td key={headerIndex}>
                      <span className={`badge ${item.status === "3" ? "badge-success" : item.status === "1" ? "badge-warning" : "badge-danger"}`}>
                        {item.status === "3" ? "SUCCESSFUL" : item.status === "1" ? "PENDING" : "FAILED"}
                      </span>
                    </td>
                  );
                }

                if (header.key === "account") {
                    return (
                      <td key={headerIndex}>
                        <span className="badge badge-info">{item.account || "N/A"}</span>
                      </td>
                    );
                  }

                if (header.key === "internal_ref" || header.key === "transaction_number" || header.key === "client_ref") {
                  return <td key={headerIndex}>{item[header.key] || "N/A"}</td>;
                }

                // Default case for other fields
                return <td key={headerIndex}>{value || "N/A"}</td>;
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} style={{ textAlign: "center" }}>
              No transactions found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionsTable;

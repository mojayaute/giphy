import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ApiService from "../services/ApiService";
import moment from "moment";
import Swal from "sweetalert2";
import Header from "../components/Header";

const History = () => {
  const [dataSearches, setSearches] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = () => {
    ApiService.getHistory()
      .then((response) => {
        setSearches(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteTask = (event) => {
    ApiService.clearHistory()
      .then((response) => {
        const res = response.data;
        if (res.status) {
          Swal.fire({
            title: "Done",
            text: "History cleared",
            icon: "success",
          }).then((result) => {
            getHistory();
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Error trying to clear history",
            icon: "error",
          }).then((result) => {
            getHistory();
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const searches = [
    {
      name: "Search",
      selector: (row) => row.query,
      sortable: true,
    },
    {
      name: "Fecha de creación",
      selector: (row) => moment(row.created_at).format("MM/DD/YYYY"),
      sortable: true,
    },
  ];

  return (
    <div>
      <Header />
      <div className="container pt-5">
        <div className="row mb-4">
          <div className="col-md-6">
            <h3>History</h3>
          </div>
          <div className="col-md-6 text-end">
            <button onClick={deleteTask} className="btn btn-sm btn-danger">
              Clear History
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card p-4">
              <DataTable
                columns={searches}
                data={dataSearches}
                pagination
                sortActive={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

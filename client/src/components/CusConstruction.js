import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Button, Box } from '@material-ui/core'

function CusConstruction() {
  const [construction, setConstruction] = useState([]);

  useEffect(() => onReload(), []);

  const onReload = () => {
    const url = "http://localhost:3500/constructions/"
    axios.get(url).then((response) => {
      console.log(response["data"])
      setConstruction(response["data"])
    });
  };

  const columns = [
    { title: "Date", field: "date"},
    { title: "Location", field: "location" },
    { title: "Supplier", field: "suppiler" },
    { title: 'Budget', field: 'budget' , type: "numeric"}
  ];
  return (
    <div>
      <br />
      <MaterialTable
        title="Construction Table"
        columns={columns}
        data={construction}
        style={{
          maxWidth: "80%",
          padding: "20px 5px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
        options={{
          filtering: true,
          sorting: true,
          actionsColumnIndex: -1,
        }}
      />
      <br />
    </div>
  );
}

export default CusConstruction;
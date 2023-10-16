import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from "material-table";
import ButterToast, { Cinnamon } from "butter-toast";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Button, Box } from '@material-ui/core'

function Construction() {
  const [construction, setConstruction] = useState([]);

  useEffect(() => onReload(), []);

  const onReload = () => {
    const url = "http://localhost:3500/constructions/"
    axios.get(url).then((response) => {
      console.log(response["data"])
      setConstruction(response["data"])
    });
  };

  const validation = (itemName, quantity,supplier,site) => {
    console.log("bb");
    var Error = false;

    if (itemName === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Item Name Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      })
      Error = true;
    }

    if (quantity === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Quantity Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      })
      Error = true;
    }

    if (supplier === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Supplier Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      })
      Error = true;
    }

    if (site === "") {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Validation Error!"
            content="Site Required!"
            scheme={Cinnamon.Crisp.SCHEME_RED}
            icon={<ErrorOutlineIcon />}
          />
        ),
      })
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  };

  const onDelete = (id) => {
    const url = "http://localhost:3500/constructions/";
    axios.delete(url + id).then((res) => {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Success!"
            content="Delete Successful!"
            scheme={Cinnamon.Crisp.SCHEME_GREEN}
            icon={<CheckCircleOutlineIcon />}
          />
        ),
      });
      onReload();
    });
  };

  const SubmitForm = async (newRow, oldRow) => {
    if (
      validation(
        newRow["itemName"],
        newRow["quantity"],
        newRow["supplier"],
        newRow["site"]
      )
    ) {
      const url = "http://localhost:3500/constructions/" + oldRow["_id"];
      const data = JSON.stringify({
        itemName: newRow["itemName"],
        quantity: newRow["quantity"],
        supplier: newRow["supplier"],
        site: newRow["site"],
        status: oldRow["status"],
        description: oldRow["description"],
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          onReload();
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Success!"
                content="Update Successful!"
                scheme={Cinnamon.Crisp.SCHEME_GREEN}
                icon={<CheckCircleOutlineIcon />}
              />
            ),
          });
        });
    }
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
        editable={{
          onRowUpdate: (newRow, oldRow) =>
            new Promise(async (resolve, reject) => {
              SubmitForm(newRow, oldRow);
              console.log(oldRow._id);
              setTimeout(() => resolve(), 300);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              console.log(selectedRow);
              onDelete(selectedRow.service_id);
              setTimeout(() => resolve(), 300);
            }),
        }}
      />
      <br />
    </div>
  );
}

export default Construction;

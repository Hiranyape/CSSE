import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  Paper,
  TextField,
  InputAdornment,
  TableContainer
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAuthContext } from "../hooks/useAuthContext";

const SupplierDashboard = () => {
  const { user } = useAuthContext();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [original, setOriginal] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/purchaseOrder/all")
      .then((response) => {
        setOrders(response.data);
        setOriginal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const searchWord = event.target.value;

    if (searchWord === "") {
      setOrders(original);
    } else {
      const newFilter = orders.filter((order) => {
        return order.title.toLowerCase().includes(searchWord.toLowerCase());
      });
      setOrders(newFilter);
    }
  };

  return (
    <Box>
      {user && user.email ? (
        <Typography variant="h6">Welcome {user.email}</Typography>
      ) : (
        <Typography variant="h6">Welcome</Typography>
      )}
      <Box
        sx={{
          overflowX: "hidden",
          marginTop: "20px",
          width: "100%",
        }}
        display="flex"
        justifyContent="flex-start"
        alignItems="left"
        flexDirection={"column"}
      >
        <Typography
          sx={{ padding: "1rem 0", color: "#1C2833", textAlign: "left" }}
          variant="h4"
        >
          Recent Deliveries
        </Typography>
        <Divider sx={{ backgroundColor: "white", borderBottomWidth: "2px" }} />
        <TextField
          onChange={handleSearch}
          value={search}
          sx={{ width: 700, marginTop: "30px", marginBottom: "20px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ backgroundColor: "blue" }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer component={Paper} sx={{ width: "100%" }} elevation={0}>
          <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Name
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Company Details
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((u) => (
                  <TableRow
                    key={u._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" align="left">
                      {u.items &&
                        u.items.map((item, index) => (
                          <Card key={index} style={{ marginBottom: '10px' }}>
                            <CardContent>
                              <Typography variant="body1">
                                <strong>Product:</strong> {item.product && item.product.name}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Quantity:</strong> {item.product && item.quantity}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))
                      }
                    </TableCell>
                    <TableCell>
                      {u.companyDetails}
                    </TableCell>
                    <TableCell>
                      {u.supplierstatus}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SupplierDashboard;


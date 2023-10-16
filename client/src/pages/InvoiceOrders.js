import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  Divider,
  TableRow,
  Paper,
  Button,
  InputAdornment,
  TextField

} from "@mui/material";
import Box from "@mui/material/Box";
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import ReactToPrint from "react-to-print";
import { useRef } from "react";

const Invoice = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [original, setOriginal] = useState("");
  const componentRef = useRef();

  const [expandedRows, setExpandedRows] = useState([]);

  const handleStatusClick = (orderId) => {
    if (expandedRows.includes(orderId)) {
      setExpandedRows(expandedRows.filter((id) => id !== orderId));
    } else {
      setExpandedRows([...expandedRows, orderId]);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/purchaseOrder/all")
      .then((response) => {
        const filteredOrders = response.data.filter(
          (order) => order.supplierstatus === "Approve"
        );
        setOrders(filteredOrders);
        setOriginal(filteredOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
const PrintableInvoice = React.forwardRef(({ invoice }, ref) => {
    return (
      <Card
        sx={{
          padding: 2,
          border: "1px solid #ccc",
          maxWidth: "400px",
          margin: "0 auto",
          backgroundColor: "#fff",
        }}
        ref={ref}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Invoice
          </Typography>
          <Typography>
            <strong>Invoice ID:</strong> {invoice._id}
          </Typography>
          <Typography>
            <strong>Customer Name:</strong> {invoice.companyDetails}
          </Typography>
          <Typography>
            <strong>Invoice Date:</strong> {invoice.requiredByDate}
          </Typography>
          <div>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Invoice Items
            </Typography>
            <Table
              sx={{
                border: "1px solid #ccc",
                width: "100%",
              }}
            >
              <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell sx={{ border: "1px solid #ccc", padding: 1 }}>
                    Product
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", padding: 1 }}>
                    Quantity
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", padding: 1 }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", padding: 1 }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.items &&
                  invoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ border: "1px solid #ccc", padding: 1 }}>
                        {item.product.name}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ccc", padding: 1 }}>
                        {item.quantity}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ccc", padding: 1 }}>
                        ${item.agreedPrice}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #ccc", padding: 1 }}>
                        ${item.quantity * item.agreedPrice}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  });

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const searchWord = event.target.value;

    if (searchWord === "") {
      setOrders(original);
    } else {
      const newFilter = orders.filter((order) => {
        return order.companyDetail.toLowerCase().includes(searchWord.toLowerCase());
      });
      setOrders(newFilter);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          overflowX: 'hidden',
          marginTop: '20px',
          width: '100%',
        }}
        display="flex"
        justifyContent="flex-start"
        alignItems="left"
        flexDirection={'column'}
      >
        <Typography
          sx={{ padding: '1rem 0', color: '#1C2833', textAlign: 'left' }}
          variant="h4"
        >
          Invoice Orders 
        </Typography>
        <Divider
          sx={{ backgroundColor: 'white', borderBottomWidth: '2px' }}
        />
        <TextField
          onChange={handleSearch}
          value={search}
          sx={{ width: 700, marginTop: '30px', marginBottom: '20px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ backgroundColor: 'blue' }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer component={Paper} sx={{ width: '100%' }} elevation={0}>
          <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                  Request ID
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                  Company Details
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                  Items
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((u) => (
                  <React.Fragment key={u._id}>
                    <TableRow>
                      <TableCell>{u._id}</TableCell>
                      <TableCell>{u.companyDetails}</TableCell>
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
                          ))}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleStatusClick(u._id)}>
                          {expandedRows.includes(u._id) ? 'Hide Details' : 'Show Details'}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedRows.includes(u._id) && (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <TableContainer component={Paper} sx={{ width: '100%' }} elevation={0}>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    Items
                                  </TableCell>
                                  <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    Total
                                  </TableCell>
                                  <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    Action
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
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
                                      ))}
                                  </TableCell>
                                  <TableCell>
                                    {u.items && (
                                      <Typography variant="body1">
                                        <strong>Total Price:</strong> {u.items.reduce((total, item) => total + (item.product ? (item.agreedPrice * item.quantity) : 0), 0)}
                                      </Typography>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                  <ReactToPrint
                                    trigger={() => (
                                        <Button
                                        variant="contained"
                                        sx={{
                                            color: "white",
                                            backgroundColor: "rgba(0, 117, 255, 0.73)",
                                            width: "30ch",
                                            padding: "1rem",
                                            fontWeight: "bold",
                                            "&:hover": {
                                            background: "rgba(0, 117, 255, 0.73)",
                                            boxShadow: "none",
                                            },
                                            boxShadow: "none",
                                            width: 200,
                                            margin: "auto",
                                            marginTop: 5,
                                        }}
                                        >
                                        Export To PDF
                                        </Button>
                                    )}
                                    
                                    content={() => componentRef.current} 
                                    />
                                    <div style={{ display: "none" }}>
                                      <PrintableInvoice
                                        ref={componentRef}
                                        invoice={u} 
                                      />
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                          </TableContainer>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};


export default Invoice;

import React from "react";
import BoxWrapper from "../components/BoxWrapper";
import axios from "axios"
import { useState,useEffect } from "react"
import { Grid, TextField,Card, CardContent, Typography,Table,TableCell,TableBody,TableContainer,TableHead,Divider,TableRow,Paper,Button,IconButton, selectClasses,InputAdornment } from "@mui/material"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useAuthContext } from "../hooks/useAuthContext";

const SupplierOrders=()=>{
    
    const {user} =useAuthContext()

    const[orders,setOrders]=useState([])
    const[search,setSearch] = useState("")
    const[original,setOriginal] = useState([])
    const[message,setMessage]=useState("");
    const[quantity,setQuantity]=useState("");
    const[price,setPrice]= useState("")
    const[substitude,setSubstitude]=useState("");

    const [expandedRows, setExpandedRows] = useState([]);

    const handleStatusClick = (orderId) => {
    if (expandedRows.includes(orderId)) {
    setExpandedRows(expandedRows.filter((id) => id !== orderId));
    } else {
    setExpandedRows([...expandedRows, orderId]);
    }
    };

    const handleCancelEdit = (orderId) => {
        // Find the order with the given ID and set isEditing to false
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            return { ...order, isEditing: false };
          }
          return order;
        });
        setOrders(updatedOrders);
      };

      const handleSaveChanges = (orderId) => {
        // Define an array to store the updated items
        const updatedItems = [];
      
        // Find the order with the given ID
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            // Update the items with the new quantity and price
            const updatedOrderItems = order.items.map((item) => {
              return {
                ...item,
                quantity: quantity, // Use the value from your state
                agreedPrice: price, // Use the value from your state
              };
            });
      
            // Push the updated items to the 'updatedItems' array
            updatedItems.push(...updatedOrderItems);
      
            // Set isEditing to false
            return {
              ...order,
              items: updatedOrderItems,
              isEditing: false,
            };
          }
          return order;
        });
      
        // Update the state with the updated orders
        setOrders(updatedOrders);
      
        // You can optionally send the changes to the server here using axios
        axios
          .put(`http://localhost:5000/purchaseOrder/${orderId}/edit`, {
            items: updatedItems, // Send the updated items to the server
          })
          .then((response) => {
            console.log(`Order changes saved successfully`);
          })
          .catch((error) => {
            console.error(`Error saving order changes:`, error);
          });
      };
      
      

     

      const handleEditClick = (orderId) => {
        // Find the order with the given ID and set isEditing to true
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            return { ...order, isEditing: true };
          }
          return order;
        });
        setOrders(updatedOrders);
      };
    
    
    
    useEffect(() => {
        axios.get("http://localhost:5000/purchaseOrder/all")
            .then(response => {
                const filteredOrders = response.data.filter(order => order.supplierstatus !== "Approve");
                setOrders(filteredOrders);
                setOriginal(filteredOrders);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleOrderAction = (orderId, action) => {
        axios
          .put(`http://localhost:5000/purchaseOrder/${orderId}/edit`,
          {supplierstatus:action,message:message})
          .then((response) => {
            console.log(`Order ${action}d successfully`);
          })
          .catch((error) => {
            console.error(`Error ${action}ing order:`, error);
          });
      };

    const handleSearch=(event)=>{
        setSearch(event.target.value)
        const searchWord = event.target.value
       

        if(searchWord===""){
            setOrders(original)
        }
        else{
            const newFilter = orders.filter((order)=>{
                return orders.companyDetail.toLowerCase().includes(searchWord.toLowerCase())
            })
            setOrders(newFilter) 
        }
        
        
    }
    
    return (
        <Box>
          {user && user.email ? (
            <Typography variant="h6">Welcome {user.email}</Typography>
          ) : (
            <Typography variant="h6">Welcome</Typography>
          )}
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
              Purchase Orders
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
                                    Changes
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    Message
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                    Status
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
                                        <div>
                                        {u.items &&
                                        u.items.map((item, index) => (
                                        <form>
                                        <TextField
                                            label="New Quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                        <TextField
                                            label="New Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <Button
                                        onClick={() => handleSaveChanges(u._id)}
                                        sx={{
                                            marginTop:"10px",
                                            backgroundColor: "#2196F3", 
                                            color: "#FFF",              
                                            padding: "5px 20px",       
                                            fontWeight: "bold",         
                                            borderRadius: "5px",        
                                            boxShadow: "none",          
                                            "&:hover": {
                                            backgroundColor: "#1565C0", 
                                            },
                                        }}
                                        >
                                        Save Changes
                                        </Button>

                                        </form>
                                        ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                        id="outlined-multiline-flexible"
                                        label="Message"
                                        multiline
                                        rows={4}
                                        value={u.message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
  <Button
    onClick={() => handleOrderAction(u._id, "Wait")}
    sx={{ backgroundColor: "#FFA000", color: "#FFF", margin: "5px" }}
  >
    Wait
  </Button>
  <Button
    onClick={() => handleOrderAction(u._id, "Approve")}
    sx={{ backgroundColor: "#4CAF50", color: "#FFF", margin: "5px" }}
  >
    Approve
  </Button>
  <Button
    onClick={() => handleOrderAction(u._id, "Partial Approve")}
    sx={{ backgroundColor: "#2196F3", color: "#FFF", margin: "5px" }}
  >
    Partial Approve
  </Button>
  <Button
    onClick={() => handleOrderAction(u._id, "Decline")}
    sx={{ backgroundColor: "#F44336", color: "#FFF", margin: "5px" }}
  >
    Decline
  </Button>
  <Button
    onClick={() => handleOrderAction(u._id, "Return")}
    sx={{ backgroundColor: "#E91E63", color: "#FFF", margin: "5px" }}
  >
    Return
  </Button>
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
}

export default SupplierOrders;
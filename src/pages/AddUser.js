import React,{useState} from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Button from '@material-ui/core/Button';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { addUser } from './../redux/action';
 const useStyles=makeStyles((theme)=>({
    root:{
      marginTop:100,
    }
 }))
const AddUser = () => {
    const classes=useStyles();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [state,setState]=useState({
      name:"",
      email:"",
      contact:"",
      address:""
    })

    const [error,setError]=useState("");
    const {name,email,contact,address}=state;

const handleChange=(e)=>{
let {name,value}=e.target;
setState({...state,[name]:value})
}

const handleSubmit=(e)=>{
e.preventDefault();
if(!name || !email || !contact || !address){
  setError("Please input the all input fields");
}
else{
dispatch(addUser(state));
navigate('/');
setError("");
}
}
  return (
    <div>
<Button 
      style={{width:"100px",marginTop:"20px"}}
      variant="contained"
      color="secondary"
      onClick={()=>navigate('/')}
      >Go Back</Button>
      {error && <h3 style={{color:"red"}}>{error}</h3>}
       <Box
       className={classes.root}
      component="form"
  
      sx={{
        
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h2 style={{margin:"auto"}} >Add User</h2>

    <TextField 
    onChange={handleChange}
    id="standard-basic"
    name="name"
    label="Name" value={name} type="text"/>
    <br/>
    <TextField 
     onChange={handleChange}
     name="email"
    id="standard-basic" label="Email"  value={email} type="email"/>
    <br/>
    <TextField 
     onChange={handleChange}
     name="contact"
    id="standard-basic" label="Contact" value={contact} type="number"/>
    <br/>
      <TextField 
       name="address"
       onChange={handleChange}
      id="standard-basic" label="Address" value={address} type="text" />
      <br/>
      <Button 
      style={{width:"100px"}}
      variant="contained"
      color="primary"
      type="submit"
      >Submit</Button>

    </Box>
    </div>
  )
}

export default AddUser

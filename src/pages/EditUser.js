import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useNavigate,useParams} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addUser, getSingleUser, updateUser } from './../redux/action';
 const useStyles=makeStyles((theme)=>({
    root:{
      marginTop:100,
        "& > *":{
            margin:theme.spacing(1),
            width:"45ch",
        }
    }
 }))
const EditUser = () => {
    const classes=useStyles();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    let {id}=useParams();
    const {user} =useSelector(state=>state.data)
    const [state,setState]=useState({
      name:"",
      email:"",
      contact:"",
      address:""
    })

    const [error,setError]=useState("");
    const {name,email,contact,address}=state;

    useEffect(()=>{
        dispatch(getSingleUser(id))
    },[])

    useEffect(()=>{
   if(user){
    setState({...user});
   }
    },[user])

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
dispatch(updateUser(state,id));
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
      <h2 style={{margin:"auto"}} >Edit User</h2>

    <TextField 
    onChange={handleChange}
    id="standard-basic"
    name="name"
    label="Name" value={name || ""} type="text"/>
    <br/>
    <TextField 
     onChange={handleChange}
     name="email"
    id="standard-basic" label="Email"  value={email || ""} type="email"/>
    <br/>
    <TextField 
     onChange={handleChange}
     name="contact"
    id="standard-basic" label="Contact" value={contact || ""} type="number"/>
    <br/>
      <TextField 
       name="address"
       onChange={handleChange}
      id="standard-basic" label="Address" value={address || ""} type="text" />
      <br/>
      <Button 
      style={{width:"100px"}}
      variant="contained"
      color="primary"
      type="submit"
      >Update</Button>

    </Box>
    </div>
  )
}

export default EditUser

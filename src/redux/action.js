import * as types from "./actionType";
import axios from "axios";
const getUsers=(users)=>({
    type:types.GET_USERS,
    payload:users,
})
const userDeleted=()=>({
    type:types.DELETE_USERS
})
const userAdded=()=>({
    type:types.ADD_USER
})

const userUpdated=()=>({
    type:types.UPDATE_USER
})

const getUser=(user)=>({
    type:types.GET_SINGLE_USER,
    payload:user,

})
export const loadUsers=()=>{
    const url="http://localhost:5000/user"
return function (dispatch){
    axios.get(`${url}`).then((resp)=>{
        console.log("resp",resp)
        dispatch(getUsers(resp.data));
    }).catch(error=>console.log(error));
}
}

export const deleteUser=(id)=>{
    const url="http://localhost:5000/user"
return function (dispatch){
    axios.delete(`${url}/${id}`).then((resp)=>{
        console.log("resp",resp)
        dispatch(userDeleted());
        dispatch(loadUsers());
    }).catch(error=>console.log(error));
}
}

export const addUser=(user)=>{
    const url="http://localhost:5000/user"
return function (dispatch){
    axios.post(`${url}`,user).then((resp)=>{
        console.log("resp",resp)
        dispatch(userAdded());
        dispatch(loadUsers());
    }).catch(error=>console.log(error));
}
}

export const getSingleUser=(id)=>{
    const url="http://localhost:5000/user"
return function (dispatch){
    axios.get(`${url}/${id}`).then((resp)=>{
        console.log("resp",resp)
        dispatch(getUser(resp.data));
    }).catch(error=>console.log(error));
}
}

export const updateUser=(user,id)=>{
    const url="http://localhost:5000/user"
return function (dispatch){
    axios.put(`${url}/${id}`,user).then((resp)=>{ //put because we are updating the existing data
        console.log("resp",resp)
        dispatch(userUpdated());
    }).catch(error=>console.log(error));
}
}
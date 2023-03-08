import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/action";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#EEEEEE",
  },
 
}));

const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
});

const Home = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user ?"))
      dispatch(deleteUser(id));
  };
  return (
    <div>
      <div>
        <Button
          onClick={() => navigate("/addUser")}
          variant="contained"
          color="primary"
        >
          Add User
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.contact}</StyledTableCell>
                <StyledTableCell align="right">{user.address}</StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  <div className={classes.buttonStyles}>
                    <ButtonGroup
                      variant="contained"
                      color="primary"
                      area-label="contained primary button group"
                    >
                      <Button
                        style={{ marginRight: "5px" }}
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                      <Button 
                      onClick={()=>{navigate(`/editUser/${user.id}`)}}
                      color="primary">Edit</Button>
                    </ButtonGroup>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;

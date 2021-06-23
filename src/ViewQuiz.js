import { responsiveFontSizes } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const ViewQuiz = () => {
    const [quiz, setQuiz] = useState([])
    const classes = useStyles();

    useEffect(() => {
        const getQuiz=async()=>{
           const res=await fetch("http://localhost:3000/teacher/viewQuiz")
           const data=await res.json()
           console.log("Quiz recieved",data)
           setQuiz(data)
            
        }
        getQuiz()
    }, [])
    return (
        <div className="App">
            <br></br>
            <h1>All Quizzes</h1>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Quiz id</TableCell>
            <TableCell >Quiz Name</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {quiz.length===0?
            <TableCell >No quiz found in db</TableCell>
          :
          <>
          {quiz.map((val,key) => (
            <TableRow key={key}>
              <TableCell >{val._id}</TableCell>
              <TableCell >{val.name}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
          </>
          }
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default ViewQuiz

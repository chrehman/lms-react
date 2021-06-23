import { responsiveFontSizes } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const DeleteQuiz = () => {
    const [quiz, setQuiz] = useState([])
    const classes = useStyles();

    useEffect(() => {
        const getQuiz = async () => {
            const res = await fetch("http://localhost:3000/teacher/viewQuiz")
            const data = await res.json()
            console.log("Quiz recieved", data)
            setQuiz(data)

        }
        getQuiz()
    }, [])

    const delQuiz = async(id) => {
        console.log("Delete", id)
        console.log(quiz[id])
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch("http://localhost:3000/teacher/deleteQuiz/"+quiz[id]._id,requestOptions)
            const data = await res.json()
            console.log("Quiz Deleted", data)
            alert("Quiz deleted sccessfully")
            setQuiz(data)
    }
    return (
        <div className="App">
            <br></br>
            <h1>Delete Quizzes</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Quiz Id</TableCell>
                            <TableCell >Quiz Name</TableCell>
                            <TableCell >Delete Quiz</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quiz.length === 0 ?
                            <TableRow>
                                <TableCell>No Quiz found</TableCell>
                            </TableRow>
                            :
                            <>
                                {quiz.map((val, key) => (
                                    <TableRow key={key}>
                                        <TableCell>{val._id}</TableCell>
                                        <TableCell >{val.name}</TableCell>
                                        <TableCell >
                                            <Button variant="contained" color="primary" >
                                                Delete
                                            </Button>
                                        </TableCell>
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

export default DeleteQuiz

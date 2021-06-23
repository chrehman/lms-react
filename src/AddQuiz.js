import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    app: {
        textAlign:"center",
    },
    button: {
        marginTop: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));



const AddQuiz = () => {
    const classes = useStyles();

    const [qid, setQid] = useState("")
    const [tid, setTid] = useState("")
    const [totalQuestions, setTotalQuestions] = useState(0)

    const [quizName, setQuizName] = useState("")

    const [quizCreated, setQuizCreated] = useState(false)
    const [question, setQuestion] = useState("")
    let [option, setOption] = useState("")
    let [options, setOptions] = useState([])
    const [answer, setAnswer] = useState("")
    let baseUrl = "http://localhost:3000/teacher/";

    const loader = () => {

        var currentUser = JSON.parse(localStorage.getItem("user"));
        // console.log("Current User",currentUser)
        // tid = currentUser._id
        // console.log(tid)
    }
    const createQuiz = () => {
        // console.log("Create")
        if (quizName.length === 0) {
            alert("Please enter quiz name")
            return
        }
        // localStorage.setItem("")
        let quiz = {
            name: quizName,
            teacher: '60c42b452201a71ed829a0d9'
        };
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM0MmI0NTIyMDFhNzFlZDgyOWEwZDkiLCJpYXQiOjE2MjQzNjM3NTUsImV4cCI6MTYyNDM2NzM1NX0.LEu-PGdQAYnqh42UgF1Ku0BlL-Uktc7nUbz70KvAJKE"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            'Authorization': `Bearer ${token}`,
            body: JSON.stringify(quiz)
        };
        fetch(baseUrl + 'createQuiz', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("Create", data)
                console.log(data._id)
                setQid(data._id)
                alert("Quiz created successfully")
                setQuizCreated(true)
                setQuizName('')
            });
    }

    const addOption = () => {
        // console.log("Add")
        options.push(option)
        setOptions(options)
        console.log(options)
        setOption('')
    }

    const addQuestion = () => {
        // console.log("Add QUiz")
        if (question.length === 0) {
            alert("Please enter name of question")
            return
        }
        if (answer.length === 0) {
            alert("Please enter correct option")
            return
        }
        if (options.length === 0) {
            alert("Please add options")
            return
        }
        let quiz = {
            question: question,
            options: options,
            answer: answer
        };
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM0MmI0NTIyMDFhNzFlZDgyOWEwZDkiLCJpYXQiOjE2MjQzNjM3NTUsImV4cCI6MTYyNDM2NzM1NX0.LEu-PGdQAYnqh42UgF1Ku0BlL-Uktc7nUbz70KvAJKE"
        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            'Authorization': `Bearer ${token}`,
            body: JSON.stringify(quiz)
        };
        fetch(baseUrl + 'addQuiz/'+qid, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("Add", data)
                alert("Question Added successfully")
                setTotalQuestions(data.quiz.length)
                setQuestion('')
                setOption('')
                setOptions([])
                setAnswer('')
            });
        
        
        // console.log("DATA",ret)
    }

    const endQuiz = () => {
        // router.navigateByUrl('/viewQuizzes')
    }
    const remOption = (i) => {
        options.splice(i, 1);
    }


    return (
        <div>
            <h1 className={classes.app}>Create quiz</h1>
            {!quizCreated ?
                <div className={classes.app}>
                    <TextField
                        label="Enter Quiz Name"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                    />
                    <br></br>
                    <Button className={classes.button} variant="outlined" color="primary" onClick={createQuiz}>
                        Create Quiz
                    </Button>
                </div> :
                <Grid container spacing={3}>
                    <Grid item xs={6} className={classes.app}>
                    <h3 className={classes.app}>Please fill fields the to add new question in quiz</h3>
                        <TextField
                            className={classes.button}
                            label="Enter Question Name"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        /><br></br>
                        <TextField
                            className={classes.button}
                            label="Enter Option"
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                        /><br></br>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={addOption}>
                            Add option
                        </Button><br></br>
                        <TextField
                            className={classes.button}
                            label="Enter Correct Option"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        /><br></br>
                        <Button className={classes.button} variant="outlined" color="primary" onClick={addQuestion}>
                            Add Question
                        </Button><br></br>
                        <Button className={classes.button} variant="outlined" color="primary">
                            Save Quiz
                        </Button><br></br>
                    </Grid>
                    <Grid item xs={6}>
                    <h2>Total Questions: {totalQuestions}</h2>
                        <h3>Question</h3>
                        <p>{question}</p>
                        <h3>Options</h3>
                        <ul>
                            {options.map((val, ind)=>(
                                <li key={ind}>
                                    {val}
                                </li>
                            ))}
                        </ul>
                        <h3>Correct Option</h3>
                        <p>{answer}</p>


                    </Grid>
                </Grid>


            }
        </div>
    )
}

export default AddQuiz

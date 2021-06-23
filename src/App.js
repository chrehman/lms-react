import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddQuiz from './AddQuiz';
import ViewQuiz from './ViewQuiz';
import DeleteQuiz from './DeleteQuiz';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div >
      <AppBar position="static" className="App">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
          <Link to="/">View Quizzes</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
          <Link to="/createQuiz">Create Quiz</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
          <Link to="/deleteQuiz">Delete Quiz</Link>
          </Typography>
          
        </Toolbar>
      </AppBar>

      <Switch>
          <Route exact path="/">
            <ViewQuiz/>
          </Route>
          <Route path="/createQuiz">
          <AddQuiz/>
          </Route>
          <Route path="/deleteQuiz">
            <DeleteQuiz/>
          </Route>
        </Switch>

    </div>
  );

}

export default App;

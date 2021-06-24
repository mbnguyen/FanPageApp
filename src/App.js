import './App.css';
import { useState, useEffect } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel, CircularProgress } from '@material-ui/core'
import firebase from './firebase';

const title = " Fan Page App";
const theme = createMuiTheme();



function App() {
  
  const [firebaseInitialized, setFirebaseInitialized] =  useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    })
  });

  if (firebaseInitialized !== false) {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Intro/>
          <Screen/>
        </div>
      </MuiThemeProvider>
      
    );
  } else {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Intro/>
          <SlashScreen/>
        </div>
      </MuiThemeProvider>
    );
  }
}

function Intro() {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

function Screen() {
  const [state, setState] = useState("login");

  switch(state) {
    case "login":
      return <LogIn changeState={setState}/>;
    case "admin":
      return <Admin changeState={setState}/>;
    case "user":
      return <User changeState={setState}/>;
  }
}

function SlashScreen() {
  return (
    <div id="loader">
      <CircularProgress/>
    </div>
  );
}


function LogIn(props) {

  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

  const login = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        props.changeState("admin");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  return (
    <div>
      <MuiThemeProvider theme={theme}>
      <form>
          <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
					</FormControl>
          <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
          <Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={login}>
						Sign in
          </Button>
      </form>
      </MuiThemeProvider>
    </div>
  );

}



function Admin(props) {
//   if(!firebase.getCurrentUsername()) {
// 		// not logged in
// 		alert('Please login first')
// 		props.history.replace('/login')
// 		return null
// 	}
  return (
    <div>
    <MuiThemeProvider theme={theme}>
      <CircularProgress/>
      <Typography>What's good?</Typography>
    </MuiThemeProvider>
    </div>
  );
}

function User(props) {

}

function CountDown() {
  const [count, setCount] = useState(10)
  let timeOutID = setTimeout(function() {
    setCount(count - 1);
  }, 1000);
  if (count > 0) {
    return (
      <div>
        {count}
      </div>
    );
  } else {
    clearTimeout(timeOutID);
    return;
  }
  
}

function FirebaseAuth({ isSignedIn, user, providerId }) {
  return (
    <pre style={{ height: 300, overflow: "auto" }}>
        {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
    </pre>
  );
}

export default App;

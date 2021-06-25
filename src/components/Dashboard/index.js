import React, { useEffect, useState } from 'react'
import { Typography, Paper, FormControl, InputLabel, CircularProgress, Button, Input } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'

const styles = theme => ({
	main: {
		width: 400,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	paper: {
		marginTop: 100,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20,
	},
	submit: {
		marginTop: 30,
	},
})

function Dashboard(props) {
	const { classes } = props;

	const [message, setMessage] = useState('');

	const [firstName, setFirstName] = useState('');

	const [date, setDate] = useState(undefined);

	const [isAdmin, setIsAdmin] = useState(false);

	const [messageInput, setMessageInput] = useState('');

	useEffect(() => {
		firebase.getCurrentUserRole().then(role => {
			if (role === 'admin') {
				setIsAdmin(true);
			} else {
				setIsAdmin(false);
			}
		});
		firebase.getMessage(setMessage);
		firebase.getCurrentUserFirstName().then(setFirstName);
		firebase.getCurrentUserDate().then(data => {
			setDate(data.toDate().toString());
		});
	})

	if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.changeState("Login")
		return null
	}



	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Hello { firstName ? firstName :  <CircularProgress size={20} />}
				</Typography>
				<Typography style={{visibility: isAdmin ? 'visible' : 'hidden'}}>
					You're Admin!
				</Typography>
				<Typography component="h1" variant="h5">
					Message: {message ? `"${message}"` : <CircularProgress size={20} />}
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
				<Typography>
					You joined in on {date ? date : <CircularProgress size={20} />}
				</Typography>
				<FormControl margin="normal" required fullWidth style={{visibility: isAdmin ? 'visible' : 'hidden'}}>
					<InputLabel htmlFor="messageInput">Message</InputLabel>
					<Input id="messageInput" name="messageInput" autoComplete="off" autoFocus value={messageInput} onChange={e => setMessageInput(e.target.value)} />
				</FormControl>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={addMessage}
					className={classes.submit}
					style={{visibility: isAdmin ? 'visible' : 'hidden'}}>
					Add Message
          		</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.changeState("HomePage");
	}

	async function addMessage() {
		try {
			await firebase.addMessage(messageInput);
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withStyles(styles)(Dashboard)
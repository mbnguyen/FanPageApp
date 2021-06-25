import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
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

function Admin(props) {
	const { classes } = props

	const [message, setMessage] = useState('')

	useEffect(() => {
		firebase.getMessage().then(setMessage)
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
					Hello { firebase.getCurrentUserFirstName() }
				</Typography>
				<Typography component="h1" variant="h5">
					Your message: {message ? `"${message}"` : <CircularProgress size={20} />}
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
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.changeState("HomePage");
	}
}

export default withStyles(styles)(Admin)
import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

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
	const { classes } = props

	const [quote, setQuote] = useState('')

	useEffect(() => {
		firebase.getCurrentUserQuote().then(setQuote)
	})

	if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
	}



	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Hello { firebase.getCurrentUsername() }
				</Typography>
				<Typography component="h1" variant="h5">
					Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
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
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))
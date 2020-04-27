import React from 'react';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			height: 'calc(100vh - 64px)',
		},
		content: {
			height: '100%',
			overflow: 'scroll',
		},
		textfield: {
			margin: 10,
			width: 'calc(100% - 20px)',
			maxWidth: 400,
		},
		image: {
			height: '100%',
			maxWidth: '100%',
			margin: 'auto',
		},
		image_icon_wrap: {
			marginTop: 10,
			marginLeft: 5,
			marginRight: 5,
		},
		image_icon: {
			width: '100%',
		},
	})
);

function MakeCharacter() {
	const classes = useStyles();
	return (
		<Grid container className={classes.main}>
			<Grid container item xs={12} sm={6} md={6} className={classes.main}>
				<Grid item xs={2} className={classes.content}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
						return (
							<Paper className={classes.image_icon_wrap}>
								<img className={classes.image_icon} src="/images/josei_07_a.png" alt="" />
							</Paper>
						);
					})}
				</Grid>
				<Grid item xs={8} style={{ textAlign: 'center' }} className={classes.image}>
					<img className={classes.image} src="/images/josei_07_b.png" alt="" />
				</Grid>
				<Grid item xs={2} className={classes.content}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v, i) => {
						return (
							<Paper className={classes.image_icon_wrap} elevation={i == 3 ? 4 : 1}>
								<img className={classes.image_icon} src="/images/josei_07_a.png" alt="" />
							</Paper>
						);
					})}
				</Grid>
			</Grid>
			<Grid
				container
				item
				xs={12}
				sm={6}
				md={6}
				alignItems="stretch"
				direction="column"
				style={{ textAlign: 'center' }}
			>
				<Grid item>
					<TextField id="name" label="名前" variant="outlined" className={classes.textfield} />
				</Grid>
				<Grid item>
					<TextField
						id="simpleProf"
						label="ひとこと"
						variant="outlined"
						className={classes.textfield}
					/>
				</Grid>
				<Grid item>
					<TextField
						id="profile"
						label="自己紹介"
						variant="outlined"
						className={classes.textfield}
						rows={4}
						multiline={true}
					/>
				</Grid>
				<Grid item>
					<Button variant="outlined" color="primary" className={classes.textfield}>
						登録
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default MakeCharacter;

import React from 'react';
import { Theme, Grid, Box, Divider, Badge, Typography } from '@material-ui/core';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles'

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      top: 12,
    },
  }),
)(Badge);

const useStyles = makeStyles({
  main: {
    height: 'calc(100vh - 64px)',
  },
  content: {
    height: '100%',
    overflow: 'scroll',
  },
  mailListRow:{
    height: 100,
  },
  image: {
    width: 80,
    height: 80,
  },
});

function MailBox(){
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.main}>
      <Grid item xs={12} sm={3} className={classes.content}>
        {
          [1,2,3,4,5, 6, 7,8,1,9,0].map((v,i)=>{
            return (
              <>
                <Box display="flex" className={classes.mailListRow}>
                  <StyledBadge badgeContent={4} color="primary">
                    <Box style={{margin:'auto'}}><img className={classes.image} src="/images/atobe.jpg"/></Box>
                  </StyledBadge>
                  <Box flexGrow={1} style={{paddingLeft:18}}>
                    <Typography gutterBottom variant="subtitle1">
                      西園寺 日向
                    </Typography>    
                    <Typography gutterBottom variant="subtitle1">
                      <p>もしもし〜</p>
                    </Typography>    
                  </Box>

                </Box>
                <Divider></Divider>
              </>
            )
          })
        }
      </Grid>
      <Grid item xs={12} sm={9} className={classes.content}>
        <div style={{height:2000}}></div>
      </Grid>
    </Grid>
  );
}
export default MailBox;

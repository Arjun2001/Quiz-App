import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DataUsageIcon from '@material-ui/icons/DataUsage';

import {useHistory} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    width: 275,
    height: 325,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function SubCard(props) {
  const history = useHistory();
  const classes = useStyles();

  const contest = () => {
    history.push(`/contest/${props.code}`)
  }

  const dataUsage = () => {
    history.push(`/subjperformance/${props.code}`)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.name.substring(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title = {props.code}
        subheader= {props.name}
      />
      <div className="click-class" onClick={contest}>
      <CardMedia
        className={classes.media}
        image = {props.photo}
        title = {props.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.desc}
        </Typography>
      </CardContent>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <DataUsageIcon onClick = {dataUsage}/>
        </IconButton>
      </CardActions >
    </Card>
  );
}

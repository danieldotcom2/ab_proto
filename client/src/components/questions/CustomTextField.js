import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CloseIcon from '@material-ui/icons/Close'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 700,
    paddingLeft:"24px",
    marginBottom:"5px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color:"darkgray"
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomTextField(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
        <RadioButtonUncheckedIcon style={{color:"rgba(0,0,0,0.26)",marginLeft:"4px"}}/>
      <InputBase
        autoFocus={props.autoFocus}
        className={classes.input}
        placeholder="Enter response option..."
        value={props.value}
        onChange={props.onChange}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      {/* <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton> */}
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="directions">
        <CloseIcon />
      </IconButton>
    </Paper>
  );
}
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import QuestionForm from './QuestionForm';
import QuestionEditor from './QuestionEditor';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {

  }
}));

export default function QuestionTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [label,setLabel] = useState(props.label)
  const [type,setType]=useState(props.type)
  const [questionId,setQuestionId]=useState(props.questionId)
  const [responses,setResponses]=useState([])

  useEffect(()=>{
      setResponses(props.responses)
      setQuestionId(props.questionId)
      console.log("props",props.responses)
  },[props])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("state",responses)

  return (
    <div className={classes.root} style={{backgroundColor:"whitesmoke",boxShadow: "rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 1px 3px 1px",borderRadius:"4px",overflow:"hidden"}}>
      <AppBar position="static" color={"secondary"}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Edit" {...a11yProps(0)} />
          <Tab label="Logic" {...a11yProps(1)} />
          <Tab label="Translations" {...a11yProps(2)}/>
        </Tabs>
      </AppBar>
      <TabPanel style={{padding:"0px"}} classes={{className:classes.tabPanel}} value={value} index={0}>
        <QuestionEditor label={label} type={type} responses={responses} questionId={questionId} acceptChanges={props.acceptChanges}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item three
      </TabPanel>
    </div>
  );
}
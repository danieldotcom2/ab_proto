import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Cookies from 'js-cookie'
import Fade from '@material-ui/core/Fade';
import { Redirect, useParams } from 'react-router';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function NewFormModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState();
    const [newFormName,setNewFormName] = useState("")
    const [creatingForm,setCreatingForm] =useState(false)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameInput = (e) => {
        setNewFormName(e.target.value)
    }

    const handleCreateForm = () => {
        if (newFormName) {
            setCreatingForm(!creatingForm)
        }
    }

    //get subdomain_id for new form
    let {id} = useParams()

    useEffect(() => {
        const createForm = async (form) => {
            const csrfToken = Cookies.get("XSRF-TOKEN")
            const jsonForm = JSON.stringify(form)
            const response = await fetch('/api/forms/create',{
                headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                },
                method:'POST',
                body: {
                    jsonForm
                }
            })
            const data = await response.json();
            console.log(data)
          
      }
      createForm({subdomain_id:id,form_name:newFormName})
    }
  ,[creatingForm])

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Create Form
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">New Form</h2>
            <TextField label="New Form Name" onChange={(e)=>handleNameInput(e)} value={newFormName}></TextField>
            <button onClick={handleCreateForm}>create new form</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ColorPickerGrid from './ColorPickerGrid';
import ColorPickerContext from './ColorPickerContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline:"none"
  },
}));

export default function ColorPickerGridModal() {
  const classes = useStyles();

  const colorPickerContext = useContext(ColorPickerContext)

  return (
    <div>
      <Modal
        className={classes.modal}
        open={colorPickerContext.modalOpen}
        onClose={colorPickerContext.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <div className={classes.paper}>
            <ColorPickerGrid></ColorPickerGrid>
          </div>
      </Modal>
    </div>
  );
}
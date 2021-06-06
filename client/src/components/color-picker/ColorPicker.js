import React, { useState, useEffect, useContext} from 'react'
import chroma from 'chroma-js'
import ColorHexRow from './ColorHexRow'
import ColorPickerContext from './ColorPickerContext'
import ColorPreviews from './ColorPreviews'
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom'
import FormContext from '../FormContext'
import CurrentColorDispaly from './CurrentColorDisplay'
import ColorPickerGrid from './ColorPickerGrid'
import ColorPickerGridModal from './ColorPickerGridModal'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
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


const ColorPicker = (props) => {
    const classes = useStyles();
    const [selected,setSelected] = useState({index:"",colorName:""})
    const [primary,setPrimary] =useState(props.primary ? props.primary : "#FAFAFA")
    const [secondary,setSecondary]=useState(props.secondary ? props.secondary : "#FAFAFA")
    const [activeColorType,setActiveColorType]=useState('primary')
    const [savingForm,setSavingForm] = useState(false)
    const [expanded,setExpanded] = useState(false)
    const [modalOpen,setModalOpen] = useState(false)
    const handleSaveColors = () => {
        setSavingForm(true)
    }

    const handleOpen = () => {
        setModalOpen(true);
    };
    
    const handleClose = () => {
        setModalOpen(false);
    };

    useEffect(()=>{
        if (props.secondary) setSecondary(props.secondary)
        if (props.primary) setPrimary(props.primary)
    },[props])

    const {id} = useParams()

    const formContext = useContext(FormContext)

    useEffect(() => {
        const saveForm = async () => {
            const csrfToken = Cookies.get("XSRF-TOKEN")
            const colorObj = {
                primary_color:primary,
                primary_dark:chroma(primary).darken().hex(),
                primary_light:chroma(primary).darken().hex(),
                secondary_light:chroma(secondary).darken().hex(),
                secondary_dark:chroma(secondary).darken().hex(),
                secondary_color:secondary}
            const jsonForm = JSON.stringify(colorObj)
            const response = await fetch(`/api/forms/update-form-colors/${id}`,{
                headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                },
                method:"PATCH",
                body: jsonForm
            })
            const data = await response.json();
            formContext.setForm(data.form)
            setModalOpen(false)
            setSavingForm(false)
      }
      if (savingForm) {
        saveForm()
      }
    }
    ,[savingForm])
    return (
        <ColorPickerContext.Provider 
            value={{
                modalOpen, 
                handleOpen,
                handleSaveColors,
                selected,
                setSelected,
                primary,
                setPrimary,
                secondary,
                setSecondary,
                activeColorType,
                setActiveColorType,
                handleClose
            }}>
                    <CurrentColorDispaly></CurrentColorDispaly>
                    <div>
                        <Modal
                            className={classes.modal}
                            open={modalOpen}
                            onClose={handleClose}
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
        </ColorPickerContext.Provider>
    )
}

export default ColorPicker;
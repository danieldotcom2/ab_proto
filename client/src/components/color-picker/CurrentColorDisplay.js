import React, { useContext } from 'react'
import FormContext from '../FormContext'
import Radium from 'radium'
import ColorPickerContext from './ColorPickerContext'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    display:"flex",
    flexDirection:"row",
    borderRadius:"4px",
    cursor:"pointer",
    alignItems:"center",
    transition:".2s",
    margin:"3px",
    justifyContent:"center",
    padding:"10px",
    transition:"border 280ms  cubic-bezier(.4,0,.2,1) ,box-shadow 280ms cubic-bezier(.4,0,.2,1),background-color 280ms cubic-bezier(.4,0,.2,1)",
    // boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    backgroundColor:"white",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        backgroundColor:"whitesmoke",
        // boxShadow:"0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",

        // transform:"scale(1.02)",
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}

const RadiumCurrentColorDisplay = (porps) => {
    const formContext = useContext(FormContext)
    const colorPickerContext = useContext(ColorPickerContext)
    return (
        <div style={buttonStyle} onClick={colorPickerContext.handleOpen}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <ColorLensOutlinedIcon style={{height:"38px",width:"38px",color:"darkgray"}}></ColorLensOutlinedIcon>
                {/* <span style={{marginLeft:"4px"}}>Form Colors</span> */}
            </div>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",marginLeft:"8px"}}>
                <span style={{fontFamily:"Roboto",fontSize:"14px"}}>Primary - </span>
                <div style={{height:"32px",width:"32px",borderRadius:"50%",backgroundColor:formContext.form.custom_color_primary,marginLeft:"8px"}}>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",marginLeft:"8px"}}>
                <span style={{fontFamily:"Roboto",fontSize:"14px"}}>Secondary - </span>
                <div style={{height:"32px",width:"32px",borderRadius:"50%",backgroundColor:formContext.form.custom_color_secondary,marginLeft:"8px"}}>   
                </div>
            </div>
            </div>
        </div>
    )
}

const CurrentColorDisplay= Radium(RadiumCurrentColorDisplay);

export default CurrentColorDisplay
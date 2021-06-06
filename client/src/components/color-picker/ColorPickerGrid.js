import React, { useState, useEffect, useContext} from 'react'
import chroma from 'chroma-js'
import ColorHexRow from './ColorHexRow'
import ColorPickerContext from './ColorPickerContext'
import ColorPreviews from './ColorPreviews'
import { makeStyles } from '@material-ui/core/styles';
import PaletteIcon from '@material-ui/icons/Palette';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core'
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom'
import FormContext from '../FormContext'
import CurrentColorDispaly from './CurrentColorDisplay'
import palette from './palette'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

const ColorPickerGrid = (props) => {
    const colorPickerContext = useContext(ColorPickerContext)
    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"flex-end"}}>
                <Button onClick={colorPickerContext.handleSaveColors} style={{marginBottom:"10px"}} variant={"outlined"}>Save Form Colors</Button>
                <Button onClick={colorPickerContext.handleClose} style={{marginBottom:"10px",marginLeft:"8px"}} variant={"outlined"}>Cancel</Button>
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{display:"flex",flexDirection:"column"}}>
                    {palette.map((color,index)=>{
                        return (
                            <ColorHexRow colorName={color.name} hexes={color.hexes}></ColorHexRow>
                        )
                    })}
                </div>
                <ColorPreviews></ColorPreviews>
            </div>
        </div>
    )
}

export default ColorPickerGrid;
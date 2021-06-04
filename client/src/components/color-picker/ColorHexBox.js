import React, {useState,useEffect, useContext} from 'react'
import ColorPickerContext from './ColorPickerContext'
import CheckIcon from '@material-ui/icons/Check';

const ColorHexBox = (props) => {
    const [hex,setHex] = useState(props.hex)
    if (hex !== props.hex) setHex(props.hex)
    const [colorName,setColorName] = useState(props.colorName)
    if (colorName !== props.colorName) setColorName(props.colorName)
    const [index,setIndex] = useState(props.index)
    if (index !== props.index) setIndex(props.index)

    const colorContext = useContext(ColorPickerContext)
    
    const handleClick = () => {
        if (colorContext.activeColorType === "primary") colorContext.setPrimary(hex)
        if (colorContext.activeColorType === "secondary") colorContext.setSecondary(hex)
        colorContext.setSelected({index,colorName})
    }

    return (
        <div 
            className={"hex-box"} 
            onClick={handleClick}
            style={{
                height:"32px",
                minWidth:"32px",
                backgroundColor:hex,
                display:"flex",
                borderRadius:colorContext.selected.index === index && colorContext.selected.colorName === colorName ? "50%" : ""
            }}>
            {
                colorContext.selected.index === index && colorContext.selected.colorName === colorName
                ?
                <CheckIcon style={{margin:"auto", color:"white"}}></CheckIcon>
                :
                <></>
            }
        </div>
    )
}

export default ColorHexBox
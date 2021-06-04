import chroma from 'chroma-js';
import React, { useContext } from 'react'
import ColorPickerContext from './ColorPickerContext';

const PrimaryDisplay = () => {
    const colorContext = useContext(ColorPickerContext)
    const handleClick = () => {
        colorContext.setActiveColorType("primary")
    }

    const getTextColor = (hex) => {
        const whiteContrastScore = chroma.contrast(hex,"#FFFFFF")
        if (whiteContrastScore >= 4.5) {
            return 'white'
        } else {
            return 'black'
        }
    }

    const textColor = getTextColor(colorContext.primary)
    const lighterColor = chroma(colorContext.primary).brighten().hex()
    const lighterTextColor = getTextColor(lighterColor)
    const darkerColor = chroma(colorContext.primary).darken().hex()
    const darkerTextColor = getTextColor(darkerColor)

    return (
        <div 
            onClick={handleClick}
            style={{
                width:"200px",
                height:"350px",
                margin:"5px",
                padding:"16px",
                display:"flex",
                flexDirection:"column",
                boxShadow:colorContext.activeColorType === "primary" ? "0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%)" : ""
            }}>
            <span style={{color:"#616161",fontSize:"16px",padding:"8px"}}>Primary</span>
            <div style={{
                width:"180px",
                border: colorContext.primary === "#FFFFFF" ?  "1px solid grey" : "",
                height:"100px",
                backgroundColor:colorContext.primary ? colorContext.primary : "white",
                margin:"auto",
                marginBottom:"0px",
                padding:"10px"
            }}>
                <span style={{fontFamily:"Roboto",color:textColor,fontWeight:"700",fontSize:"18px",textTransform:"lowercase"}}>{colorContext.primary}</span>
            </div>
            <div style={{display:"flex",flexDirection:"row",marginTop:"0px"}}>
                <div style={{
                    width:"90px",
                    height:"100px",
                    backgroundColor:lighterColor,
                    margin:"auto",
                    marginBottom:"0px",
                    padding:"10px",
                    display:"flex",
                    flexDirection:"column"
                }}>
                    <span style={{fontFamily:"Roboto",color:lighterTextColor,fontSize:"14px"}}>P - Light</span>
                    <span style={{fontFamily:"Roboto",color:lighterTextColor,fontWeight:"700",fontSize:"18px",textTransform:"lowercase"}}>{chroma(colorContext.primary).brighten().hex()}</span>
                </div>
                <div style={{
                    width:"90px",
                    height:"100px",
                    backgroundColor:darkerColor,
                    margin:"auto",
                    marginBottom:"0px",
                    padding:"10px",
                    display:"flex",
                    flexDirection:"column"
                }}>
                    <span style={{fontFamily:"Roboto",color:darkerTextColor,fontSize:"14px"}}>P - Dark</span>
                    <span style={{fontFamily:"Roboto",color:darkerTextColor,fontWeight:"700",fontSize:"18px",textTransform:"lowercase"}}>{chroma(colorContext.primary).darken().hex()}</span>
                </div>
            </div>
        </div>
    )
}

export default PrimaryDisplay;
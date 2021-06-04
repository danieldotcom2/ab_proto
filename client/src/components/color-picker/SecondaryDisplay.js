import chroma from 'chroma-js';
import React, { useContext } from 'react'
import ColorPickerContext from './ColorPickerContext';

const SecondaryDisplay = () => {
    const colorContext = useContext(ColorPickerContext)
    const handleClick = () => {
        colorContext.setActiveColorType("secondary")
    }

    const getTextColor = (hex) => {
        const whiteContrastScore = chroma.contrast(hex,"#FFFFFF")
        if (whiteContrastScore >= 4.5) {
            return 'white'
        } else {
            return 'black'
        }
    }

    const textColor = getTextColor(colorContext.secondary)
    const lighterColor = chroma(colorContext.secondary).brighten().hex()
    const lighterTextColor = getTextColor(lighterColor)
    const darkerColor = chroma(colorContext.secondary).darken().hex()
    const darkerTextColor = getTextColor(darkerColor)

    return (
        <div 
            onClick={handleClick}
            style={{
                width:"200px",
                margin:"5px",
                height:"350px",
                padding:"16px",
                display:"flex",
                flexDirection:"column",
                boxShadow:colorContext.activeColorType === "secondary" ? "0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%)" : ""
            }}>
            <span style={{color:"#616161",fontSize:"16px",padding:"8px"}}>Secondary</span>
            <div style={{
                width:"180px",
                height:"100px",
                backgroundColor:colorContext.secondary ? colorContext.secondary : "white",
                margin:"auto",
                marginBottom:"0px",
                padding:"10px"
            }}>
                <span style={{fontFamily:"Roboto",color:textColor,fontWeight:"700",fontSize:"18px",textTransform:"lowercase"}}>{colorContext.secondary}</span>
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
                    <span style={{fontFamily:"Roboto",color:lighterTextColor,fontSize:"14px"}}>S - Light</span>
                    <span style={{fontFamily:"Roboto",color:lighterTextColor,fontWeight:"700",fontSize:"18px",textTransform:"lowercase"}}>{lighterColor}</span>
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
                    <span style={{fontFamily:"Roboto",color:darkerTextColor,fontSize:"14px"}}>S - Dark</span>
                    <span style={{fontFamily:"Roboto",color:darkerTextColor,fontWeight:"700",fontSize:"18px",textTransform:"lowercase"}}>{darkerColor}</span>
                </div>
            </div>
        </div>
    )
}

export default SecondaryDisplay;
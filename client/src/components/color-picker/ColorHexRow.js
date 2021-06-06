import React, { useEffect,useState } from 'react'
import ColorHexBox from './ColorHexBox'

const ColorHexRow = (props) => {
    const [hexes,setHexes]=useState([])
    const [colorName,setColorName] = useState(props.colorName)
    if (colorName !== props.colorName) setColorName(props.colorName)
    useEffect(()=>{
        setHexes(props.hexes.map((hex,index)=>{
            return {code:hex,index}
        }))
    },[props])
    return (
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",borderTop:"1px solid #E0E0E0"}}>
            <div style={{paddingLeft:"8px",minWidth:"80px",fontSize:"12px",color:"#616161"}}>{colorName}</div>
            {hexes.map(hex=>{
                return (
                    <ColorHexBox hex={hex.code} index={hex.index} colorName={colorName}>
                        <></>
                    </ColorHexBox>
                )
            })}
        </div>
    )
}

export default ColorHexRow;
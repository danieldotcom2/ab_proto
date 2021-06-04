import React from 'react'
import PrimaryDisplay from './PrimaryDisplay';
import SecondaryDisplay from './SecondaryDisplay';

const ColorPreviews = () => {
    return (
        <div style={{display:"flex",flexDirection:"row",backgroundColor:"white"}}>
            <PrimaryDisplay></PrimaryDisplay>
            <SecondaryDisplay></SecondaryDisplay>
        </div>
    )
}

export default ColorPreviews;
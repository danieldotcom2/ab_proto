import React from 'react'
import Radium from 'radium'

const buttonStyle = {
    fontFamily:"Google Sans,Roboto,Arial,sans-serif",
    display:"flex",
    flexDirection:"row",
    borderRadius:"4px",
    cursor:"pointer",
    alignItems:"center",
    transition:".2s",
    border:"1px solid #dadce0",
    margin:"3px",
    transition:"border 280ms  cubic-bezier(.4,0,.2,1) ,box-shadow 280ms cubic-bezier(.4,0,.2,1),background-color 280ms cubic-bezier(.4,0,.2,1)",
    // boxShadow:"rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px",
    // boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    backgroundColor:"white",
    // backgroundImage:"linear-gradient(to bottom, #ff6e7f 0%, white 100%)",
    ':hover':{
        // backgroundColor:"gainsboro",
        boxShadow:"0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)",

        // transform:"scale(1.02)",
        // boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    }
}


const SubdomainButton = (props) => {
    return (
        <div style={buttonStyle}>
            <div style={{
                color:"black",
                justifyContent:"center",
                // borderBottom:"1px solid rgb(232,232,232)",
                alignItems:"center",
                width:"100%",
                fontSize:"14px",
                display:"flex",
                flexDirection:"row",
                fontFamily:"Google Sans,Roboto,Arial,sans-serif",
                letterSpacing:"1px",
                background:"transparent",
                borderTopLeftRadius:"4px",
                borderTopRightRadius:"4px"
                }}>
                {props.subdomain.subdomain}
            </div>
            <div style={{
                width:"100%",
                justifyContent:"center",
                display:"flex",
                flexDirection:"column",
                backgroudColor:"white",
                fontWeight:"lighter",
                alignItems:"center",
                fontSize:"28px",
                color:"black"
            }}>
                    {props.subdomain.id}
            </div>
        </div>
    )
}

const Subdomain = Radium(SubdomainButton);

export default Subdomain
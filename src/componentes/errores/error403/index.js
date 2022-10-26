import React from "react";
import { Result, Button } from 'antd';
import { withRouter } from "react-router";

const Error = (props) => {
    const volver=()=>{
        props.logout?props.logout({ returnTo: window.location.origin }):
        props.history.push("/");      
    }
    const text="Sorry, you are not authorized to access this page.";
    const status="403";
    const title="403";
    return (
        <Result style={props.error?props.error.message==='Failed to fetch'?{paddingTop:'20vh'}:{}:{}}
            status={props.error?props.error.message==='Failed to fetch'?'warning':status:status}
            title={props.error?props.error.message==='Failed to fetch'?'408':title:title}
            subTitle={props.error?props.error.message==='Failed to fetch'?'Fallo en la conexion a internet':text:text}
            extra={<Button type="primary" onClick={()=>volver()}>{props.logout?'logout':props.logeate?'Inicia secion primero':'Back Home'}</Button>}
        />
    );
};
export default withRouter(Error);
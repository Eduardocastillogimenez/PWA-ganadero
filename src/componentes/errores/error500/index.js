import React from "react";
import { Result, Button } from "antd";
import { withRouter } from "react-router";

const Error = (props) => {
    const volver=()=>{
        props.history.push("/");
    }
    const text="Sorry, something went wrong.";
    const status="500";
    const title="500";
    return (
        <Result style={props.error?props.error.message==='Failed to fetch'?{paddingTop:'20vh'}:{}:{}}
            status={props.error?props.error.message==='Failed to fetch'?'warning':status:status}
            title={props.error?props.error.message==='Failed to fetch'?'408':title:title}
            subTitle={props.error?props.error.message==='TypeError: Failed to fetch'?'Fallo en la conexion a internet':text:text}
            extra={<Button onClick={()=>volver()} type="primary">Volver</Button>}
        />
    );
};
export default withRouter(Error);
import React,{useEffect} from "react";
import {Container} from './styles';
//<a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(json))}`} download="data.json">download JSON</a>
import { Offline, Online } from "react-detect-offline";

import { withRouter } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const Login = ({history}) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
 
  useEffect(() => {
    if(isAuthenticated)history.push('/welcome');
  },[isAuthenticated],);
  
 return(
  <>
  <Offline polling={{interval:100000,timeout:90000,url:"https://ipv4.icanhazip.com"}}>
    <Container href='/offline'>
      <h1>Offline</h1>
    </Container>
  </Offline>
  <Online polling={{interval:100000,timeout:90000,url:"https://ipv4.icanhazip.com"}}>
    <Container onClick={() => loginWithRedirect()}>
      <h1>Iniciar sesion</h1>
    </Container>
  </Online>
  </>
)};

export default withRouter(Login);
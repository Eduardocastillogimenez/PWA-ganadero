import React,{useState} from "react";
import {Container} from './styles';

import { withRouter } from "react-router-dom";

import Consulta from './consulta';
import Registro from './registro';
import CIndividual from './cIndividual';
import EliminarA from './eliminarA';
import RParto from './rParto';
import Menu from 'componentes/menu';

// { "express" : { "port" : 5432 }, 
// "postgres": { "db" : "appgestacion", "user" : "postgres", "password" : "jcgl2021", "host" : "localhost" } } 

const ModoOffline = ({history}) => {
  const [ir,setIr] = useState('r');

  return(
    <Container>
      <Menu setIr={setIr}/>
      {ir==='r'?<Registro history={history}/>:
      ir==='c'?<Consulta history={history}/>:
      ir==='e'?<EliminarA history={history}/>:
      ir==='rp'?<RParto history={history}/>:
      <CIndividual history={history}/>}
    </Container>
  )
};

export default withRouter(ModoOffline);
import React,{useState} from "react";

import Menu from './menu';
import Consulta from './consulta';
import CIndividual from './cIndividual';
import NotificationPartos from '../notificacionPartos';

const Usuarios = () => {
    const [ir,setIr] = useState('c');

 return(
    <div>
        <Menu setIr={setIr}/>
        {ir==='c'?<Consulta/>:<CIndividual/>}
        <NotificationPartos usuarios/>
    </div>
 );
};

export default Usuarios;
import React, {useState,useEffect} from "react";
import {Container,Loading} from './styles';

import Cargando from 'componentes/cargando';
import Error from 'componentes/errores/error500';

import { Button,message } from 'antd';
import { CheckOutlined,LoadingOutlined } from '@ant-design/icons';

import { gql,useMutation,useQuery } from '@apollo/client';

const AGREGAR_ROW= gql`
  mutation ($id: String,$fecha: date,$estado: String,$lote: String,$diasgesta: Int,$fechaparto: date,$fechamater: date,$ovrD: String,$ovrI: String,$observacion: String){
    insert_palpaciones(objects:{id: $id,fecha: $fecha,estado: $estado,lote: $lote,diasgesta: $diasgesta,fechaparto: $fechaparto,fechamater: $fechamater,ovrD: $ovrD,ovrI: $ovrI,observacion: $observacion}){
      affected_rows
    }
  }
`;
const CAMBIAR_PALPACION= gql`
  mutation ($id: String,$fecha: date,$estado: String,$lote: String,$diasgesta: Int,$fechaparto: date,$fechamater: date,$ovrD: String,$ovrI: String,$observacion: String){
    update_palpaciones(
            where: {id: {_eq: $id}},
            _set: {
                fecha: $fecha,
                estado: $estado,
                lote: $lote,
                diasgesta: $diasgesta,
                fechaparto: $fechaparto,
                fechamater: $fechamater,
                ovrD: $ovrD,
                ovrI: $ovrI,
                observacion: $observacion
            }
      )
      {
        affected_rows
      }
  }
`;
const LAS_PALPACIONES = gql`
{
  palpaciones(distinct_on: id, order_by: {id: asc,fecha: desc}) {
    fecha
    id
  }
}
`;

const Actualizar = () => {
  const [todos, setTodos] = useState([]);
  const [todosListos, setTodosListos] = useState(0);

  const { loading:loading,error,data,refetch } = useQuery(LAS_PALPACIONES);
  const [agregarRow,{ loading:loadingAgregarRow }] = useMutation(AGREGAR_ROW);
  const [cambiarPalpacion,{loading:loadingCambiarPalpacion}] = useMutation(CAMBIAR_PALPACION);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/palpaciones");
      const jsonData = await response.json();
      setTodos(jsonData.filter(e=>e.enlanube===false));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
      getTodos();
  }, []);

  if (loading) return <Cargando/>;
  if(error)return(<Container>{console.log(error)}<Error error={error}/></Container>);

  const onFinish = async (e) => {
    // creo q cambia el estado de 'enlanube' pero los cambia todos
    try {
        await fetch("http://localhost:3001/palpaciones", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e)
      }).then(() => {
        message.success('Dato guardado localmente');            
      }, (err) => {
        message.error('Algo salio mal .....');
        console.log(err);
      });     
    } catch (err) {
      console.error(err);
    }
  };
  function agregar(e){
    agregarRow({
      variables: {
        id: e.id,
        fecha: e.fechaPalpa,
        estado: e.estado,
        lote: e.lote,
        diasgesta:e.gestacion,
        fechaparto: e.fechaparto,
        fechamater:e.fechamater,
        ovrD:e.ovrD,
        ovrI:e.ovrI,
        observacion:e.observacion
    }}).then(() => {  
        onFinish(e);
        setTodosListos(todosListos+1);
        message.success('Dato subido con exito');               
      }, (err) => {
        if(err.message==='Failed to fetch'){
          console.log('FALLO agregar...', err);
          message.error('Fallo la conexion a internet');
        }else{
          console.log('FALLO agregar...', err);
          message.error('Algo salio mal');
        };
      })
  };
  function editarRow(e){
    cambiarPalpacion({
      variables: {
        id: e.id,
        fecha: e.fechaPalpa,
        estado: e.estado,
        lote: e.lote,
        diasgesta:e.gestacion,
        fechaparto: e.fechaparto,
        fechamater:e.fechamater,
        ovrD:e.ovrD,
        ovrI:e.ovrI,
        observacion:e.observacion
    }}).then(() => {  
        onFinish(e);
        setTodosListos(todosListos+1);
        message.success('Dato editado con exito');               
      }, (err) => {
        if(err.message==='Failed to fetch'){
          console.log('FALLO editarRow...', err);
          message.error('Fallo la conexion a internet');
        }else{
          console.log('FALLO editarRow...', err);
          message.error('Algo salio mal');
        };
      })
  };

  function actualiza(){
    for (let i = 0; i < todos.length; i++) {
      if(data.palpaciones[0]){
        for (let j = 0 ; j < data.palpaciones.length; j++) {
          if(data.palpaciones[j].id===todos[i].id){
            j=data.palpaciones.length;
            editarRow(todos[i]);
          }else{
            agregar(todos[i]);
            j=data.palpaciones.length;
          };
        };
      }else{
        agregar(todos[i]);
      }
    };
    if(todos[0]){
      if(todos.length===todosListos){
        setTodos([]);
      };
    };
  };

 return(
    <Container>
      {loadingAgregarRow||loadingCambiarPalpacion? <Loading><LoadingOutlined />{'  '}Loading</Loading>:''}
      <div>
        {todos[0]?<Button onClick={() => actualiza()} shape="round" type="primary">Subir datos del local a internet</Button>
        :<Button shape="round" type="primary" disabled>Datos al dia<CheckOutlined/></Button>}
      </div>
    </Container>
)};

export default Actualizar;
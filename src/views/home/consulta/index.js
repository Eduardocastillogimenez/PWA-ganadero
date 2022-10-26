import React,{useState,useEffect} from "react";
import {Container} from './styles';

import Cargando from 'componentes/cargando';
import Error from 'componentes/errores/error500';

import { Table,Space,Select,Skeleton } from 'antd';

import { gql,useQuery} from '@apollo/client';

const LAS_PALPACIONES = gql`
query fincaspalpitaciones($codfinca: String,$estado: String) {
  palpaciones(distinct_on: id, order_by: {id: asc,fecha: desc}, where:{animales: {codfinca: {_eq: $codfinca}},estado: {_eq:$estado}}) {
    id
    fecha
    lote
    estado
    diasgesta
    fechaparto
    fechamater
    ovrD
    ovrI
    observacion
    animales{
      ano
      partos_aggregate {
        aggregate {
          count(columns: id)
        }
      }
    }
  }
}
`;

const FINCAS = gql`
{
  fincas{
    nombre
    codfinca
  }
}
`;

const Consulta = () => {
  const [finca,setFinca] = useState(undefined);
  const [estado,setEstado] = useState(undefined);
  const [fecha,setFecha] = useState('todos');
  const [fechaPartos,setFechaPartos] = useState('todos');
  const [fechaMaternidad,setFechaMaternidad] = useState('todos');

  const { Column, ColumnGroup } = Table;
  const { Option } = Select;

  const { loading,error,data } = useQuery(LAS_PALPACIONES, {
    variables: { codfinca: finca,estado:estado }
  });
  const { loading:loadingFinca,error:errorFincas,data:dataFincas } = useQuery(FINCAS);

  useEffect(() => {
    if(dataFincas){
      setFinca(dataFincas.fincas[0].codfinca);
    }
  }, [loadingFinca]);

  if(loading)return(<Cargando/>);
  if(error)return(<Container>{console.log(error)}<Error error={error}/></Container>);
 return(
  <Container>
    <Space align="baseline" wrap style={{textAlign:'center'}}>
      <p style={{fontSize:'20px'}}>Finca:</p>
        {loadingFinca?<Skeleton.Button active='checked' shape='round' />:
        errorFincas?<Skeleton.Image/>:
        dataFincas.fincas[0]?
        <Select labelInValue placeholder="Selecciona finca" defaultValue={finca?{ value: finca }:{ value: dataFincas.fincas[0].codfinca}}
          optionFilterProp="children" onChange={(e)=>setFinca(e.value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          } style={{minWidth:'100px'}}
        >
          {dataFincas.fincas.map(e=>(
            <Option key={e.codfinca} value={e.codfinca}>{e.nombre}</Option>
          ))}
        </Select>:<Select style={{height:'200px'}}/>}   
      <p style={{fontSize:'20px'}}>Estado:</p>
      <Select labelInValue placeholder="Estado" defaultValue={{ value: estado }}
        optionFilterProp="children" onChange={(e)=>setEstado(e.value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } style={{minWidth:'100px'}}
      >
        <Option value='preñada'>Preñada</Option>
        <Option value='vacia'>Vacia</Option>
      </Select>
      <p style={{fontSize:'20px'}}>Fecha Palpacion:</p>
      <Select labelInValue placeholder="Especificar mes" defaultValue={{ value: fecha }}
        optionFilterProp="children" onChange={(e)=>setFecha(e.value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } style={{minWidth:'100px'}}
      >
        <Option value='todos'>Todos</Option>
        <Option value='01'>Enero</Option>
        <Option value='02'>Febrero</Option>
        <Option value='03'>Marzo</Option>
        <Option value='04'>Abril</Option>
        <Option value='05'>Mayo</Option>
        <Option value='06'>Junio</Option>
        <Option value='07'>Julio</Option>
        <Option value='08'>Agosto</Option>
        <Option value='09'>Sectiembre</Option>
        <Option value='10'>Octubre</Option>
        <Option value='11'>Noviembre</Option>
        <Option value='12'>Diciembre</Option>
      </Select>

      <p style={{fontSize:'20px'}}>Fecha Parto:</p>
      <Select labelInValue placeholder="Especificar mes" defaultValue={{ value: fechaPartos }}
        optionFilterProp="children" onChange={(e)=>setFechaPartos(e.value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } style={{minWidth:'100px'}}
      >
        <Option value='todos'>Todos</Option>
        <Option value='01'>Enero</Option>
        <Option value='02'>Febrero</Option>
        <Option value='03'>Marzo</Option>
        <Option value='04'>Abril</Option>
        <Option value='05'>Mayo</Option>
        <Option value='06'>Junio</Option>
        <Option value='07'>Julio</Option>
        <Option value='08'>Agosto</Option>
        <Option value='09'>Sectiembre</Option>
        <Option value='10'>Octubre</Option>
        <Option value='11'>Noviembre</Option>
        <Option value='12'>Diciembre</Option>
      </Select>

      <p style={{fontSize:'20px'}}>Fecha Maternidad:</p>
      <Select labelInValue placeholder="Especificar mes" defaultValue={{ value: fechaMaternidad }}
        optionFilterProp="children" onChange={(e)=>setFechaMaternidad(e.value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } style={{minWidth:'100px'}}
      >
        <Option value='todos'>Todos</Option>
        <Option value='01'>Enero</Option>
        <Option value='02'>Febrero</Option>
        <Option value='03'>Marzo</Option>
        <Option value='04'>Abril</Option>
        <Option value='05'>Mayo</Option>
        <Option value='06'>Junio</Option>
        <Option value='07'>Julio</Option>
        <Option value='08'>Agosto</Option>
        <Option value='09'>Sectiembre</Option>
        <Option value='10'>Octubre</Option>
        <Option value='11'>Noviembre</Option>
        <Option value='12'>Diciembre</Option>
      </Select>
    </Space> 
    <Table dataSource={data.palpaciones[0]?data.palpaciones.filter(e => fecha==='todos' ?e:(e.fecha[5]+e.fecha[6])===fecha).filter(e => fechaPartos==='todos' ?e:(e.fechaparto[5]+e.fechaparto[6])===fechaPartos).filter(e => fechaMaternidad==='todos' ?e:(e.fechamater[5]+e.fechamater[6])===fechaMaternidad).map((e,num)=>{
      return(
        {
          id:e.id,
          ano:e.animales.ano,
          partos: e.animales.partos_aggregate.aggregate.count,
          fecha:e.fecha,
          lote:e.lote,
          estado:e.estado,
          diasgesta:e.diasgesta,
          fechaparto:e.fechaparto,
          fechamater:e.fechamater,
          ovrD:e.ovrD,
          ovrI:e.ovrI,
          observacion:e.observacion,
          key:num
        }
      )}):[{key:'01'}]} pagination={{ position: ['bottomCenter'],defaultPageSize:20 }} scroll={{ x: '100vw' }}
    >
      <Column title="Id" dataIndex="id"/>  
      <Column title="año" dataIndex="ano"/>     
      <Column title="Partos" dataIndex="partos"/>      
      <ColumnGroup title="Palpacion">
        <Column title="Ultima Palpacion" dataIndex="fecha"/>
        <Column title="Estado" dataIndex="estado"/>
      </ColumnGroup>
      <Column title="Lote" dataIndex="lote" />
      <Column title="Ovr Izquierdo" dataIndex="ovrI"/>
      <Column title="Ovr Derecho" dataIndex="ovrD"/>
      <Column title="Observacion" dataIndex="observacion"/>
      <ColumnGroup title="Fechas Aproximadas">
        <Column title="Fecha Parto" dataIndex="fechaparto" />
        <Column title="Fecha Mater" dataIndex="fechamater" />
      </ColumnGroup>
    </Table>
  </Container>
)};

export default Consulta;
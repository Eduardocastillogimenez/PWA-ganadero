import React,{useState} from "react";
import {ContainerC} from './styles';

import Cargando from 'componentes/cargando';
import Error from 'componentes/errores/error500';

import { gql,useQuery} from '@apollo/client';

import { Table,Space,Select} from 'antd';

    const DATOS = gql`
    query palpitaciones($estado: String) {
        palpaciones(distinct_on: id, order_by: {id: asc,fecha: desc}, where:{estado: {_eq:$estado}}) {
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

const Consulta = () => {
    const [estado,setEstado] = useState(undefined);
    const [fecha,setFecha] = useState('todos');
    const [fechaPartos,setFechaPartos] = useState('todos');
    const [fechaMaternidad,setFechaMaternidad] = useState('todos');

    const { Column, ColumnGroup } = Table;
    const { Option } = Select;

    const { loading,error,data } = useQuery(DATOS, {
        variables: { estado:estado }
    });

    if(error)return(<ContainerC><Error error={error}/>{console.log(error)}</ContainerC>);

    return(
    <ContainerC>
        <Space align="baseline" wrap style={{textAlign:'center'}}> 
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
        <Table dataSource={data?data.palpaciones[0]?data.palpaciones.filter(e => fecha==='todos' ?e:(e.fecha[5]+e.fecha[6])===fecha).filter(e => fechaPartos==='todos' ?e:(e.fechaparto[5]+e.fechaparto[6])===fechaPartos).filter(e => fechaMaternidad==='todos' ?e:(e.fechamater[5]+e.fechamater[6])===fechaMaternidad).map((e,num)=>{
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
            )}):undefined:undefined} loading={loading} pagination={{ position: ['bottomCenter'],defaultPageSize:20 }} scroll={{ x: '100vw' }}
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
    </ContainerC>
)};

export default Consulta;
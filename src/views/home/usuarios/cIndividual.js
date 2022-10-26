import React,{useState} from "react";
import {ContainerC} from './styles';

import Cargando from 'componentes/cargando';
import Error from 'componentes/errores/error500';

import { gql,useQuery} from '@apollo/client';

import { Button,Table,Form,Input,Col,Row } from 'antd';

const DATOS = gql`
    query palpitaciones($id: String) {
        palpaciones(where:{id: {_eq:$id}}) {
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
            partos(order_by: {fecha: desc}, limit: 1){
                fecha
                tipo
            }
            partos_aggregate {
                aggregate {
                count(columns: id)
                }
            }
            }
        }
    }
`;


const CIndividual = () => {
    const [id,setId] = useState(undefined);

    const { Column, ColumnGroup } = Table;

    const { loading,error,data } = useQuery(DATOS, {
        variables: { id:id }
    });
    
    if(error)return(<ContainerC><Error error={error}/>{console.log(error)}</ContainerC>);
    if(data)console.log(data);
return(
    <ContainerC>
        <Row justify="center">
            <Col span={24}>
                <h1>Consulta Individual </h1>
            </Col>
            <Col xs={22} md={10}>
                <Form name="consultaAnimal"onFinish={e=>setId(e.id)}layout="vertical" size='large'>
                        <Form.Item name="id" label="Id Animal:" style={{minWidth: '150px'}} rules={[{ required: true, message: 'id necesario!' }]}>
                            <Input placeholder="ID" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Guardar
                            </Button>
                        </Form.Item>
                    </Form>
            </Col>
            <Col span={24}>
                <Table dataSource={data?data.palpaciones[0]?data.palpaciones.map((e,num)=>{

                    const ultimoParto=e.animales.partos[0]?e.animales.partos[0].fecha:undefined;
                    const ultimoPartoTipo=e.animales.partos[0]?e.animales.partos[0].tipo===1?'Normal':'Aborto':undefined;

                    return(
                    {
                        id:e.id,
                        ano:e.animales.ano,
                        partos: e.animales.partos_aggregate.aggregate.count,
                        ultimoParto:ultimoParto,
                        ultimoPartoTipo:ultimoPartoTipo,
                        fecha:e.fecha,
                        lote:e.lote,
                        estado:e.estado,
                        diasgesta:e.diasgesta,
                        fechaparto:e.fechaparto,
                        fechamater:e.fechamater,
                        ovrD:e.ovrD,
                        ovrI:e.ovrI,
                        observacion:e.observacion,
                        key:num,
                    }
                    )}):undefined:undefined} loading={loading}pagination={{ position: ['bottomCenter'],defaultPageSize:20 }} scroll={{ x: '100vw' }}
                >
                    <Column title="Id" dataIndex="id"/>  
                    <Column title="año" dataIndex="ano"/>     
                    <ColumnGroup title="Partos">
                        <Column title="Partos" dataIndex="partos"/>      
                        <Column title="Ultima fecha" dataIndex="ultimoParto"/>   
                        <Column title="Tipo Parto" dataIndex="ultimoPartoTipo"/>     
                    </ColumnGroup>
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
            </Col>
        </Row>
    </ContainerC>
)};
   
export default CIndividual;
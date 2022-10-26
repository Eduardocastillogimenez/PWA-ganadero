import React,{useState,useEffect} from "react";
import {Container,Loading} from './styles';

import { gql,useMutation,useQuery } from '@apollo/client';

import { Button,Form,Input,Select,Col,Row,message,Radio,DatePicker } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AGREGAR_PARTO= gql`
  mutation ($id: String,$fecha: date,$observacion: String,$tipo: smallint){
    insert_partos(objects:{id: $id,fecha: $fecha,observacion: $observacion,tipo: $tipo}){
      affected_rows
    }
  }
`;
const RegistrarParto = () => {
  
  const [agregar,{loading}] = useMutation(AGREGAR_PARTO);

  const [form] = Form.useForm();
  
  const onFinish = values => {
    console.log(values.fechaparto)
    agregar({
      variables: {
        id: values.id,
        fecha: values.fechaparto,
        tipo: values.tipo,
        observacion: values.observacion
    }}).then(() => {  
        form.resetFields();
        message.success('Datos subidos con exito');               
      }, (err) => {
        if(err.message==='Foreign key violation. insert or update on table "partos" violates foreign key constraint "partos_id_fkey"'){
          console.log('FALLO agregar...', err);
          message.error('El animal no fue encontrado, verificar ID');
        }else{
          if(err.message==='Failed to fetch'){
            console.log('FALLO agregar...', err);
            message.error('Fallo la conexion a internet');
          }else{
            console.log('FALLO agregar...', err);
            message.error('Algo salio mal');
          };
        }   
      })
  };
  
 return(
  <Container>
    <Row justify="center">
        <Col span={24}>
            <h1>Registrar Parto </h1>
        </Col>
        <Col xs={20} md={10}>
          {loading? <Loading><LoadingOutlined />{'  '}Loading</Loading>:''}  

          <Form name="agregarPartos"form={form} onFinish={onFinish}layout="vertical" size='large'>
            <Form.Item name="id" label="Id Animal:" style={{minWidth: '150px'}} rules={[{ required: true, message: 'id necesario!' }]}>
                <Input placeholder="ID" />
            </Form.Item>
            <Form.Item name="fechaparto" label="Fecha Parto:" style={{minWidth: '150px'}} rules={[{ required: true, message: 'fecha necesaria!' }]}>
                <DatePicker/>
            </Form.Item>
            <Form.Item name="observacion" label="Observacion:" style={{minWidth: '150px'}}>
                <Input  placeholder="Observacion"/>
            </Form.Item>
            <Form.Item name="tipo" label="Tipo de parto:">
              <Radio.Group>
                  <Radio value="1">Normal</Radio>
                  <Radio value="2">Aborto</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
  </Container>
)
};

export default RegistrarParto;
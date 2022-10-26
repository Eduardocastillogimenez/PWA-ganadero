import React from "react";
import {Container,Loading} from './styles';

import { gql,useMutation } from '@apollo/client';

import { Tabs,Form,Input,Col,Row,message,InputNumber,Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AGREGAR_ANIMAL= gql`
  mutation ($id: String,$codfinca: String,$ano: Int){
    insert_animales(objects: {ano: $ano, codfinca: $codfinca, id: $id}){
      affected_rows
    }
  }
`;
const ELIMINAR_ANIMAL= gql`
  mutation ($id: String){
    delete_animales(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

const EliminarA = () => {
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [agregarAnimal,{loading:loadingAgregarAnimal}] = useMutation(AGREGAR_ANIMAL);
  const [eliminarAnimal,{loading:loadingEliminarAnimal}] = useMutation(ELIMINAR_ANIMAL);

  const onFinish = values => {
    eliminarAnimal({
        variables: {
          id: values.id,
    }}).then(() => {  
            form.resetFields();
            message.success('Datos editados con exito');               
        }, (err) => {
          if(err.message==='Failed to fetch'){
            console.log('FALLO editarRow...', err);
            message.error('Fallo la conexion a internet');
          }else{
            console.log('FALLO editarRow...', err);
            message.error('Algo salio mal');
          };
    });
  };
  const onFinish2 = values => {
    agregarAnimal({
        variables: {
          id: values.id,
          codfinca: values.finca,
          ano: values.ano,
    }}).then(() => {  
            form2.resetFields();
            message.success('Datos editados con exito');               
        }, (err) => {
          if(err.message==='Failed to fetch'){
            console.log('FALLO editarRow...', err);
            message.error('Fallo la conexion a internet');
          }else{
            console.log('FALLO editarRow...', err);
            message.error('Algo salio mal');
          };
    });
  };

 return(
  <Container>
    {loadingEliminarAnimal||loadingAgregarAnimal? <Loading><LoadingOutlined />{'  '}Loading</Loading>:''}
    <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Eliminar Animal" key="1">
            <Row justify="center">
                <Col span={24}>
                    <h1>Eliminar Animal</h1>
                </Col>
                <Col xs={22} md={10}>
                    <Form name="eliminarAnimal"form={form} onFinish={onFinish}layout="vertical" size='large'>
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
            </Row>
        </TabPane>
        <TabPane tab="Agregar Animal" key="2">
            <Row justify="center">
                <Col span={24}>
                    <h1>Agregar Animal</h1>
                </Col>
                <Col xs={22} md={10}>
                    <Form name="agregarAnimal"form={form2} onFinish={onFinish2}layout="vertical" size='large'>
                        <Form.Item name="id" label="Id Animal:" style={{minWidth: '150px'}} rules={[{ required: true, message: 'id necesario!' }]}>
                            <Input placeholder="ID" />
                        </Form.Item>
                        <Form.Item name="ano" label="año:" rules={[{ required: true, message: 'año necesario' }]}>
                            <InputNumber min={2000} max={2023} placeholder="año"/>
                        </Form.Item>
                        <Form.Item name="finca" label="Finca:" rules={[{ required: true, message: 'finca necesaria' }]} style={{minWidth: '150px'}}>
                            <Input  placeholder="Finca"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Guardar
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </TabPane>
    </Tabs>
  </Container>
)};

export default EliminarA;
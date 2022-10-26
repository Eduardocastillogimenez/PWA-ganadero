import React from "react";
import {Container} from './styles';

import { Online } from "react-detect-offline";

import { Button,Form,Input,Radio,Col,Row,message,DatePicker } from 'antd';

const RegistrarParto = ({history}) => {

    const [form] = Form.useForm();
  
    const onFinish = async values => {
        try {
            await fetch("http://localhost:3001/partos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
            }).then(() => {
              form.resetFields();
              message.success('Datos guardados localmente');            
            }, (err) => {
              message.error('Algo salio mal ...');
              console.log(err);
            });     
        } catch (err) {
        console.error(err);
        }
    };
 return(
    <Container>
        <Online polling={{interval:100000,timeout:90000,url:"https://ipv4.icanhazip.com"}}>
            <Button onClick={() => history.push('/welcome')} style={{right:'2%'}} shape="round" type="primary">
                Online: ver datos Online
            </Button>
        </Online>
        <Row justify="center">
            <Col span={24}>
                <h1>Registrar Parto </h1>
            </Col>
            <Col xs={20} md={10}>
                <Form name="agregarPartos"form={form} onFinish={onFinish}layout="vertical" size='large'>
                    <Form.Item name="id" label="Id Animal:" style={{minWidth: '150px'}} rules={[{ required: true, message: 'id necesario!' }]}>
                        <Input placeholder="ID" />
                    </Form.Item>
                    <Form.Item name="fecha" label="Fecha Parto:" style={{minWidth: '150px'}} rules={[{ required: true, message: 'fecha necesaria!' }]}>
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
)};

export default RegistrarParto;
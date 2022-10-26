import React from "react";
import {Container} from './styles';

import { useAuth0 } from "@auth0/auth0-react";

import { Button,Form,Input,Col,Row } from 'antd';

const CIndividual = () => {

 return(
    <Container>
        <Row justify="center">
            <Col span={24}>
                <h1>Consulta Individual </h1>
            </Col>
            <Col xs={22} md={10}>
                <Form layout="vertical" name="form_in_modal">
                    <Form.Item name="title" label="Id Animal"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Ultima fecha de Parto">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="description" label="Ultima Palpacion">
                        <Input type="textarea" />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </Container>
)};

export default CIndividual;
import React from "react";
import {Container} from './styles';

import { Online } from "react-detect-offline";

import { Button,Form,Input,Col,Row } from 'antd';

const EliminarA = ({history}) => {
 return(
    <Container>
        <Online polling={{interval:100000,timeout:90000,url:"https://ipv4.icanhazip.com"}}>
            <Button onClick={() => history.push('/welcome')} style={{right:'2%'}} shape="round" type="primary">
                Online: ver datos Online
            </Button>
        </Online>
        <Row justify="center">
            <Col span={24}>
                <h1>Eliminar Animal </h1>
            </Col>
            <Col xs={22} md={10}>
                <Form layout="vertical" name="form_in_modal">
                    <Form.Item name="title" label="Id Animal"
                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Motivo">
                        <Input type="textarea" />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </Container>
)};

export default EliminarA;
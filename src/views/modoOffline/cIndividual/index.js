import React from "react";
import {Container} from './styles';

import { Online } from "react-detect-offline";

import { Button,Form,Input,Col,Row } from 'antd';

const CIndividual = ({history}) => {
 return(
    <Container>
        <Online polling={{interval:100000,timeout:90000,url:"https://ipv4.icanhazip.com"}}>
            <Button onClick={() => history.push('/welcome')} style={{right:'2%'}} shape="round" type="primary">
                Online: ver datos Online
            </Button>
        </Online>
        <Row justify="center">
            <Col span={16}>
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
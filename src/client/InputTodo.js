import React from "react";

import { Input,Form,Button } from 'antd';

const InputTodo = () => {
  const { Search } = Input;
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const onSubmitForm = async description => {
    //el atributo debe ser igual a la fila q se agregara "description:'...'" si no "e:'...'"
    try {
      await fetch("http://localhost:3001/fincas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({description})
      });;
    } catch (err) {
      console.error(err.message);
    }
  };

  const onFinish = async values => {
    try {
      await fetch("http://localhost:3001/fincas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      form.resetFields();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1>Pern Todo List</h1>
      <Search placeholder="input search text" allowClear enterButton="Search" 
      onSearch={onSubmitForm}size="large"
      />
      <Form {...layout} form={form} name="ingresarDatos"onFinish={onFinish}>
        <Form.Item label="Codfinca" name="codfinca"
          rules={[{ required: true, message: 'Please input your codfinca!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Nombre" name="nombre"
          rules={[{ required: true, message: 'Please input your nombre!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description"
          rules={[{ required: true, message: 'Please input your Description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InputTodo;
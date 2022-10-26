import React, { useEffect, useState } from "react";
import {Container} from './styles';

import { Online } from "react-detect-offline";

import { Button,Table,Space,Select } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const Consulta = (props) => {
  const [todos, setTodos] = useState([]);
  const { Column, ColumnGroup } = Table;
  const { Option } = Select;

  const deleteTodo = async id => {
    try {
      await fetch(`http://localhost:3001/fincas/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/palpaciones");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  function onChangeSelect(value) {
    console.log(`selected ${value}`);
  };

 return(
  <Container>
    <Online polling={{interval:100000,timeout:90000,url:"https://ipv4.icanhazip.com"}}>
      <Button onClick={() => props.history.push('/welcome')} style={{right:'2%'}} shape="round" type="primary">
        Online: ver datos Online
      </Button>
    </Online>
    <Space align="baseline">
      <p style={{fontSize:'20px'}}>Filtrar por:</p>
      <Select labelInValue defaultValue={{ value: 'Finca 1' }}
        placeholder="Selecciona finca"
        optionFilterProp="children"
        onChange={onChangeSelect}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="jack">Finca 1</Option>
        <Option value="lucy">Finca 2</Option>
        <Option value="tom">Finca 3</Option>
      </Select>
    </Space>
    <Table dataSource={todos} pagination={{ position: ['bottomCenter'],defaultPageSize:20 }} scroll={{ x: '100vw' }}>
      <Column title="Description" dataIndex="description" key="description" />  
      <Column title="Codfinca" dataIndex="codfinca" key="codfinca" />    
      <Column title="Id" dataIndex="age" key="age" />        
      <ColumnGroup title="Palpacion">
        <Column title="Fecha" dataIndex="firstName" key="firstNe" />
        <Column title="Estado" dataIndex="lastName" key="lastName" />
      </ColumnGroup>
      <Column title="Lote" dataIndex="lote" key="lote" />
      <Column title="Ovr Izquierdo" dataIndex="address" key="addres" />
      <Column title="Ovr Derecho" dataIndex="address" key="addre" />
      <Column title="Observacion" dataIndex="address" key="addr" />
      <ColumnGroup title="Fechas Aproximadas">
        <Column title="Parto" dataIndex="firstName" key="firstNam" />
        <Column title="Maternidad" dataIndex="firstName" key="firstName" />
      </ColumnGroup>
    </Table>
  </Container>
)};

export default Consulta;
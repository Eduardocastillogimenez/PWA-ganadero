import React, { useEffect, useState } from "react";

import { Table } from 'antd';

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const { Column, ColumnGroup } = Table;
  //delete todo function

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
      const response = await fetch("http://localhost:3001/fincas");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
 
  return (
    <>
      <Table dataSource={todos} pagination={{ position: ['bottomCenter'],defaultPageSize:20 }} >
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
    </>
  );
};

export default ListTodos;

import React,{useState} from "react";
import {Container} from './styles';

import { Menu,Button,Grid } from 'antd';
import { FileSearchOutlined,FormOutlined,MenuUnfoldOutlined,MenuFoldOutlined,DeleteOutlined,EditOutlined,SelectOutlined,GlobalOutlined } from '@ant-design/icons';

const Menuu = (props) => {
  const [collapsed,setCollapsed] = useState(true);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
if(props.home){
  return (
    <Container>
      <Button type="primary" onClick={()=>setCollapsed(!collapsed)}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu mode={screens.lg?"horizontal":"vertical"} theme="dark" defaultSelectedKeys={['1']} style={collapsed?{opacity:'0',marginLeft: '-100vw',position:'absolute'}:{}}>
        <Menu.Item onClick={()=>props.setIr('r')} key="1" icon={<FormOutlined />}>
          Registrar Palpacion
        </Menu.Item>
        <Menu.Item onClick={()=>props.setIr('c')} key="2" icon={<FileSearchOutlined />}>
          Consulta General
        </Menu.Item>
        <Menu.Item onClick={()=>props.setIr('e')} key="3" icon={<DeleteOutlined />}>
          Agregar/Eliminar Animal
        </Menu.Item>
        <Menu.Item onClick={()=>props.setIr('rp')} key="4" icon={<EditOutlined />}>
          Registrar Parto
        </Menu.Item>
        <Menu.Item onClick={()=>props.setIr('ci')} key="5" icon={<SelectOutlined />}>
          Consulta Individual
        </Menu.Item>
        <Menu.Item onClick={()=>props.setIr('a')} key="6" icon={<GlobalOutlined />}>
          Actualizar Datos
        </Menu.Item>
      </Menu>
    </Container>
  )}else{
    return (
      <Container>
        <Button type="primary" onClick={()=>setCollapsed(!collapsed)}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu mode={screens.lg?"horizontal":"vertical"} theme="dark" defaultSelectedKeys={['1']} style={collapsed?{opacity:'0',marginLeft: '-100vw',position:'absolute'}:{}}>
          <Menu.Item onClick={()=>props.setIr('r')} key="1" icon={<FormOutlined />}>
            Registrar Palpacion
          </Menu.Item>
          <Menu.Item onClick={()=>props.setIr('c')} key="2" icon={<FileSearchOutlined />}>
            Consulta General
          </Menu.Item>
          <Menu.Item onClick={()=>props.setIr('e')} key="3" icon={<DeleteOutlined />}>
            Agregar/Eliminar Animal
          </Menu.Item>
          <Menu.Item onClick={()=>props.setIr('rp')} key="4" icon={<EditOutlined />}>
            Registrar Parto
          </Menu.Item>
          <Menu.Item onClick={()=>props.setIr('ci')} key="5" icon={<SelectOutlined />}>
            Consulta Individual
          </Menu.Item>
        </Menu>
      </Container>)
  }
};

export default Menuu;
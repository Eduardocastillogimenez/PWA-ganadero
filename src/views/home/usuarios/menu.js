import React,{useState} from "react";
import {Container} from './styles';

import { Menu,Button,Grid } from 'antd';
import { FileSearchOutlined,MenuUnfoldOutlined,MenuFoldOutlined,SelectOutlined } from '@ant-design/icons';

const Menuu = (props) => {
  const [collapsed,setCollapsed] = useState(true);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Container>
      <Button type="primary" onClick={()=>setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
      </Button>
      <Menu mode={screens.lg?"horizontal":"vertical"} theme="dark" style={collapsed?{opacity:'0',marginLeft: '-100%'}:{}}>
        <Menu.Item onClick={()=>props.setIr('c')} key="1" icon={<FileSearchOutlined />}>
          Consulta General
        </Menu.Item>
        <Menu.Item onClick={()=>props.setIr('ci')} key="2" icon={<SelectOutlined />}>
          Consulta Individual
        </Menu.Item>
      </Menu>
    </Container>
  );
}

export default Menuu;
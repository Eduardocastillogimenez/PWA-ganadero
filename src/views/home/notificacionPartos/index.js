import React,{useState,useEffect} from "react";

import { Button,notification,Drawer,Table } from 'antd';

import { gql,useQuery } from '@apollo/client';

const PALPACIONES = gql`
{
    palpaciones(order_by: {id: asc,fechaparto: asc}){
        fechaparto
        fecha
        id
        animales{
          codfinca
        }
    }
}
`;

const NotificationPartos = ({usuarios}) => {
    const [proximosPartos,setProximosPartos] = useState([]);
    const [visible, setVisible] = useState(false);

    const { loading,error,data } = useQuery(PALPACIONES);
    
    const key = 'aviso';
    const hoy = new Date();

    const openNotification = () => {
        const btn = (
        <Button type="primary" size="small" onClick={() => {setVisible(true);notification.close(key)}}>
            Chequear Identidades
        </Button>
        );
        notification['info']({
        message: 'Proximas a Parto',btn,key,duration:6000,
        description: 'Animales proximos a partos (fecha aproximada segun datos de palpacion)',
        });
    };
    const openCargando = () => {
        notification['warning']({message: 'Loading',key,duration:6000,});
    };
    const openError = () => {
        notification['error']({ message: 'Error',key,});
    };

    function sumarDias(fecha){
        fecha.setDate(fecha.getDate() - 30);
        return fecha;
    };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
      },
      {
        title: 'Finca',
        dataIndex: 'finca',
        key: 'finca',
      },
    ];
    const columns2 = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
      },
    ];

    useEffect(() => {
        if(error)openError();
        if(loading)openCargando();
        if(data){ 
            if(data.palpaciones[0]){
                for (let j = 0 ; j < data.palpaciones.length; j++) {
                    if(hoy < new Date(data.palpaciones[j].fechaparto)){
                        const proximo=sumarDias(new Date(data.palpaciones[j].fechaparto));
                        if(hoy > proximo){
                            proximosPartos.push(data.palpaciones[j]);
                        };
                    };
                    if((j===data.palpaciones.length-1)&&(proximosPartos[0])){openNotification()};
                };
            };
        };
      }, [error,loading,data]);

 return(
    <div><Drawer title="Partos cercanos"visible={visible}placement="right"closable={false}onClose={()=>setVisible(false)}>
      <Table columns={usuarios?columns2:columns} dataSource={proximosPartos.map((e,num)=>( 
        {
          id:e.id,
          fecha:e.fechaparto,
          finca:e.animales.codfinca,
          key:num,
        }
      ))} />
    </Drawer></div>
);};

export default NotificationPartos;
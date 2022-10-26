import React,{useState,useEffect} from 'react';
import {Container,FormDivScroll} from './styles';

import { Online } from "react-detect-offline";

import { Row,Col,Button,Form,Input,Select,Space,DatePicker,InputNumber,Divider,message } from 'antd';
import { MinusCircleOutlined,PlusOutlined } from '@ant-design/icons';

const Registro = ({history}) => {
  const [finca,setFinca] = useState();

  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  
  function sumarDias(fecha,dGestacion,condicon){
    if(condicon==='m'){fecha.setDate(fecha.getDate() + (210-dGestacion));}
    if(condicon==='p'){fecha.setDate(fecha.getDate() + (283-dGestacion));}
    //setParto(fecha);
    return fecha;
  };

  const onFinish = async values => {
    for (let i = 0; i < values.registroPalpacion.length; i++) {
      values.registroPalpacion[i].finca=finca;
      values.registroPalpacion[i].fechaparto=sumarDias((new Date(values.registroPalpacion[i].fechaPalpa.toString())),values.registroPalpacion[i].gestacion,'p');
      values.registroPalpacion[i].fechamater=sumarDias((new Date(values.registroPalpacion[i].fechaPalpa.toString())),values.registroPalpacion[i].gestacion,'m');
      try {
        await fetch("http://localhost:3001/palpaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values.registroPalpacion[i])
        }).then(() => {
          form.resetFields();
          message.success('Datos guardados localmente');            
        }, (err) => {
          message.error('Algo salio mal .....');
          console.log(err);
        });     
      } catch (err) {
        console.error(err);
      }
    };
    
  };

  const FormList = (props) => {
    const [valorP,setValorP] = useState();
    const [valorM,setValorM] = useState();
    const [gestacion,setGestacion] = useState(0);
    const [fecha,setFecha] = useState();
    const [lote,setLote] = useState();

    useEffect(() => {
      if(fecha){
        setValorP(sumarDias(new Date(fecha.toString()),gestacion,'p')); 
        if(lote!=="cria"){
          setValorM(sumarDias((new Date(fecha.toString())),gestacion,'m'));
        }else{
          setValorM('no apto');
        };
      }
    }, [fecha,gestacion,lote]);
    return(
      <Space key={props.field.key}align="baseline">
        <Form.Item {...props.field} name={[props.field.name, 'id']} fieldKey={[props.field.fieldKey, '1']}
          rules={[{ required: true, message: 'Identidad de la vaca' }]} label="Id vaca:" style={{minWidth: '150px'}}
        >
          <Input placeholder="Id vaca"/>
        </Form.Item>
        <Form.Item {...props.field} name={[props.field.name,'ano']} fieldKey={[props.field.fieldKey,'2']}
          rules={[{ required: true, message: 'Missing' }]} label="año:"
        >
          <InputNumber min={2000} max={2023} placeholder="año"/>
        </Form.Item>
        <Form.Item {...props.field} name={[props.field.name,'lote']} fieldKey={[props.field.fieldKey,'3']}
          rules={[{ required: true, message: 'Missing msdmm' }]}  label="Lote:" style={{minWidth: '100px'}}
        >
          <Select placeholder="Lote"allowClear onChange={(e)=>setLote(e)}>
            <Option value="ordeño">Ordeño</Option>
            <Option value="cria">Cria</Option>
            <Option value="escotero">Escotero</Option>
          </Select>
        </Form.Item>
        <Form.Item {...props.field} name={[props.field.name, 'fecha']} fieldKey={[props.field.fieldKey, '4']}
          rules={[{ required: true, message: 'Fecha Palpacion' }]} label="Fecha Palpacion:" style={{minWidth: '150px'}}
        >
          <DatePicker onChange={(e)=>e?setFecha(e.format('YYYY-MM-DD')):''}/>
        </Form.Item>
        <Form.Item {...props.field} name={[props.field.name, 'gestacion']} fieldKey={[props.field.fieldKey, '6']}
         rules={[{ required: true, message: 'Missing dls,v' }]}label="Dias Gestacion:" style={{minWidth: '100px'}}
        >
          <InputNumber min={0} max={200} onChange={(e)=>setGestacion(e)} placeholder="Dias Gestacion"/>
        </Form.Item>
        <div style={{minWidth: '150px'}}>
          <h4>Fecha parto:</h4> <p>{valorP?(valorP.getFullYear().toString()+'-'+(valorP.getMonth()<10?'0':'')+(valorP.getMonth()+1).toString()+'-'+(valorP.getDate()<10?'0':'')+valorP.getDate().toString()).toString():valorP}</p>
        </div>
        <div style={{minWidth: '150px'}}>
          <h4>Fecha Maternidad:</h4> <p>{!valorM||valorM==='no apto'?valorM:(valorM.getFullYear().toString()+'-'+(valorM.getMonth()<10?'0':'')+(valorM.getMonth()+1).toString()+'-'+(valorM.getDate()<10?'0':'')+valorM.getDate().toString()).toString()}</p>
        </div>
        <Form.Item {...props.field}name={[props.field.name, 'estado']}fieldKey={[props.field.fieldKey, '5']}
          rules={[{ required: true, message: 'Missing dls,v' }]}label="Estado:" style={{minWidth: '100px'}}
        >
          <Select placeholder="Estado"allowClear>
            <Option value="preñada">Preñada</Option>
            <Option value="vacia">Vacia</Option>
          </Select>
        </Form.Item>
        <Form.Item {...props.field} name={[props.field.name, 'ovrD']} fieldKey={[props.field.fieldKey, '9']}
          rules={[{ required: false, message: 'Missing dls,v' }]} label="Ovr Derecho:" style={{minWidth: '150px'}}
        >
          <Input placeholder="Ovr Derecho" />
        </Form.Item>
        <Form.Item {...props.field} name={[props.field.name, 'ovrI']} fieldKey={[props.field.fieldKey, '10']}
          rules={[{ required: false, message: 'Missing dls,v' }]} label="Ovr Izquierdo:" style={{minWidth: '150px'}}
        >
          <Input placeholder="Ovr Izquierdo" />
        </Form.Item>
        <Form.Item {...props.field} name={[props.field.name, 'observacion']} fieldKey={[props.field.fieldKey, '11']}
          rules={[{ required: false, message: 'Missing dls,v' }]} label="Observacion" style={{minWidth: '200px'}}
        >
          <TextArea rows={1}/>
        </Form.Item>
        <MinusCircleOutlined onClick={() => props.remove(props.field.name)} />
      </Space>
    );
  };

 return(
  <Container>
    <Online polling={{interval:100000,timeout:90000,url:"https://ipv4.icanhazip.com"}}>
      <Button onClick={() => history.push('/welcome')} style={{right:'2%'}} shape="round" type="primary">
        Online: Subir/Actualizar datos
      </Button>
    </Online>
    <Row align="middle">
      <Col xs={24} sm={16}>
        <h1>Registro de Palpacion</h1>
      </Col>
      <Col xs={24} sm={6}>
        <Space align="baseline">
          <p style={{fontSize:'20px'}}>Finca:</p>
          <Select labelInValue defaultValue={{ value: '01' }}placeholder="Selecciona finca"
            optionFilterProp="children" onChange={(e)=>setFinca(e.value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="02">Finca La Estrella</Option>
            <Option value="01">Finca Mis Hijos</Option>
            <Option value="03">Finca La Estrella</Option>
            <Option value="99">General</Option>
          </Select>
        </Space>
      </Col>
      <Col span={24}>
        <Form name="formRegistroPalpacion" form={form} onFinish={onFinish}layout="vertical" size='large'>
          <Form.List name="registroPalpacion">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <FormDivScroll key={field.key}><Divider>Registro</Divider>
                    <FormList field={field} remove={remove}/>
                  </FormDivScroll>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Adicionar fila para Registro 
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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

export default Registro;
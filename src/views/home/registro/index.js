import React,{useState,useEffect} from 'react';
import {Container,FormDivScroll,Loading} from './styles';

import { gql,useMutation,useQuery } from '@apollo/client';

import Cargando from 'componentes/cargando';

import { Row,Col,Button,Form,Input,Select,Space,DatePicker,InputNumber,Divider,message,Skeleton } from 'antd';
import { MinusCircleOutlined,PlusOutlined,LoadingOutlined } from '@ant-design/icons';

const AGREGAR_ROW= gql`
  mutation ($id: String,$fecha: date,$estado: String,$lote: String,$diasgesta: Int,$fechaparto: date,$fechamater: date,$ovrD: String,$ovrI: String,$observacion: String){
    insert_palpaciones(objects:{id: $id,fecha: $fecha,estado: $estado,lote: $lote,diasgesta: $diasgesta,fechaparto: $fechaparto,fechamater: $fechamater,ovrD: $ovrD,ovrI: $ovrI,observacion: $observacion}){
      affected_rows
    }
  }
`;
const AGREGAR_ANIMAL= gql`
  mutation ($id: String,$codfinca: String,$ano: Int){
    insert_animales(objects: {ano: $ano, codfinca: $codfinca, id: $id}){
      affected_rows
    }
  }
`;
const LAS_PALPACIONES = gql`
query Palpaciones($codfinca: String) {
  palpaciones(distinct_on: id, order_by: {id: asc,fecha: desc}, where:{animales: {codfinca: {_eq: $codfinca}}}) {
    fecha
    id
  }
}
`;
const LOS_ANIMALES = gql`
{
  animales{
    id
  }
}
`;
const FINCAS = gql`
{
  fincas{
    nombre
    codfinca
  }
}
`;
const CAMBIAR_PALPACION= gql`
  mutation ($id: String,$fecha: date,$estado: String,$lote: String,$diasgesta: Int,$fechaparto: date,$fechamater: date,$ovrD: String,$ovrI: String,$observacion: String){
    update_palpaciones(
            where: {id: {_eq: $id}},
            _set: {
                fecha: $fecha,
                estado: $estado,
                lote: $lote,
                diasgesta: $diasgesta,
                fechaparto: $fechaparto,
                fechamater: $fechamater,
                ovrD: $ovrD,
                ovrI: $ovrI,
                observacion: $observacion
            }
      )
      {
        affected_rows
      }
  }
`;

const Registro = ({client}) => {
  const [finca,setFinca] = useState(undefined);

  const [form] = Form.useForm();

  const [cambiarPalpacion,{loading:loadingCambiarPalpacion}] = useMutation(CAMBIAR_PALPACION);
  const [agregarRow,{loading:loadingAgregarRow}] = useMutation(AGREGAR_ROW);
  const [agregarAnimal,{loading:loadingAgregarAnimal}] = useMutation(AGREGAR_ANIMAL);

  const { loading:loadingFinca,error:errorFincas,data:dataFincas } = useQuery(FINCAS);
  const { loading:loading,error,data,refetch } = useQuery(LAS_PALPACIONES, {
    variables: { codfinca: finca }
  });
  const { loading:loadingAni,error:errorAni,data:dataAni } = useQuery(LOS_ANIMALES);

  useEffect(() => {
    if(dataFincas){
      if(dataFincas.fincas[0]){
        setFinca(dataFincas.fincas[0].codfinca);
      }
    } 
  }, [loadingFinca]);

  const { Option } = Select;
  const { TextArea } = Input;

  // const GuardarLocal = () => {
  //   const [enBD,setBD] = useState(false);

  //   async function bd(){
  //     try {
  //       const response = await fetch("http://localhost:3001/palpaciones");
  //       if(response)setBD(true);
  //     } catch (err) {setBD(false)}
  //   };

  //   useEffect(() => {
  //     bd();
  //   }, []);

  //   if(enBD){
  //     return <h1> local</h1>       
  //   }else{
  //     return <h1>Si desea guardarlos tambien de forma local primero corra la base de datos local</h1>       
  //   } 
  // };

  function sumarDias(fecha,dGestacion,condicon){
    if(condicon==='m'){fecha.setDate(fecha.getDate() + (210-dGestacion));}
    if(condicon==='p'){fecha.setDate(fecha.getDate() + (283-dGestacion));}
    //setParto(fecha);
    return fecha;
  };

  const onFinish = values => {
    let num=-1;
    function agregar(e){
      agregarRow({
        variables: {
          id: e.id,
          fecha: e.fechaPalpa,
          estado: e.estado,
          lote: e.lote,
          diasgesta:e.gestacion,
          fechaparto:sumarDias((new Date(e.fechaPalpa.toString())),e.gestacion,'p'),
          fechamater:sumarDias((new Date(e.fechaPalpa.toString())),e.gestacion,'m'),
          ovrD:e.ovrD,
          ovrI:e.ovrI,
          observacion:e.observacion
      }}).then(() => {  
          form.resetFields();
          refetch();
          message.success('Datos subidos con exito');               
        }, (err) => {
          if(err.message==='Failed to fetch'){
            console.log('FALLO agregar...', err);
            message.error('Fallo la conexion a internet');
          }else{
            console.log('FALLO agregar...', err);
            message.error('Algo salio mal');
          };
        })
    };
    function editarRow(e){
      cambiarPalpacion({
        variables: {
          id: e.id,
          fecha: e.fechaPalpa,
          estado: e.estado,
          lote: e.lote,
          diasgesta:e.gestacion,
          fechaparto:sumarDias((new Date(e.fechaPalpa.toString())),e.gestacion,'p'),
          fechamater:sumarDias((new Date(e.fechaPalpa.toString())),e.gestacion,'m'),
          ovrD:e.ovrD,
          ovrI:e.ovrI,
          observacion:e.observacion
      }}).then(() => {  
          form.resetFields();
          refetch();
          message.success('Datos editados con exito');               
        }, (err) => {
          if(err.message==='Failed to fetch'){
            console.log('FALLO editarRow...', err);
            message.error('Fallo la conexion a internet');
          }else{
            console.log('FALLO editarRow...', err);
            message.error('Algo salio mal');
          };
        })
    };
    // function ciclo(e){
    //   if(data.partos[0]){
    //     for (let j = 0 ; j < data.partos.length; j++) {
    //       if(data.partos[j].id===e.id){
    //         if(data.partos[j].fecha < e.fechaPalpa){
    //           for (let i = data.palpaciones.length-1; i >= 0; i--) {
    //             if(e.fechaPalpa > data.palpaciones[i].fecha){
    //               // editar entonces la palpacion
    //               i=data.partos.length;
    //               j=0;
    //               editarRow(e,data.palpaciones[i].fecha);
    //             }else{
    //               if(i===0){
    //                 agregar(e);
    //                 i=data.partos.length;
    //                 j=0;
    //               }
    //             }
    //           }
    //         }else{
    //           agregar(e);
    //           j=0;
    //         }
    //       }else{
    //         for (let i = data.palpaciones.length-1; i >= 0; i--) {
    //           if(data.palpaciones[i].id===e.id){
    //             // editar entonces la palpacion
    //             editarRow(e,data.palpaciones[i].fecha);
    //             i=0;
    //             j=0;
    //           }else{
    //             if(i===0){
    //               agregar(e);
    //               i=0;
    //               j=0;
    //             }
    //           }
    //         }
    //       }
    //    } 
    //   }else{
    //     // si no hay partos
    //   }
    // }; 
    function ciclo(e){
      if(data.palpaciones[0]){
        for (let j = 0 ; j < data.palpaciones.length; j++) {
          if(data.palpaciones[j].id===e.id){
            j=data.palpaciones.length;
            editarRow(e);
          }else{
            agregar(e);
            j=data.palpaciones.length;
          };
        };
      }else{
        agregar(e);
      }
    };

    function agregarAnim(e){
      agregarAnimal({
        variables: {
          id: e.id,
          codfinca: finca,
          ano: e.ano
      }}).then(() => {
          client.resetStore().then(() => {
            ciclo(e);
          }, (err) => {
            console.log('FALLO...', err);
          });  
        }, (err) => {
          if(err.message==='Failed to fetch'){
            console.log('FALLO...', err);
            message.error('Fallo la conexion a internet');
          }else{
            console.log('FALLO...', err);
            message.error('no se pudo ingresar el animal');
          };
        })
    }; 
    if(error||errorAni){
      if(error.message==='Failed to fetch'||errorAni.message==='Failed to fetch'){
        console.log(error,"lkkkk .....",errorAni)
        message.error('Fallo la conexion a internet');
      }else{
        console.log(error,"lkkkk .....",errorAni)
        message.error('no se pudo ingresar el animal');
      };
    }else{
      for (let i = 0; i < values.registroPalpacion.length; i++) {     
        if(dataAni.animales[0]){
          num=-1; 
          for (let j = 0; j < dataAni.animales.length; j++) {
            if(dataAni.animales[j].id===values.registroPalpacion[i].id){
              // ciclo para saber si editar o agregar
              ciclo(values.registroPalpacion[i]);
              num=j;
              j=dataAni.animales.length;
            };
            if((num===-1)&&(j===dataAni.animales.length-1)){
              // no esta el animal asiq se debe agregar
              agregarAnim(values.registroPalpacion[i]);
            };
          }
        }else{
          agregarAnim(values.registroPalpacion[i]);
        }
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
        <Form.Item {...props.field} name={[props.field.name, 'fechaPalpa']} fieldKey={[props.field.fieldKey, '4']}
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
  <>
    <Container>
      {loading||loadingAni?<Cargando/>:
      <Row align="middle">
        {/* <Col span={24}>
          <GuardarLocal/>
        </Col> */}
        {loadingAgregarRow||loadingAgregarAnimal||loadingCambiarPalpacion? <Loading><LoadingOutlined />{'  '}Loading</Loading>:''}
        <Col xs={24} sm={16}>
          <h1>Registro de Palpacion</h1>
        </Col>
        <Col xs={24} sm={6}>
          {loadingFinca?<Space><Skeleton.Button active='checked' shape='round' /></Space>:
            errorFincas?<Space>{errorFincas.networkError==='TypeError: Failed to fetch'?'fallo la conexion':''}<Skeleton.Image/></Space>:
            dataFincas.fincas[0]?
              <Space align="baseline">
                <p style={{fontSize:'20px'}}>Finca:</p>
                <Select labelInValue placeholder="Selecciona finca" defaultValue={finca?{ value: finca }:{value: dataFincas.fincas[0].codfinca}}
                  optionFilterProp="children" onChange={(e)=>setFinca(e.value)}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  } style={{minWidth:'100px'}}
                >
                  {dataFincas.fincas.map(e=>(
                    <Option key={e.codfinca} value={e.codfinca}>{e.nombre}</Option>
                  ))}
                </Select>
              </Space>:<Space style={{height:'200px'}}/>}
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
      </Row>}
    </Container>
  </>
)};

export default Registro;
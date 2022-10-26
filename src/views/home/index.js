// import React,{useState} from "react";
// import {Container} from './styles';

// import { useAuth0 } from "@auth0/auth0-react";

// import Cargando from 'componentes/cargando';
// import Error from 'componentes/errores/error403';
// import Consulta from './consulta';
// import Registro from './registro';
// import Actualizar from './actualizar';
// import CIndividual from './cIndividual';
// import EliminarA from './eliminarA';
// import RParto from './rParto';
// // import NotificationPartos from './notificacionPartos';
// import Menu from 'componentes/menu';
// import Usuarios from './usuarios';

// import { ApolloProvider,ApolloClient,createHttpLink,InMemoryCache,gql,useQuery } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// const BUSCAR_ADMIN = gql`
//   {
//     fincas{
//         codfinca
//     }
//   }
// `;
// const BUSCAR_CLIENTE = gql`
//   {
//     palpaciones{
//         id
//     }
//   }
// `;

// // const Login = (props) => {
// //     const { user } = useAuth0();
// //     const {Content} = Layout;

// //     const AGREGAR_USUARIO= gql`
// //         mutation MyMutation($auth0_id: String,$usuario: String,$correo: String){
// //             insert_clientes(
// //             objects: {auth0_id:$auth0_id,usuario:$usuario,correo:$correo}
// //             )
// //             {
// //                 affected_rows
// //             }
// //         }
// //     `;
// //         const [agregar] = useMutation(AGREGAR_USUARIO); 

// //     const onFinish = () => { 
// //         agregar({
// //         variables: { 
// //             auth0_id: user.sub,
// //             usuario: user.nickname,
// //             correo: user.email,
// //             codfinca: 
// //         }})
// //             .then((response) => {
// //                 console.log('correcto...', response);
// //                 message.success({ content: 'Registro exitoso!', duration: 4});
// //             }, (err) => {
// //                 console.log('FALLO...', err);
// //                 message.error({ content: 'Error...' });
// //             });
// //     };

// // return(
// //     <Layout style={{ height: "100vh" }}>
// //         <Content style={{ padding: "0 50px",marginTop: 40,display: "flex",justifyContent: "center",alignItems: "center",eight: "100vh"}}>
// //                 <Form name="login_lineaFormacion"className="login-form"initialValues={{ remember: true }}onFinish={onFinish}>       
// //                     <Form.Item>
// //                         <Button type="primary" htmlType="submit"style={{background:'#0065adbe'}}>
// //                         Listo
// //                         </Button>
// //                     </Form.Item>
// //                 </Form>
// //         </Content>
// //     </Layout>
// // )
// // };

// const Home = () => {
//     const { isAuthenticated,isLoading,logout,getAccessTokenSilently } = useAuth0();
//     const [accessToken,setAccessTokenn] = useState();

//     if(!isAuthenticated&&!isLoading){
//         <Error logeate/>
//     };

//     const getAccessToken = async () => {
//         try {
//         const token = await getAccessTokenSilently();
//         setAccessTokenn(token);
//         // console.log(token);
//         } catch (e) {
//         console.log(e);
//         }
//     };
//     getAccessToken();

//     const httpLink = createHttpLink({
//         uri: 'https://apuariosjcgl.herokuapp.com/v1/graphql',
//     });
    
//     const authLink = setContext((_, { headers }) => {
//         // get the authentication token from local storage if it exists
//         // return the headers to the context so httpLink can read them 
//         if (accessToken) {
//         return {
//             headers: {
//             ...headers,
//             authorization: accessToken ? `Bearer ${accessToken}` : '.',
//             }
//         }
//         }
//     return headers;  
//     });

//     const client = new ApolloClient({
//         link: authLink.concat(httpLink),
//         cache: new InMemoryCache()
//     });

//     if(isLoading) return <Cargando/>;

//     function VerificarUsuario(){
//         const { loading, error, data } = useQuery(BUSCAR_CLIENTE);

//         if (loading) return <Cargando/>;
//         if (error) return <Container>{console.log(error)}<Error logout={logout} error={error}/></Container>;

//         if(data.palpaciones){ 
//             return(
//                 <Container>
//                     <Usuarios/>
//                 </Container>
//             );
//         }else{
//             return <div>no encontrado...</div>
//         }
//     };

//     function Verificar(){
//         const { loading, data } = useQuery(BUSCAR_ADMIN);
//         const [ir,setIr] = useState('r');

//         if (loading) return <Cargando/>;
 
//         if(data){ 
//             if(data.fincas){ 
//                 return(
//                     <Container>
//                         <Menu setIr={setIr} home/>
//                         {ir==='r'?<Registro client={client}/>:ir==='c'?<Consulta/>:
//                         ir==='a'?<Actualizar/>:ir==='e'?<EliminarA/>:
//                         ir==='rp'?<RParto/>:<CIndividual/>}
//                         {/* <NotificationPartos/> */}
//                     </Container>
//                 );
//             }
//         }else{
//             return <VerificarUsuario/>
//         }
//     }
//  return(
//     <ApolloProvider client={client}>
//         <Verificar/>
//     </ApolloProvider>
// )};

// export default Home;

import React,{useState} from "react";
import {Container} from './styles';

import { useAuth0 } from "@auth0/auth0-react";

import Cargando from 'componentes/cargando';
import Error from 'componentes/errores/error403';
import Consulta from './consulta';
import Registro from './registro';
import Actualizar from './actualizar';
import CIndividual from './cIndividual';
import EliminarA from './eliminarA';
import RParto from './rParto';
import NotificationPartos from './notificacionPartos';
import Menu from 'componentes/menu';
import Usuarios from './usuarios';

import { Button } from 'antd';

import { ApolloProvider,ApolloClient,createHttpLink,InMemoryCache,gql,useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const BUSCAR_ADMIN = gql`
{
    fincas{
        codfinca
    }
}
`;
const BUSCAR_CLIENTE = gql`
  {
    palpaciones{
        id
    }
  }
`;

const Home = () => {
    const { isAuthenticated,isLoading,logout,getAccessTokenSilently } = useAuth0();
    const [accessToken,setAccessTokenn] = useState();

    if(!isAuthenticated&&!isLoading){
        <Error logeate/>
    };

    const getAccessToken = async () => {
        try {
        const token = await getAccessTokenSilently();
        setAccessTokenn(token);
        // console.log(token);
        } catch (e) {
        console.log(e);
        }
    };
    getAccessToken();

    const httpLink = createHttpLink({
        uri: 'https://appusuariosjcgl.herokuapp.com/v1/graphql',
    });
    
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        // return the headers to the context so httpLink can read them 
        if (accessToken) {
        return {
            headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '.',
            }
        }
        }
    return headers;  
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    if(isLoading) return <Cargando/>;

    function VerificarUsuario(){
        const { loading, error, data } = useQuery(BUSCAR_CLIENTE);

        if (loading) return <Cargando/>;
        if (error) return <Container><Error logout={logout} error={error}/></Container>;

        if(data.palpaciones){ 
            return(
                <Container>
                    <Button style={{right:'2%'}} onClick={() => logout({ returnTo: window.location.origin })} shape="round" type="primary">logout</Button>
                    <Usuarios/>
                </Container>
            );
        }else{
            return <div>no encontrado...</div>
        }
    };

    function Verificar(){
        const { loading, data } = useQuery(BUSCAR_ADMIN);
        const [ir,setIr] = useState('r');

        if (loading) return <Cargando/>;
 
        if(data){ 
            if(data.fincas){ 
                return(
                    <Container>
                        <Button style={{right:'2%'}} onClick={() => logout({ returnTo: window.location.origin })} shape="round" type="primary">logout</Button>
                        <Menu setIr={setIr} home/>         
                        {ir==='r'?<Registro client={client}/>:ir==='c'?<Consulta/>:
                        ir==='a'?<Actualizar/>:ir==='e'?<EliminarA/>:
                        ir==='rp'?<RParto/>:<CIndividual/>}
                        <NotificationPartos/>
                    </Container>
                );
            }
        }else{
            return <VerificarUsuario/>
        } 
    }
 return(
    <ApolloProvider client={client}>
        <Verificar/>
    </ApolloProvider>
)};

export default Home;
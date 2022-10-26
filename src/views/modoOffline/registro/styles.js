import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 4%;
    padding-top: 60px;
    text-align: center;
    background: radial-gradient(circle, rgba(237,229,229,1) 0%, rgba(19,177,232,1) 100%);

    >button{
        position: fixed;
        top: 2%;
        z-index: 100;
    }
`;

export const FormDivScroll = styled.div`
    overflow-x: scroll;

    div div div div label{
        font-size: 15px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 4px;
    }
    
    /* Tamaño del scroll */
    &::-webkit-scrollbar {
        height: 10px;
    }
    
    /* Estilos barra (thumb) de scroll */
    &::-webkit-scrollbar-thumb {
        background: linear-gradient(rgba(19,177,232,1),rgb(19, 51, 232));
        border-radius: 4px;
    }
    /* Estilos track de scroll */
    &::-webkit-scrollbar-track {
        background: rgba(237,229,229,1);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(19,177,232,1);
    }  
    &::-webkit-scrollbar-track:hover, 
    &::-webkit-scrollbar-track:active {
        background: white;
    }
`;
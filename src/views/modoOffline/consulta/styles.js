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
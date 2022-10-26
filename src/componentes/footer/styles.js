import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    background:rgba(19,177,232,1);
`;

export const Triangulo = styled.div`
    width: 0;
    height: 0;
    border-right: 100px solid transparent;
    border-top: 100px solid #140f52;
    border-left: 100px solid transparent;
    border-bottom: 100px solid transparent;
    position: absolute;
    text-align: center;
`;
export const Circulo = styled.div`
    width: 100px;
    height: 100px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #00f7ffb0;
    position: absolute;
    margin-top: 50px;
`;
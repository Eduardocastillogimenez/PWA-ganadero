import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 2%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    background: linear-gradient(196deg, rgba(237,229,229,1) 0%, rgba(19,177,232,1) 100%);
    
    >div{
        button{
            width: 80vw;
            height: 50vh;
            font-size: 150%;
            overflow: hidden;
        }
    }
`;

export const Loading = styled.div`
    width: 100px;
    height: auto;
    margin-left: calc(50% - 84px);
    top: 5%;
    padding: 2px;
    text-align: center;
    position: fixed;
    z-index: 1000;
    background: white;
`;
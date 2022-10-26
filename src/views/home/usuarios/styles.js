import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    left: 1%;
    top: 2%;
    z-index: 1000;

    >ul{
        display: inline-block;
        @media screen and (max-width: 992px) 
        {
            display: block;
        }
    }
    >button{
        border: 1px solid rgb(0, 255, 242);
        box-shadow: 1px 1px 5px black;
        display: inline-block;
        height:100%;
        line-height: 30px;
        background: #001529;
        
        @media screen and (max-width: 992px) 
        {
            display: block;
        }
    }
`;

export const ContainerC = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 4%;
    padding-top: 60px;
    text-align: center;
    background: radial-gradient(circle, rgb(239, 255, 9) 0%, rgba(19,177,232,1) 100%);

    .ant-table-thead > tr > th {
        text-align: center;
    }
    .ant-table-tbody > tr > td {
        text-align: center;
    }
`;
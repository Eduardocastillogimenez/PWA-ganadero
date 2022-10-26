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
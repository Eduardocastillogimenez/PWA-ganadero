import styled from 'styled-components';

export const Container = styled.div`
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
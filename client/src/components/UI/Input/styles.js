import styled from "styled-components";

export const Input = styled.input`
    height: ${props => props.height === "title" ? "50px" : "80px"};
    padding: ${props => props.height === "title" ? "0 0 20px 9px" : "0 0 40px 9px"};
    width: 100%;
    background: #F1FAFF;
    border: none;
`

export const InputDiv = styled.div`
    max-width: 700px;
    width: 100%;
`
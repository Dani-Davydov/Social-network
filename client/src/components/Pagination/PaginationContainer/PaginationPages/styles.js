import styled from "styled-components";

export const PaginationPage = styled.button`
    background: none;
    border: none;
    font-size: large;
    cursor: pointer;
    
    &.active {
        color: #FF5A60;
    }
    
//    вообще, если убрать селектор то текущая страница не будет окрашена
`
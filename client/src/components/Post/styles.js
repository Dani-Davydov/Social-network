import styled from "styled-components";

export const Post = styled.div`
    max-width: 210px;
    width: 100%;
    height: 150px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #FFFF;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.3s ease;
    box-sizing: border-box;
    justify-content: space-between;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-color: #A9DEF9;
    }
`

export const Author = styled.div`
    opacity: 0.5;
`

export const TitleAndAuthor = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

export const Title = styled.h3`
    margin: 0;
`
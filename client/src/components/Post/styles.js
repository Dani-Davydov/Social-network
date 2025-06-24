import styled from "styled-components";

export const Post = styled.div`
    max-width: 750px;
    padding: 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: #FFFF;
`

export const CommentActions = styled.div`
    display: flex;
    gap: 50px;
    justify-content: space-between;
    padding-top: 20px;
    border-bottom: 1px solid;
    padding-bottom: 20px;
`

export const WriteComment = styled.div`
    display: flex;
    gap: 15px;
`

export const CommentsButton = styled.button`
    padding: 5px;
    background: ${props => props.color ? props.color : '#F1FAFF'};
    border: 1px solid;
    border-radius: 10px;
    width: 165px;
    height: 30px;
    cursor: pointer;
`

export const CommentsContainer = styled.div`
    padding-top: 20px;
`

export const Comment = styled.div`
    display: flex;
    gap: 15px;
`

export const DeleteAndShowButtons = styled.div`
    display: flex;
    gap: 50px;
`
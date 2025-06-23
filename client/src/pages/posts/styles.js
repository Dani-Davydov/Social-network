import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 45px;
    max-width: 795px;
    width: 100%;
    margin-top: 34px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    background: white;
    padding: 24px;
`

export const InputDiv = styled.div`
    max-width: 700px;
    width: 100%;
`

export const Input = styled.input`
    height: ${props => props.height === "title" ? "50px" : "80px"};
    padding: ${props => props.height === "title" ? "0 0 20px 9px" : "0 0 40px 9px"};
    width: 100%;
    background: #F1FAFF;
    border: none;
`

export const Button = styled.button`
    max-width: 300px;
    width: 100%;
    background: #FFEE93;
    padding: 9px;
    border-radius: 10px;
    cursor: pointer;
`
export const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`
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
    //background: #F1FAFF;
    border: 1px solid;
    border-radius: 10px;
    width: 165px;
    height: 30px;
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
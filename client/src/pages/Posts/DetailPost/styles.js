import styled from "styled-components";

export const Post = styled.div`
    width: 780px;
    padding: 24px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    min-height: auto;
    height: fit-content;
`

export const CommentActions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #e0e0e0;
    margin: 10px 0;
`

export const WriteComment = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
`

export const CommentsButton = styled.button`
    padding: 8px 12px;
    background: ${props => props.color ? props.color : '#F1FAFF'};
    border: 1px solid #d1d5db;
    border-radius: 6px;
    min-width: 120px;
    height: 36px;
    cursor: pointer;
    font-family: sora;
    transition: all 0.2s ease;

    &:hover {
        background: ${props => props.color ? `${props.color}CC` : '#E1F0FF'};
        transform: translateY(-1px);
    }
`

export const CommentsContainer = styled.div`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const Comment = styled.div`
    display: flex;
    gap: 10px;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;

    & > div:first-child {
        font-weight: 500;
    }
`

export const Author = styled.div`
    display: flex;
    justify-content: space-between;
    opacity: 0.7;
    font-size: 15px;
    margin-bottom: 5px;
`

export const AuthorAndDate = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const PostDate = styled.div`
    font-size: 12px;
`

export const PostContent = styled.div`
  line-height: 1.5;
  padding: 10px 0;
`
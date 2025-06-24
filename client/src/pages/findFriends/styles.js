import styled from "styled-components";

export const FindFriends = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    margin: 30px 0 30px 0;
`

export const FriendsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

export const FriendItem = styled.div`
    display: flex;
    height: 50px;
    width: 400px;
    justify-content: space-between;
    background: white;
    padding: 10px;
    border: 1px solid;
    border-radius: 5px;
`

export const AddFriendButton = styled.button`
    background: #F1FAFF;
    width: 130px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
`
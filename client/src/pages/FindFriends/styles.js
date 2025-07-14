import styled from "styled-components";

export const FindFriends = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
`

export const FriendsList = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    column-gap: 70px;
    width: 100%;
    max-width: 870px;
    margin: 0 auto;
`

export const FriendItem = styled.div`
    display: flex;
    align-items: center;
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
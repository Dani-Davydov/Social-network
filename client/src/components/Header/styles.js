import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    padding-bottom: 37px;
    background-color: #A9DEF9;;
`

export const LeftSideContainer = styled.div`
    max-width: 735px;
    width: 100%;
    display: flex;
    gap: 56px;
    padding-left: 80px;
    align-items: center;
`
export const RightSideContainer = styled.div`
    display: flex;
    margin-right: 55px;
    max-width: 435px;
    width: 100%;
    gap: 57px;
    align-items: center;
`
export const IconContainer = styled.div`
    display: flex;
    gap: 20px;
`

export const SearchContainer = styled.div`
    max-width: 625px;
    width: 100%;
    position: relative;
    background: white;
    padding: 15px 0 15px 24px;
    border-radius: 10px;
    box-shadow: 10px 5px 5px black;
`

export const SearchIcon = styled.img`
    
`

export const SearchLable = styled.label`
    display: flex;
    align-items: center;
    gap: 16px;
`

export const SearchInput = styled.input`
    border: none;
    width: 100%;
    outline: none;
    appearance: none;
`

export const RightSideItem = styled.div`
    cursor: pointer;
`
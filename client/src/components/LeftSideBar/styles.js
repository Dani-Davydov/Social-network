import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const LeftSideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 80px;
    max-width: 250px;
    width: 100%;
    padding-top: 30px;
    background: white;
    align-items: center;
    
`

export const PanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 72px;
`

export const PanelItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`

export const ItemsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

export const sectionTitle = styled.div`
    color: #FF5A60;
`

export const NavigateLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
        color: #FF5A60;
    }

    &.active {
        color: #FF5A60;
    }
`

export const regestrationIcon = styled.img`
    width: 32px;
    height: 32px;
`

export const LogOut = styled.div`
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
`
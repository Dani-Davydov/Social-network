import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`

export const Modal = styled.div`
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    border: 1px solid white;
    border-radius: 20px;
    padding: 15px;
    background-color: white;
    display: flex;
    gap: 15px;
    flex-direction: column;
`

export const ModalText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
`

export const ModalContent = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
`
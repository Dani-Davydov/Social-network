import * as SC from "./styles.js";

export const Modal = ({children, title, setShowMoadal}) => {
    return (
        <SC.ModalWrapper>
            <SC.Modal>
                <SC.ModalTextAndClose>
                    <SC.ModalText>{title}</SC.ModalText>
                    <SC.Close onClick={() => setShowMoadal(false)}>X</SC.Close>
                </SC.ModalTextAndClose>
                <SC.ModalContent>
                    {children}
                </SC.ModalContent>
            </SC.Modal>
        </SC.ModalWrapper>
    )
}
import * as SC from "./styles.js";

export const Modal = ({children, title, setShowMoadal}) => {
    return (
        <SC.ModalWrapper>
            <SC.Modal>
                <SC.ModalText>{title}</SC.ModalText>
                <div onClick={() => setShowMoadal(false)}>X</div>
                <SC.ModalContent>
                    {children}
                </SC.ModalContent>
            </SC.Modal>
        </SC.ModalWrapper>
    )
}
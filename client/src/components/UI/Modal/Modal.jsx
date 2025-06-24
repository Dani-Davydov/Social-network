import * as SC from "./styles.js";
import {ModalTextAndClose} from "./styles.js";

export const Modal = ({children, title, setShowMoadal}) => {
    return (
        <SC.ModalWrapper>
            <SC.Modal>
                <SC.ModalTextAndClose>
                    <SC.ModalText>{title}</SC.ModalText>
                    <div onClick={() => setShowMoadal(false)}>X</div>
                </SC.ModalTextAndClose>
                <SC.ModalContent>
                    {children}
                </SC.ModalContent>
            </SC.Modal>
        </SC.ModalWrapper>
    )
}
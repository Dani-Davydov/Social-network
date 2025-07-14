import CloseIcon from '@mui/icons-material/Close';
import {Icon} from "../../../constans/stylesConstant.js";
import * as SC from "./styles.js";
import {TooltipWrapper} from "../TooltipWrapper/TooltipWrapper.jsx";

export const Modal = ({children, title, setShowMoadal}) => {
    return (
        <SC.ModalWrapper>
            <SC.Modal>
                <SC.ModalTextAndClose>
                    <SC.ModalText>{title}</SC.ModalText>
                    <TooltipWrapper title="Close form">
                        <CloseIcon sx={Icon} onClick={() => setShowMoadal(false)}>X</CloseIcon>
                    </TooltipWrapper>
                </SC.ModalTextAndClose>
                <SC.ModalContent>
                    {children}
                </SC.ModalContent>
            </SC.Modal>
        </SC.ModalWrapper>
    )
}
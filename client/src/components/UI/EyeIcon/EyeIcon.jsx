import * as SC from "./styles.js";

export const EyeIcon = ({ children, onClick }) => {
    return (
        <SC.IconWrapper onClick={onClick}>
            {children}
        </SC.IconWrapper>
    );
};
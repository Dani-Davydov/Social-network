import * as SC from "./styles.js"

export const Selector = ({ children, ...rest }) => <SC.Selector {...rest}>{children}</SC.Selector>;
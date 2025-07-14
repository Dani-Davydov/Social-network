import {Tooltip} from "@mui/material";

export const TooltipWrapper = ({title, children}) => {
    return (
        <Tooltip title={title}>
            <div>
                {children}
            </div>
        </Tooltip>
    )
}
import {IconButton} from "@mui/material";

export const IconBtn = ({icon, ...props}) => {
    return (
        <IconButton {...props}>
            {icon}
        </IconButton>
    )
}
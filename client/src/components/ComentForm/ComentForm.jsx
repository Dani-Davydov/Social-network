import {useState} from "react";
import {useFetch} from "../../hooks/useFetch.js";
import {useDispatch} from "react-redux";
import * as SC from "./styles.js";
import {getPostById} from "../../Redux/slices/postsSlice.js";
import SendIcon from '@mui/icons-material/Send';
import {IconBtn} from "../UI/IconBtn/IconBtn.jsx";
import {TooltipWrapper} from "../UI/TooltipWrapper/TooltipWrapper.jsx";

export const ComentForm = ({postId, currentUserId, userName, setShowCommentForm, userId}) => {
    const [inputValue, setInputValue] = useState("")

    const dispatch = useDispatch();

    const fetch = useFetch();

    const onSubmit = async  (e) => {
        e.preventDefault()

            await fetch(
                "http://localhost:3002/api/posts/addComment",
                {
                    userId: currentUserId,
                    postId: postId,
                    author: userName,
                    comentContent: inputValue,
                },
                "PATCH"
            )

            dispatch(getPostById( {userId: userId, postId: postId},));
            setShowCommentForm(false)
            setInputValue('')
    }

    const disabled = !inputValue

    return (
        <SC.Form onSubmit={onSubmit} action="">
            <div>
                <SC.Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"/>
            </div>
            <TooltipWrapper title={"Add comment"}>
                <IconBtn icon={<SendIcon/>} disabled={disabled} type="submit"/>
            </TooltipWrapper>
        </SC.Form>
    )
}
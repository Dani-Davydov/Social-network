import {useState} from "react";
import {useFetch} from "../../hooks/useFetch.js";
import {useDispatch} from "react-redux";
import {updatePostComent} from "../../Redux/slices/postsSlice.js";

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

            dispatch(updatePostComent({userId: userId, postId: postId}));
            setShowCommentForm(false)
            setInputValue('')
    }

    const disabled = !inputValue

    return (
        <form onSubmit={onSubmit} action="">
            <div>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"/>
            </div>
            <button disabled={disabled} type="submit">send</button>
        </form>
    )
}
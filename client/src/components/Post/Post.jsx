import * as SC from "./styles.js";
import {PostLink} from "../UI/PostLink/PostLink.jsx";

export const Post = ({post}) => {
    return (
        <SC.Post key={post._id}>
            <SC.TitleAndAuthor>
                <SC.Author>{post.postAuthor}</SC.Author>
                <SC.Title>{post.title}</SC.Title>
            </SC.TitleAndAuthor>
            <PostLink to={`/posts/${post._id}/${post.userId}`}>read more...</PostLink>
        </SC.Post>
    )
}
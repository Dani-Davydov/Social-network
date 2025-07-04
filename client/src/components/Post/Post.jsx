import * as SC from "./styles.js";
import {ComentForm} from "../ComentForm/ComentForm.jsx"
import {Author} from "./styles.js";

export const Post = ({post, currentUser, openComentForm, toggleComments, showCommentForm, ownerId, setShowCommentForm, showComments, deletePostFunc}) => {
    return (
        <SC.Post key={post._id}>
            <SC.Author>
                <div>{post.postAuthor}</div>
            </SC.Author>
            <h3>{post.title}</h3>
            <div>{post.content}</div>
            <SC.CommentActions>
                <SC.DeleteAndShowButtons>
                    <SC.WriteComment>
                        {currentUser && (
                            <SC.CommentsButton onClick={() => openComentForm(post._id)}>
                                write comment
                            </SC.CommentsButton>
                        )}
                        {showCommentForm[post._id] && (
                            <ComentForm
                                setShowCommentForm={setShowCommentForm}
                                userName={currentUser.name}
                                currentUserId={currentUser._id}
                                userId={ownerId}
                                postId={post._id}
                            />
                        )}
                    </SC.WriteComment>
                    {post.comments?.length > 0 && (
                        <SC.CommentsButton onClick={() => toggleComments(post._id)}>
                            {showComments[post._id] ? "Close" : "Show Comments"}
                        </SC.CommentsButton>
                    )}
                </SC.DeleteAndShowButtons>
                {currentUser?.adminStatus &&
                    <div>
                        <SC.CommentsButton onClick={() => deletePostFunc(post._id, ownerId)} color="#FF5A60">delete post</SC.CommentsButton>
                    </div>
                }
            </SC.CommentActions>
            {showComments[post._id] && (
                <SC.CommentsContainer>
                    {post.comments?.map(comment => (
                        <SC.Comment key={comment._id}>
                            <div>{comment.author}:</div>
                            <div>{comment.comentContent}</div>
                        </SC.Comment>
                    ))}
                </SC.CommentsContainer>
            )}
        </SC.Post>
    )
}
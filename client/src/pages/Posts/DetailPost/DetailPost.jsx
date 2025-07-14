import * as SC from "./styles.js";
import {ComentForm} from "../../../components/ComentForm/ComentForm.jsx"
import {useEffect, useState} from "react";
import {getPosts} from "../../../Redux/slices/postsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useFetch} from "../../../hooks/useFetch.js";
import {useNavigate, useParams} from "react-router-dom";
import {Loader} from "../../../components/UI/Loader/Loader.jsx";
import {Container} from "../../../components/UI/Container/Container.jsx";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {Icon} from "../../../constans/stylesConstant.js";
import {getPostById} from "../../../Redux/slices/postsSlice.js";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {TooltipWrapper} from "../../../components/UI/TooltipWrapper/TooltipWrapper.jsx";

export const DetailPost = () => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const {post, loading} = useSelector(state => state.posts.postFotViev);
    
    const {id, userId} = useParams();

    const dispatch = useDispatch();

    console.log(userId);
    const [showCommentForm, setShowCommentForm] = useState(false);

    const navigate = useNavigate();

    const fetch = useFetch();

    useEffect(() => {
        dispatch(getPostById( {userId: userId, postId: id},));
    }, [dispatch, id, userId])

    if (loading) {
        return <Loader />;
    }

    const deletePostFunc = async (postId, userId) => {
        await fetch(
            "http://localhost:3002/api/posts/delete",
            {
                userId: userId,
                id: postId,
            },
            "DELETE"
        )

        dispatch(getPosts());
        navigate('/posts')
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-EN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <Container>
            {post && <SC.Post key={post._id}>
                <SC.Author>
                    <SC.AuthorAndDate>
                        <div>{post.postAuthor}</div>
                        <SC.PostDate>{formatDate(post.createdAt)}</SC.PostDate>
                    </SC.AuthorAndDate>
                    <div>
                        <TooltipWrapper title="return to posts">
                            <KeyboardReturnIcon sx={Icon} onClick={() => navigate('/posts')}/>
                        </TooltipWrapper>
                        {currentUser?.adminStatus &&
                            <div>
                                <DeleteForeverIcon sx={Icon} onClick={() => deletePostFunc(post._id, userId)} color="#FF5A60">delete
                                    post</DeleteForeverIcon>
                            </div>
                        }
                    </div>
                </SC.Author>
                <h3>{post.title}</h3>
                <SC.PostContent>{post.content}</SC.PostContent>
                {currentUser && <SC.CommentActions>
                        <SC.WriteComment>
                            <TooltipWrapper title={showCommentForm === false ? "Write a comment" : "Close form"}>
                                <ChatBubbleOutlineIcon sx={Icon} onClick={() => setShowCommentForm(!showCommentForm)}>
                                    write comment
                                </ChatBubbleOutlineIcon>
                            </TooltipWrapper>
                            {showCommentForm === true && (
                                <ComentForm
                                    setShowCommentForm={setShowCommentForm}
                                    userName={currentUser.name}
                                    currentUserId={currentUser._id}
                                    userId={userId}
                                    postId={post._id}
                                />
                            )}
                        </SC.WriteComment>
                </SC.CommentActions>}
                {post.comments?.length > 0 && (
                    <SC.CommentsContainer>
                        {post.comments?.map(comment => (
                            <SC.Comment key={comment._id}>
                                <div>{comment.author}:</div>
                                <div>{comment.comentContent}</div>
                            </SC.Comment>
                        ))}
                    </SC.CommentsContainer>
                )}
            </SC.Post>}
        </Container>
    )
}
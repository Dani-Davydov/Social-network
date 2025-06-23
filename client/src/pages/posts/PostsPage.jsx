import {useState, useEffect} from "react"
import {useFetch} from "../../hooks/useFetch.js";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getPosts} from "../../Redux/slices/postsSlice.js";
import writePostIcon from "../../icons/writePost.svg";
import * as SC from "./styles.js";
import {ComentForm} from "../../components/ComentForm/ComentForm.jsx";
import {Comment, CommentsContainer, DeleteAndShowButtons} from "./styles.js";

const DEFAULT_STATE = {title: "", body: ""}

export const PostsPage = () => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const {posts, loading} = useSelector((state) => state.posts.postslist);
    const [formValues, setFormValues] = useState(DEFAULT_STATE);
    const [showComments, setShowComments] = useState({});
    const [showCommentForm, setShowCommentForm] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!posts) {
            dispatch(getPosts())
        }
    }, [dispatch, posts]);

    const fetch = useFetch();

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(currentUser._id);

        await fetch(
            "http://localhost:3002/api/posts/add",
            {
                userId: String(currentUser._id),
                postData: {
                    title: formValues.title,
                    content: formValues.body,
                },
            },
            "POST"
        )

        dispatch(getPosts());

        setFormValues(DEFAULT_STATE)
    }

    const disabled = !formValues.title || !formValues.body;

    const openComentForm = (postId)  => {
        setShowCommentForm(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    }

    const toggleComments = (postId) => {
        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const deletePost = async (postId, userId) => {
        await fetch(
            "http://localhost:3002/api/posts/delete",
            {
                userId: userId,
                id: postId,
            },
            "DELETE"
        )

        dispatch(getPosts());
    }

    return(
        <SC.Container>
            {currentUser &&
                <SC.Form onSubmit={onSubmit} action="">
                    <div>
                        <img src={writePostIcon} alt=""/>
                    </div>
                    <SC.InputDiv>
                        <SC.Input
                            height={"title"}
                            name='title'
                            placeholder="Write title here..."
                            type="text"
                            value={formValues.title}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                        />
                    </SC.InputDiv>
                    <SC.InputDiv>
                        <SC.Input
                            height={"content"}
                            name='body'
                            placeholder="Write something here..."
                            value={formValues.body}
                            onChange={(e) => onChange(e.target.name, e.target.value)}>
                        </SC.Input>
                    </SC.InputDiv>
                    <SC.Button title={"Save"} disabled={disabled} type='submit'>Save</SC.Button>
                </SC.Form>
            }
            <SC.PostsContainer>
                {posts && posts.map(postDoc => (
                    postDoc.userPosts.map(post => (
                        <SC.Post key={post._id}>
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
                                                userId={postDoc.userId}
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
                                        <SC.CommentsButton onClick={() => deletePost(post._id, postDoc.userId)} color="#FF5A60">удалить пост</SC.CommentsButton>
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
                    ))
                ))}
            </SC.PostsContainer>
        </SC.Container>
    )
}
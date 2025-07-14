import {Form} from "../../components/UI/Form/Form.jsx";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Input} from "../../components/UI/Input/Input.jsx";
import {FormBtn} from "../../components/UI/FormBtn/FormBtn.jsx";
import {useSelector} from "react-redux";
import {useState} from "react";
import {getPosts} from "../../Redux/slices/postsSlice.js";
import {useDispatch} from "react-redux";
import * as SC from "./styles.js"
import {useFetch} from "../../hooks/useFetch.js";
import {Container} from "../../components/UI/Container/Container.jsx";
import {useToast} from "../../hooks/useToast.js";


const DEFAULT_STATE = {title: "", body: ""}

export const WritePost = () => {
    const [formValues, setFormValues] = useState(DEFAULT_STATE);
    const [isChecked, setIsChecked] = useState(false);

    const toast = useToast()

    const currentUser = useSelector((state) => state.users.currentUser);

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value});
    }

    const fetch = useFetch();

    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(isChecked);
        if (formValues.title.length > 25) {
            toast("error", "Max length of title is 25 symbols")
            setFormValues(DEFAULT_STATE)
            return
        }

        await fetch(
            "http://localhost:3002/api/posts/add",
            {
                userId: String(currentUser._id),
                postData: {
                    title: formValues.title,
                    content: formValues.body,
                    viewStatus: isChecked,
                    postAuthor: `${currentUser.name} ${currentUser.surname}`,
                },
            },
            "POST"
        )

        toast("success", "you have successfully added new post")

        dispatch(getPosts());

        setFormValues(DEFAULT_STATE)
        setIsChecked(false)
    }

    const disabled = !formValues.title || !formValues.body;

    return (
        <Container>
            <SC.WtitePost>
                {currentUser &&
                    <Form onSubmit={onSubmit} action="">
                        <BorderColorIcon/>
                        <Input
                            height={"title"}
                            name='title'
                            placeholder="Write title here..."
                            type="text"
                            value={formValues.title}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                        />
                        <Input
                            height={"content"}
                            name='body'
                            placeholder="Write something here..."
                            value={formValues.body}
                            onChange={(e) => onChange(e.target.name, e.target.value)}>
                        </Input>
                        <div>
                            <input
                                type="checkbox"
                                id="scales"
                                checked={!isChecked ? true : false}
                                onChange={() => setIsChecked(false)}
                            />
                            <label htmlFor="scales">All</label>

                            <input
                                type="checkbox"
                                id="horns"
                                checked={isChecked ? true : false}
                                onChange={() => setIsChecked(true)}
                            />
                            <label htmlFor="horns">For friends</label>
                        </div>
                        <FormBtn title={"Save"} disabled={disabled} type='submit'>Save</FormBtn>
                    </Form>
                }
            </SC.WtitePost>
        </Container>
    )
}
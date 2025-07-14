import {useState} from "react";
import {useGetUser} from "../../hooks/useGetUser.js";
import {useDispatch, useSelector} from "react-redux";
import {generateRandomUsers, getUsers, login} from "../../Redux/slices/usersSlice.js";
import {useNavigate} from "react-router-dom";
import {getFromRequests, getToRequests} from "../../Redux/slices/requestsSlice.js"
import {Form} from "../../components/UI/Form/Form.jsx"
import {FormBtn} from "../../components/UI/FormBtn/FormBtn.jsx";
import {Input} from "../../components/UI/Input/Input.jsx"
import {AuthContainer} from "../../components/UI/AuthContainer/AuthContainer.jsx"
import {FormTitle} from "../../components/UI/FormTitle/FormTitle.jsx";
import {Loader} from "../../components/UI/Loader/Loader.jsx";
import {PasswordInput} from "../../components/UI/InputContainer/PasswordInput.jsx";
import {EyeIcon} from "../../components/UI/EyeIcon/EyeIcon.jsx";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Container} from "../../components/UI/Container/Container.jsx";
import {localStorageHelper} from "../../helpers/localStorageHelper.js";
import {useToast} from "../../hooks/useToast.js";

export const Auth = () => {
    const toast = useToast()

    const fromRequests = useSelector((state) => state.requests.fromRequestsList)
    const toRequests = useSelector((state) => state.requests.toRequestsList)

    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const getUser = useGetUser();

    const loading = useSelector((state) => state.users.userList.loading);

    const {setLocalStorage} = localStorageHelper();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (loading) {
        return <Loader />;
    }

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await getUser(formValues.email, formValues.password);

        if (!response) {
            setFormValues({ email: "", password: "" });
        }

        setLocalStorage("currentUser", response);

        dispatch(login({key: "currentUser"}))
        dispatch(getFromRequests({ fromUserEmail: response.email }));
        dispatch(getToRequests({ toUserEmail: response.email }));
        dispatch(generateRandomUsers({
            toReq: toRequests,
            fromReq: fromRequests
        }))
        dispatch(getUsers());

        toast("success", "you have successfully logged in")

        navigate('/posts')

        setFormValues({ email: "", password: "" });
    }

    const disabled = !formValues.email || !formValues.password

    return (
        <Container>
            <AuthContainer>
                <FormTitle>Auth</FormTitle>
                <Form onSubmit={onSubmit}>
                    <Input
                        height={"title"}
                        name='email'
                        placeholder="Email"
                        type="email"
                        value={formValues.email}
                        onChange={(e) => onChange(e.target.name ,e.target.value)}
                    />
                    <PasswordInput>
                        <Input
                            height={"title"}
                            name='password'
                            placeholder="password"
                            type={showPassword ? "text" : "password"}
                            value={formValues.password}
                            onChange={(e) => onChange(e.target.name ,e.target.value)}
                        />
                        <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                        </EyeIcon>
                    </PasswordInput>
                    <FormBtn title={"Enter"} disabled={disabled} type='submit'>Enter</FormBtn>
                </Form>
            </AuthContainer>
        </Container>
    )
}
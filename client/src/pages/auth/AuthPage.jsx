import {useState} from "react";
import {useGetUser} from "../../hooks/useGetUser.js";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, login} from "../../Redux/slices/usersSlice.js";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage.js";
import {getFromRequests, getToRequests} from "../../Redux/slices/requestsSlice.js"
import {Form} from "../../components/UI/Form/Form.jsx"
import {FormBtn} from "../../components/UI/FormBtn/FormBtn.jsx";
import {Input} from "../../components/UI/Input/Input.jsx"
import {AuthAndRegistrationContainer} from "../../components/UI/AuthAndRegistrationContainer/AuthAndRegistrationContainer.jsx"
import {FormTitle} from "../../components/UI/FormTitle/FormTitle.jsx";
import {Loader} from "../../components/UI/Loader/Loader.jsx";

export const AuthPage = () => {
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const getUser = useGetUser();

    const loading = useSelector((state) => state.users.userList.loading);

    const {setLocalStorage} = useLocalStorage();

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

        setLocalStorage("currentUser", response);

        dispatch(login({key: "currentUser"}))
        dispatch(getFromRequests({ fromUserEmail: response.email }));
        dispatch(getToRequests({ toUserEmail: response.email }));
        dispatch(getUsers());

        navigate('/')

        setFormValues({ email: "", password: "" });
    }

    const disabled = !formValues.email || !formValues.password

    return (
        <AuthAndRegistrationContainer>
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
                    <Input
                        height={"title"}
                        name='password'
                        placeholder="Пороль"
                        type="password"
                        value={formValues.password}
                        onChange={(e) => onChange(e.target.name ,e.target.value)}
                    />
                <FormBtn title={"Enter"} disabled={disabled} type='submit'>Enter</FormBtn>
            </Form>
        </AuthAndRegistrationContainer>
    )
}

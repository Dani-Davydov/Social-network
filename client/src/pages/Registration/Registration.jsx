import {useState} from "react";
import {useFetch} from "../../hooks/useFetch.js";
import {useNavigate} from "react-router-dom";
import {getUsers} from "../../Redux/slices/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Form} from "../../components/UI/Form/Form.jsx";
import {Input} from "../../components/UI/Input/Input.jsx";
import {FormBtn} from "../../components/UI/FormBtn/FormBtn.jsx";
import {AuthContainer} from "../../components/UI/AuthContainer/AuthContainer.jsx";
import {FormTitle} from "../../components/UI/FormTitle/FormTitle.jsx";
import {Loader} from "../../components/UI/Loader/Loader.jsx";
import {Container} from "../../components/UI/Container/Container.jsx";
import {useToast} from "../../hooks/useToast.js";
import {PasswordInput} from "../../components/UI/InputContainer/PasswordInput.jsx";
import {EyeIcon} from "../../components/UI/EyeIcon/EyeIcon.jsx";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const RegistrationPage = () => {
    const [formValues, setFormValues] = useState({ name: "", surname: "" , email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const fetch = useFetch();

    const toast = useToast()

    const loading = useSelector((state) => state.users.userList.loading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (loading) {
        return <Loader />;
    }

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch(
            "http://localhost:3002/api/users/add",
            {
                name: formValues.name,
                surname: formValues.surname,
                email: formValues.email,
                password: String(formValues.password),
            },
            "POST"
        )

        toast("success", "you have successfully registrated in")

        setFormValues({ name: "", surname: "" , email: "", password: "" })
        dispatch(getUsers())
        navigate("/");
    }

    const disabled = !formValues.email || !formValues.password || !formValues.name || !formValues.surname;

    return (
        <Container>
            <AuthContainer>
                <FormTitle>Registration</FormTitle>
                <Form onSubmit={onSubmit}>
                    <Input
                        height={"title"}
                        name='name'
                        placeholder="Name"
                        type="text"
                        value={formValues.name}
                        onChange={(e) => onChange(e.target.name ,e.target.value)}
                    />
                    <Input
                        height={"title"}
                        name='surname'
                        placeholder="Surname"
                        type="text"
                        value={formValues.surname}
                        onChange={(e) => onChange(e.target.name ,e.target.value)}
                    />
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
                    <FormBtn title={"Registration"} disabled={disabled} type='submit'>Registration</FormBtn>
                </Form>
            </AuthContainer>
        </Container>
    )
}
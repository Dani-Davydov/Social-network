import {useState} from "react";
import {useGetUser} from "../../hooks/useGetUser.js";
import {useDispatch} from "react-redux";
import {login} from "../../Redux/slices/usersSlice.js";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage.js";

export const AuthPage = () => {
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const getUser = useGetUser();

    const {setLocalStorage} = useLocalStorage();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await getUser(formValues.email, formValues.password);

        setLocalStorage("currentUser", response);

        dispatch(login({key: "currentUser"}))

        navigate('/')

        setFormValues({ email: "", password: "" });
    }

    const disabled = !formValues.email || !formValues.password

    return (
        <div>
            <div>Страница регистрации</div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        name='email'
                        placeholder="Email"
                        type="email"
                        value={formValues.email}
                        onChange={(e) => onChange(e.target.name ,e.target.value)}
                    />
                </div>
                <div>
                    <input
                        name='password'
                        placeholder="Пороль"
                        type="password"
                        value={formValues.password}
                        onChange={(e) => onChange(e.target.name ,e.target.value)}
                    />
                </div>
                <button title={"Регистрация"} disabled={disabled} type='submit'>Enter</button>
            </form>
        </div>
    )
}
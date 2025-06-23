import {useState} from "react";
import {useFetch} from "../../hooks/useFetch.js";
import {useNavigate} from "react-router-dom";
import {getUsers} from "../../Redux/slices/usersSlice.js";
import {useDispatch} from "react-redux";

export const RegistrationPage = () => {
    const [formValues, setFormValues] = useState({ name: "", surname: "" , email: "", password: "" });
    const fetch = useFetch();

    const dispatch = useDispatch();

    const navigate = useNavigate();

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
                password: formValues.password,
            },
            "POST"
        )

        setFormValues({ name: "", surname: "" , email: "", password: "" })
        dispatch(getUsers())
        navigate("/auth");
    }

    const disabled = !formValues.email || !formValues.password || !formValues.name || !formValues.surname;

    return (
        <div>
            <div>Страница регистрации</div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        name='name'
                        placeholder="Имя пользователя"
                        type="text"
                        value={formValues.name}
                        onChange={(e) => onChange(e.target.name ,e.target.value)}
                    />
                </div>
                <div>
                    <input
                        name='surname'
                        placeholder="Фамилия пользователя"
                        type="text"
                        value={formValues.surname}
                        onChange={(e) => onChange(e.target.name ,e.target.value)}
                    />
                </div>
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
                <button title={"Регистрация"} disabled={disabled} type='submit'>Registration</button>
            </form>
        </div>
    )
}
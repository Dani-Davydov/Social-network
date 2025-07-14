import {useToast} from "./useToast.js";

export const useGetUser = () => {
    const toast = useToast()

    return async (email, password) => {
        try {
            const res = await fetch("http://localhost:3002/api/users/findUser", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const json = await res.json();

            if (!res.ok) {
                toast("error", json.message);
                return null;
            }

            return json.user[0];
        } catch (e) {
            console.error('Auth error:', e);
            throw e;
        }
    };
};
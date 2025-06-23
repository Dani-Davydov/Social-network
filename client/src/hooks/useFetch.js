import { useCallback } from "react";

export const useFetch = () => {
    return useCallback(async (url, bodyData, method = "POST") => {
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            const json = await res.json();

            if (!res.ok) {
                alert(json.message || "Ошибка");
                return null;
            }

            return json;

        } catch (e) {
            console.error("Ошибка запроса:", e);
            return null;
        }
    }, []);
};
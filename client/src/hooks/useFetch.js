export const useFetch = (url, bodyData, method, updateTodoList) => {
    const sendRequest = async () => {
        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            })

            if (res.status !== 200) {
                const json = await res.json()
                alert(json.message || "Ошибка")
                return
            }

            updateTodoList()
        } catch (e) {
            console.error(e)
        }
    }

    return sendRequest;
}
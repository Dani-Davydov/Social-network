export const usersApi = {
    fetchUsers() {
        try {
            return fetch('http://localhost:3002/api/users/list')
                .then(response => response.json())
                .then(users => users.users)
        } catch (ex) {
            console.log(ex);
        }
    },
}
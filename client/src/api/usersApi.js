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

    fetchRandomUsers(count = 3) {
        return this.fetchUsers()
            .then(users => {
                if (!users || users.length === 0) return [];

                const shuffled = [...users];

                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }

                return shuffled.slice(0, count);
            })
            .catch(error => {
                console.error('Error fetching random users:', error);
                return [];
            });
    }
}
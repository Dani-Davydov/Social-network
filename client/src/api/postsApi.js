export const postsApi = {
    fetchPosts() {
        try {
            return fetch('http://localhost:3002/api/posts/list')
                .then(response => response.json())
                .then(posts => posts.posts)
        } catch (ex) {
            console.log(ex);
        }
    },
}
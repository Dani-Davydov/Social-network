export const filtersAndPagin = (searchValue, sort, paginationInfo, data, kindOfData, currentUser, users, friendsSort) => {
    const paginatedList = (paginationInfo, list) => {
        const { perPage, ActivePage } = paginationInfo;

        paginationInfo.pageCount = Math.ceil(list.length / perPage);

        const firstIndex = ActivePage * perPage;
        const paginatedList = list.slice(firstIndex, firstIndex + perPage);

        return paginatedList;
    }

    const filterBySearchValue = (list, value, kindOfData) => {
        return list.filter((data) => {
            return kindOfData === "users" ?
                data.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || data.surname.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                : data.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        })
    }

    const filterByFriendsPosts = (list, users, currentUser, friendsSort) => {
        if (friendsSort !== "friends" || !currentUser || !users) return list || [];

        return (list || []).filter(post => {
            const ownerOfPost = users.find(user => user._id === post.userId);
            return ownerOfPost?.friends?.some(friend =>
                friend.friendEmail === currentUser.email
            );
        });
    };

    const sortProducts = (list, sort) => {

        list.sort((a, b) => {

            if (sort === "ASC") {
                if (a.title > b.title) return 1;
                if (a.title === b.title) return 0;
                if (a.title < b.title) return -1;
            }

            if (a.title > b.title) return -1;
            if (a.title === b.title) return 0;
            if (a.title < b.title) return 1;
        })
    }

    const filterData = (searchValue, sort, paginationInfo, data, kindOfData, currentUser, users, friendsSort) => {
        let filteredPosts = [...data]

        filteredPosts = filterByFriendsPosts(filteredPosts, users, currentUser, friendsSort);

        if (searchValue) {
            filteredPosts = filterBySearchValue(filteredPosts, searchValue, kindOfData)
        }

        if (sort) {
            sortProducts(filteredPosts, sort)
        }

        return paginatedList(paginationInfo, filteredPosts);
    }

    return filterData(searchValue, sort, paginationInfo, data, kindOfData, currentUser, users, friendsSort)
}
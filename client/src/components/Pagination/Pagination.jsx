import {PaginationContainer} from "./PaginationContainer/PaginationContainer.jsx";
import {PaginationPage} from "./PaginationContainer/PaginationPages/PaginationPage.jsx";
import {useDispatch} from "react-redux";

export const Pagination = ({paginationInfo, updateFiltersParametrs, filterList}) => {
    const dispatch = useDispatch();

    const onChangePage = (newPage) => {

        dispatch(updateFiltersParametrs({
            paginationInfo: {
                ...paginationInfo,
                ActivePage: newPage
            }
        }));

        dispatch(filterList())
    }

    return (
        <PaginationContainer>
            {Array.from({ length: paginationInfo.pageCount }).map((_, index) => (
                <PaginationPage
                    disabled={paginationInfo.ActivePage === index}
                    className={paginationInfo.ActivePage === index ? "active" : ""}
                    onClick={() => onChangePage(index)}
                    key={index}
                >
                    {index + 1}
                </PaginationPage>
            ))}
        </PaginationContainer>
    )
}
import styled from "styled-components";

export const PostPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 795px;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
`

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 190px);
    justify-content: center;
    gap: 30px;
    width: 100%;
    max-width: 795px;
    margin: 0 auto;
    
    &:has(> :nth-child(2):last-child) {
        max-width: 410px;
    }
`

export const SortAndConst = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

export const Sorts = styled.div`
    width: 630px;
    display: flex;
    justify-content: space-between;
`
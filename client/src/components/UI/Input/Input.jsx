import * as SC from "./styles.js"

export const Input = (rest) => {
    return (
        <SC.InputDiv>
            <SC.Input { ...rest }/>
        </SC.InputDiv>
    )
}
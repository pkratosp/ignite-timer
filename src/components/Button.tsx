import { ButtonContainer, buttonVariants } from "./Button.styles"

interface Props {
    color?: buttonVariants
}


export function Button({ color = 'primary' }: Props) {
    return (
        <>
            <ButtonContainer variant={color} >enviar</ButtonContainer>
        </>
    )
}
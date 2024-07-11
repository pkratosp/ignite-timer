import styled, { css } from "styled-components";

export type buttonVariants = 'primary' | 'secondary' | 'danger' | 'sucess'

interface ButtonProps {
    variant: buttonVariants
}

const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    sucess: 'green'
}

export const ButtonContainer = styled.button<ButtonProps>`
    width: 100px;
    height: 40px;

    background-color: ${props => props.theme.primary};

    color: ${props => props.theme.white};
    border: 0;
    margin: 10px;

    
    /* ${props => {
        return css`background-color: ${buttonVariants[props.variant]};`
    }} */
`
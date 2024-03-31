import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: none;
  margin-left: 0.25rem;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`

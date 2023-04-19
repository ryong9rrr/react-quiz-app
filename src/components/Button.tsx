import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes } from 'react'
import { FONT_SIZE, PALETTE } from '@/styles/theme'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: keyof typeof FONT_SIZE
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<ButtonProps>`
  padding: 8px 16px;
  border: 1px solid ${PALETTE.green[1]};
  border-radius: 4px;
  background-color: inherit;
  font-size: ${({ size }) => FONT_SIZE[size || 'sm']}px;
  font-weight: 600;
  color: ${PALETTE.green[1]};
  cursor: pointer;

  &:hover {
    background-color: ${PALETTE.green[2]};
    color: ${PALETTE.white};
  }
`

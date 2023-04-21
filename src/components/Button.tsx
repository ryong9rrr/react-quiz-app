import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes } from 'react'
import { FONT_SIZE, PALETTE } from '@/styles/theme'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: keyof typeof FONT_SIZE
}

export default function Button({ children, ...props }: Props) {
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<Props>`
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

  &:disabled,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`

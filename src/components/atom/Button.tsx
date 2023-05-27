import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes } from 'react'
import { FontSize, Colors } from '@/_lib/constants/theme'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: keyof typeof FontSize
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
  border: 1px solid ${Colors.green200};
  border-radius: 4px;
  background-color: inherit;
  font-size: ${({ size }) => FontSize[size || 'sm']}px;
  font-weight: 600;
  color: ${Colors.green200};
  cursor: pointer;

  &:hover {
    background-color: ${Colors.green300};
    color: ${Colors.white};
  }

  &:disabled,
  &[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`

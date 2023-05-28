import React, { ButtonHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { FontSize, Colors } from '@/_lib/constants/theme'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: keyof typeof FontSize
  full?: boolean
}

export default function Button({ children, size = 'md', full = false, ...rest }: Props) {
  return (
    <StyledButton type="button" full={full} size={size} {...rest}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<{ size: keyof typeof FontSize; full: boolean }>`
  ${({ full }) => (full ? 'width: 100%;' : '')}
  padding: 8px 16px;
  border: 1px solid ${Colors.green200};
  border-radius: 4px;
  background-color: inherit;
  font-size: ${({ size }) => FontSize[size]}px;
  font-weight: 600;
  color: ${Colors.green200};
  cursor: pointer;

  &:hover {
    background-color: ${Colors.green300};
    color: ${Colors.white};
  }

  &:disabled,
  &[disabled] {
    border: 1px solid ${Colors.gray200};
    background-color: ${Colors.gray100};
    color: ${Colors.gray300};
  }
`

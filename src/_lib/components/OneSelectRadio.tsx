import styled from '@emotion/styled'
import React from 'react'

interface Props {
  name: string
  type: React.HTMLInputTypeAttribute
  options: string[]
  selectedValue: string
  onSelect: React.ChangeEventHandler
}

export default function OneSelectRadio({ name, type, options, selectedValue, onSelect }: Props) {
  return (
    <Container>
      {options.map((option) => (
        <li key={option}>
          <input
            name={name}
            type={type}
            id={option}
            value={option}
            checked={selectedValue === option}
            onChange={onSelect}
          />
          <label htmlFor={option}>{option}</label>
        </li>
      ))}
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  input,
  label {
    cursor: pointer;
  }
`

// Import Third-Party Modules
import React from 'react';
import styled, { css } from 'styled-components';

// Import User-Defined Modules
import { IDropdownProps } from '../types/components/Dropdown.interface';

/**
 * handles the dropdown functionality of application
 * @returns Dropdown component
 */
export const Dropdown: React.FC<IDropdownProps> = ({
  onChange,
  selected,
  setSelected,
  options,
  disabled,
  label,
}) => {
  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const currentSelection = event.currentTarget.value;
    setSelected(currentSelection);
    if (label === 'Sort') {
      //Sort needs sort and order params for Github query
      const dObject = options.filter(
        (optionsData: any) => optionsData.label === currentSelection
      )[0];
      onChange({
        sort: dObject.sort,
        order: dObject.order,
      });
    } else {
      onChange(currentSelection);
    }
  };

  return !options ? null : (
    <Container label={label as string}>
      <DropdownLabel>{`${label}: `}</DropdownLabel>
      <DropdownSelect
        value={selected}
        onChange={handleSelect}
        disabled={disabled || false}
      >
        {options.map((optionsData: any) => (
          <DropdownOption key={optionsData.label} value={optionsData.label}>
            {optionsData.label}
          </DropdownOption>
        ))}
      </DropdownSelect>
    </Container>
  );
};

// Styled Components Defination
const Container = styled.div`
  ${({ theme }) => css`
    //Only show language dropdown when screen size is below mediaQueryLarge (800px)
    @media screen and (min-width: ${theme.mediaQueryLarge}) {
      display: ${(props) => (props?.label === 'Languages' ? 'none' : 0)};
    }
  `}
`;

const DropdownSelect = styled.select`
  ${({ theme }) => css`
    border-radius: 10px;
    border: 2px solid ${theme.colors.secondary};
    padding: 0.25rem;
    margin-bottom: 1rem;
    cursor: pointer;
  `}
`;

const DropdownLabel = styled.label`
  font-weight: 900;
`;

const DropdownOption = styled.option``;

// Import Third-Party Modules
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';

// Import User-Defined Modules
import { ISearchBarProps } from '../types/components/SearchBar.interface';

/**
 * SearchBar component used fro searching repositories
 * @returns SearchBar Component
 */
export const SearchBar: React.FC<ISearchBarProps> = ({
  intialInputValue = '',
  placeHolder,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>(intialInputValue);

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleSvgIconClickChange = (event: any) => {
    event.preventDefault();
    setInputValue(event.target?.value);
  };

  /**
   * This handles on triggering submit event handler if enter key is pressed within search input field
   * @param event Keyboard on press event
   */
  const handleSearchInputKeyPress: React.KeyboardEventHandler<
    HTMLDivElement
  > = (event) => {
    if (event.key === 'Enter' || event.currentTarget.title === 'search') {
      inputValue
        ? handleInputSubmit()
        : alert('Please enter search term to get results');
    }
  };

  const handleDivIconOnClickChange = (event: any) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleInputSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <Container id={'SearchBar'}>
      <SearchInputs>
        <SearchInput
          type="text"
          value={inputValue || ''}
          placeholder={placeHolder}
          onChange={handleSearchInputChange}
          onKeyPress={handleSearchInputKeyPress}
        />
        <Icon>
          {inputValue && (
            <MdClear values="" onClick={handleSvgIconClickChange} />
          )}
        </Icon>
        <Icon title={'search'} onClick={handleDivIconOnClickChange}>
          <FaSearch />
        </Icon>
      </SearchInputs>
    </Container>
  );
};

// Styled Components Defination
const Container = styled.div``;

const SearchInputs = styled.div`
  ${({ theme }) => css`
    display: flex;
    border: 2px solid ${theme.colors.primary};
    border-radius: 10px;
    padding: 0.25rem;
  `}
`;

const SearchInput = styled.input`
  ${({ theme }) => css`
    border: 0;
    font-size: 1rem;
    outline: none;
    background-color: transparent;
    text-overflow: ellipsis;
    max-width: 35rem;
    color: ${theme.colors.primary};

    ::placeholder {
      color: ${theme.colors.primary};
    }
  `}
`;
const Icon = styled.div`
  ${({ theme }) => css`
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      color: ${theme.colors.tertiary};
    }
  `}
`;

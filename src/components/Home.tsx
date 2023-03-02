// Import Third-Party Modules
import React from 'react';
import { GoMarkGithub as GithubIcon } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Import User-Defined Modules
import { DivFlexCenter } from '../common/CommonStyles';
import { IHomeProps } from '../types/components/Home.interface';
import { SearchBar } from './SearchBar';

export const Home: React.FC<IHomeProps> = () => {
  const navigate = useNavigate();

  //Route to Search component on submit and update url params with input value
  const routeChange = (input: string) => {
    const changedPath = `/search/${input}`;
    navigate(changedPath);
  };
  return (
    <Container id="Filters">
      <Wrapper>
        <Title>
          <GithubIcon /> Github Repository Search
        </Title>
        <SearchBar placeHolder="Search.." onSubmit={routeChange} />
      </Wrapper>
    </Container>
  );
};

// Styled Components Definations
const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.primary};
  `}
`;

const Wrapper = styled(DivFlexCenter)`
  height: 100vh;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled(DivFlexCenter)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.title};
    gap: 1rem;
  `}
`;

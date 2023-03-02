/* eslint-disable no-unsafe-optional-chaining */
// Import Third-Party Modules
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoStar as StarIcon, GoRepoForked as ForkIcon } from 'react-icons/go';

// Import User-Defined Modules
import { ISearchResultsProps } from '../types/components/SearchResults.interface';

/**
 * This module handles all the search results of repositories
 * @returns Search Results Component
 */
export const SearchResults: React.FC<ISearchResultsProps> = ({
  filteredResults,
  data,
}) => {
  return (
    <Results>
      <List>
        {(filteredResults ? filteredResults?.items : data?.items || []).map(
          (results: any) => {
            const {
              forks_count,
              stargazers_count,
              language,
              updated_at,
              full_name,
              id,
              description,
            } = results;
            const updatedAt = new Date(updated_at).toDateString();
            return (
              <Repo key={id}>
                <StyledLink
                  to={`/repository/${id}`}
                  state={{ data: results, updatedAt: updatedAt }}
                >
                  {full_name}
                </StyledLink>
                {description && (
                  <Description>{results.description}</Description>
                )}
                <Details>
                  <Stars>
                    <StarIcon />
                    {stargazers_count || 0}
                  </Stars>
                  <Forks>
                    <ForkIcon />
                    {forks_count || 0}
                  </Forks>
                  {language && <Language>{language || ''}</Language>}
                  <UpdatedAt>
                    {updatedAt ? `Updated ${updatedAt}` : ''}
                  </UpdatedAt>
                </Details>
              </Repo>
            );
          }
        )}
      </List>
    </Results>
  );
};

// Styled Components Definations
const Results = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.div``;

const StyledLink = styled(Link)<any>`
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: #1a202c;

  &:hover {
    text-decoration: underline;
  }
`;
const Repo = styled.div`
  padding: 1rem 0 1rem 0;
  border-bottom: 1px solid black;
`;

const Description = styled.div`
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Stars = styled.div`
  font-size: 0.7rem;
`;
const Forks = styled.div`
  font-size: 0.7rem;
`;
const Language = styled.div``;
const UpdatedAt = styled.div``;
const Details = styled.div`
  font-size: 0.7rem;
  display: flex;
  gap: 1rem;
  line-height: 1.25rem;
`;

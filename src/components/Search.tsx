// Import Third-Party Modules
import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Spinner } from 'react-spinners-css';
import { useParams, Route, Navigate, Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import {
  GoChevronLeft as LeftIcon,
  GoChevronRight as RightIcon,
} from 'react-icons/go';

// Import User-Defined Modules
import {
  IFilteredResultsStateTypes,
  ISearchDataStateTypes,
  ISearchFetchDataCallbackProps,
  ISearchProps,
} from '../types/components/Search.interface';
import { DivFlexCenter } from '../common/CommonStyles';
import { sortLanguages } from '../common/SortLanguages';
import { Dropdown } from './Dropdown';
import { SearchBar } from './SearchBar';
import { Filters } from './Filters';
import { SearchResults } from './SearchResults';

/**
 * This component handles the main searching feature of application
 * @returns Search Component for Repository in Github
 */
export const Search: React.FC<ISearchProps> = () => {
  const [data, setData] = useState<ISearchDataStateTypes>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [filteredResults, setFilteredResults] =
    useState<IFilteredResultsStateTypes>(null);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [page, setPage] = useState<number>(1);
  const [filterActive, setFilterActive] = useState<boolean>(false);

  //Github Sort Options
  const sortOptions = [
    { label: 'Best match', sort: '' },
    { label: 'Most stars', sort: 'stars' },
    { label: 'Fewest stars', sort: 'stars', order: 'asc' },
    { label: 'Most forks', sort: 'forks' },
    { label: 'Fewest forks', sort: 'forks', order: 'asc' },
  ];

  //get params from url
  const { q } = useParams();

  // Defining a memoized callback function to use it as a cache
  const fetchData = useCallback(
    ({ input, sort, order, perPage, pg }: ISearchFetchDataCallbackProps) => {
      setLoading(true);

      //Query Parameters - Refeinput, sort, order, perPage, pgrence: https://docs.github.com/en/rest/reference/repos
      const queryTerm = `q=` + encodeURIComponent(input || q);
      const querySort = `${sort ? `&sort=${sort}` : ''}`;
      const queryOrder = `${order ? `&order=${order}` : ''}`;
      const queryPerPage = `&per_page=${perPage || 30}`;
      const queryPage = `&page=${page || 1}`;
      const queryString =
        queryTerm + querySort + queryOrder + queryPerPage + queryPage;

      //console.log("Github API Search Query: ", queryString);
      const url = `https://api.github.com/search/repositories?${queryString}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const sortedLanguages = sortLanguages(data);
          //add any option as default for dropdown
          sortedLanguages.unshift({
            label: 'Any',
            count: undefined,
          });
          setData({
            totalCount: data.total_count,
            items: data.items,
            languages: sortedLanguages,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    },
    [page, q]
  );

  const handleSubmit = (input: any) => {
    setFilteredResults(null);
    setPage(1);
    fetchData({ input: input });
  };

  const handleFilter = (filter: any) => {
    //disables sort dropdown when filter is active (sort requires api call and will not align with filtering options)
    if (filter === 'clear' || filter === 'Any') {
      setFilterActive(false);
      setFilteredResults(data);
    } else {
      setFilterActive(true);
      const filteredResults = data?.items?.filter(
        (data: any) => data.language === filter
      );
      setFilteredResults({
        totalCount: filteredResults.length,
        items: filteredResults,
      });
    }
  };

  const handlePagination = (direction: any) => {
    const offset = page * 31;
    const results = filteredResults
      ? filteredResults?.totalCount
      : data?.totalCount || 0;
    if (direction === 'prev' && page >= 2) {
      setPage(page - 1);
    }
    if (direction === 'next' && page > 0 && offset < results) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchData({ input: q });
  }, [q, page, fetchData]);
  return (
    <Container id="Search">
      <Header>
        <IconLink to={`/`}>
          <FaGithub />
        </IconLink>
        <SearchBar
          placeHolder="Search..."
          onSubmit={handleSubmit}
          intialInputValue={q}
        />
      </Header>
      <ResultsWrapper>
        <Filters
          data={data}
          handleFilter={handleFilter}
          setFilterActive={setFilterActive}
        />
        <List>
          <Dropdowns>
            <Dropdown
              onChange={handleFilter}
              selected={selectedFilter}
              setSelected={setSelectedFilter}
              setFilterActive={setFilterActive}
              options={data ? data.languages : null}
              label={'Languages'}
            />
            <Dropdown
              onChange={fetchData}
              selected={selectedSort}
              setSelected={setSelectedSort}
              options={sortOptions}
              disabled={filterActive}
              label={'Sort'}
            />
          </Dropdowns>
          <TotalResults>
            {filteredResults
              ? filteredResults?.totalCount
              : data?.totalCount || 0}{' '}
            results
          </TotalResults>
          {loading ? (
            <Loading>
              <Spinner color={`#cf9fff`} />
            </Loading>
          ) : data ? (
            <>
              <SearchResults
                filteredResults={filteredResults}
                fetchData={fetchData}
                data={data}
              />
              <Pagination>
                <Icon onClick={() => handlePagination('prev')}>
                  <LeftIcon />
                  Prev
                </Icon>
                Page {page}
                <Icon onClick={() => handlePagination('next')}>
                  Next
                  <RightIcon />
                </Icon>
              </Pagination>
            </>
          ) : null}
        </List>
      </ResultsWrapper>
      {error ? <Navigate to="/error" replace /> : null}
    </Container>
  );
};

// Styled Component Definations
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
    background-color: ${theme.colors.secondary};
    padding: 1rem;
    color: ${theme.colors.primary};
  `}
`;

const Icon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    padding: 0.25rem;
    color: ${theme.colors.secondary};
    cursor: pointer;

    &:hover {
      border-radius: 10px;
      padding: 0.25rem;
      border: 1px solid ${theme.colors.secondary};
    }
  `}
`;

const IconLink = styled(Link)`
  ${({ theme }) => css`
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: ${theme.colors.primary};
  `}
`;

const ResultsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

const TotalResults = styled.div`
  ${({ theme }) => css`
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: left;
  `}
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Loading = styled(DivFlexCenter)`
  height: 50vh;
  top: 25%;
  left: 50%;
`;

const Dropdowns = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media screen and (max-width: 800px) {
    gap: 0;
    justify-content: space-between;
  }
`;

const Pagination = styled(DivFlexCenter)`
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

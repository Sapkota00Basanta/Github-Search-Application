/**
 * This module consists of all the type decleration for SearchBar Component
 */
export interface ISearchBarProps {
  intialInputValue: string | '';
  placeHolder: string;
  onSubmit: (inputValue: string) => void;
}

// Import User-Defined Modules
import { ISortLanguagesTypes } from '../types/common/SortLanguaues.interface';

/**
 * sort the data
 * @param data Array of data to be sorted
 * @returns Sorted Data
 */
export const sortLanguages = (data: ISortLanguagesTypes) => {
  const languages = data?.items?.reduce(
    (acc: any, item: any) => (
      (acc[item.language] = (acc[item.language] || 0) + 1), acc
    ),
    {}
  );
  const sortedLanguages = [];
  for (const lang in languages) {
    if (lang !== 'null') {
      sortedLanguages.push({ label: lang, count: languages[lang] });
    }
  }

  sortedLanguages
    .sort((a, b) => {
      return a.count - b.count;
    })
    .reverse();

  return sortedLanguages;
};

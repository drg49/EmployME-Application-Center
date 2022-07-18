import React from 'react';
import debounce from 'lodash.debounce';

export default function SearchCriteria({ 
  searchForJobApps, jobTitleRef, jobLocRef, setResults, page, setPage 
}) {
  const handleChange = () => {
    if (jobTitleRef.current.value.trim() === '' && jobLocRef.current.value.trim() === '') return;
    setResults([]);
    if (page !== 1) {
      return setPage(1);
    }
    return searchForJobApps();
  }

  const debouncedChangeHandler = React.useMemo(() => debounce(handleChange, 300), []);

  return(
    <div id="search-criteria">
      <input
        type="text"
        placeholder="Job Title"
        onChange={debouncedChangeHandler}
        ref={jobTitleRef}
      />
      <input
        type="text"
        placeholder="Location"
        onChange={debouncedChangeHandler} 
        ref={jobLocRef}
      />
    </div>
  )
}

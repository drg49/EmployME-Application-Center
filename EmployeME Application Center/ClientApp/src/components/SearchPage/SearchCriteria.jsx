import React from 'react';
import * as api from '../../api/jobApplications';
import debounce from 'lodash.debounce';

export default function SearchCriteria({ setResults, setIsLoading }) {
  const jobTitleRef = React.useRef();
  const jobLocRef = React.useRef();

  const handleChange = () => {
    if (jobTitleRef.current.value === '' && jobLocRef.current.value === '') return;

    setIsLoading(true);

    api.searchForJobApplications(jobTitleRef.current.value, jobLocRef.current.value)
      .then((data) => {
        setResults(data);
        setIsLoading(false);
      });
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

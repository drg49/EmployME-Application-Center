import React from 'react';
import * as api from '../../api/jobApplications';
import debounce from 'lodash.debounce';

export default function SearchCriteria({ setResults }) {
  const jobTitleRef = React.useRef();
  const jobLocRef = React.useRef();

  const handleChange = () => {
    api.searchForJobApplications(jobTitleRef.current.value, jobLocRef.current.value)
      .then((data) => setResults(data));
  }

  const debouncedChangeHandler = React.useMemo(() => debounce(handleChange, 300), []);

  return(
    <div>
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

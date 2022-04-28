import React from 'react';
import debounce from 'lodash.debounce';

export default function SearchCriteria() {
  const jobTitleRef = React.useRef();
  const jobLocRef = React.useRef();

  const handleChange = () => {
    console.log(jobTitleRef.current.value, jobTitleRef.current.value)
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
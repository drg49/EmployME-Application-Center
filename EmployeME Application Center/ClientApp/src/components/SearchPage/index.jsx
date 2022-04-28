import React from 'react';
import SearchCriteria from './SearchCriteria';
import * as api from '../../api/jobApplications';

export default function SearchPage(props) {
  
  const jobTitle = props.match.params.jobTitle;
  const jobLocation = props.match.params.jobLocation;

  React.useEffect(() => {
    console.log(jobTitle, jobLocation)
    api.searchForJobApplications(jobTitle, jobLocation)
      .then((data) => console.log(data))
  }, []);

  return (
    <>
      <SearchCriteria />
    </>
  );
}
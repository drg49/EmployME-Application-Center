import React from 'react';
import SearchCriteria from './SearchCriteria';
import * as api from '../../api/jobApplications';
import SearchResults from './SearchResults';

import './index.scss'

export default function SearchPage(props) {
  const [results, setResults] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const jobTitle = props.match.params.jobTitle;
  const jobLocation = props.match.params.jobLocation;

  React.useEffect(() => {
    if (jobTitle && jobLocation) {
    api.searchForJobApplications(jobTitle, jobLocation)
      .then((data) => console.log(data))
    }
  }, [jobLocation, jobTitle]);

  return (
    <>
      <SearchCriteria setResults={setResults} setIsLoading={setIsLoading} />
      <SearchResults results={results} isLoading={isLoading} />
    </>
  );
}

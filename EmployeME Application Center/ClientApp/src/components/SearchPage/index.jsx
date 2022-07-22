import React from 'react';
import SearchCriteria from './SearchCriteria';
import * as api from '../../api/jobApplications';
import SearchResults from './SearchResults';

import './index.scss'

export default function SearchPage(props) {
  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [paginateActive, setPaginateActive] = React.useState(false);

  const pageSize = 10;
  const jobTitleRef = React.useRef();
  const jobLocRef = React.useRef();

  //const jobTitleParam = props.match.params.jobTitleParam || "anything";
  //const jobLocParam = props.match.params.jobLocParam || "anywhere";

  // React.useEffect(() => {
  //   console.log(jobTitleParam, jobLocParam)
  //   if (jobTitleParam && jobLocParam) {
  //     api.searchForJobApplications(jobTitleParam, jobLocParam, pageSize, page)
  //           .then((data) => console.log(data));
  //   }
  // }, [jobLocParam, jobTitleParam, page]);

  const searchForJobApps = () => {
    api.searchForJobApplications(jobTitleRef.current.value.trim(), jobLocRef.current.value.trim(), pageSize, page)
      .then((data) => {
        if(data.length > 0) {
          setResults(results.concat(data));
        }
        setPaginateActive(false);
        setIsLoading(false);
      });
  }
  
  React.useEffect(() => searchForJobApps(), [page]);

  return (
    <>
      <SearchCriteria
        searchForJobApps={searchForJobApps}
        jobTitleRef={jobTitleRef}
        jobLocRef={jobLocRef}
        setResults={setResults}
        page={page}
        setPage={setPage}
        setIsLoading={setIsLoading}
      />
      <SearchResults
        results={results}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        paginateActive={paginateActive}
        setPaginateActive={setPaginateActive}
      />
    </>
  );
}

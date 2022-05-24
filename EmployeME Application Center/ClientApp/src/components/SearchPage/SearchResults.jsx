import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faMapMarker } from '@fortawesome/free-solid-svg-icons'

const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size="8x" style={{ 'marginTop': '20px' }} />
const pin = <FontAwesomeIcon icon={faMapMarker} color="gray" />

export default function SearchResults({ results, isLoading }) {
  const [resultUI, setResultUI] = React.useState(<></>);

  React.useEffect(() => {
    setResultUI(results?.map((item, index) => {
      return (
        <div key={index} id="job-app-card">
          <section>
            <p>{item.jobTitle}</p>
            <p>{item.companyName}</p>
            <br/>
            <p><span>{pin}</span> {item.jobLocation}</p>
          </section>
          <button className="em-global-add-btn">
            Apply
          </button>
        </div>
      )
    }));
  }, [results]);

  return (
    <>
      {isLoading && spinner}
      {!isLoading ? resultUI : null}
    </>
  )
}

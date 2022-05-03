import React from 'react'

export default function SearchResults({ results }) {
  const [resultUI, setResultUI] = React.useState(<></>);

  React.useEffect(() => {
    setResultUI(results?.map((item, index) => {
      return (
        <div key={index}>
          {item.jobTitle}
          {item.jobLocation}
          {item.companyName}
        </div>
      )
    }));
  }, [results]);

  return (
    <>
      {resultUI}
    </>
  )
}

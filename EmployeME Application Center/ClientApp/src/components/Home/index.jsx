import React from "react";
import { useHistory } from "react-router-dom";

import "./index.scss"
import InfoBox from "./InfoBox";

export default function Home() {
    const history = useHistory();
    const jobTitleRef = React.useRef();
    const jobLocationRef = React.useRef();

    return (
      <>
        <div id="banner">
            <div id="banner-content">
               <h1>The best place to find your next career</h1>
               <div id="search">
                 <p>Search for jobs</p>
                 <div>
                   <input type="text" placeholder="Job Title" ref={jobTitleRef} />
                   <input type="text" placeholder="Location" ref={jobLocationRef} />
                 </div>
                 <button
                   id="search-btn"
                   onClick={() => {
                     if (jobTitleRef.current.value || jobLocationRef.current.value) {
                      history.push(`search/${jobTitleRef.current.value}/${jobLocationRef.current.value}`)
                     }
                   }}
                 >
                   Search
                 </button>
               </div>
            </div>
        </div>
        <section id="home-page-info">
          <InfoBox
            title='Opportunities For Employers'
            paragraph='The EmployME job board is a place where people can find their next career. The job postings on this site come from employers who use our employee management system. Employers can post jobs in seconds using our application builder.'
            buttonText='Become an Employer'
            link='/'
          />
          <InfoBox
            title='Find Your Passion'
            paragraph='There are plenty of directions to take when trying to choose a career. If you are looking for an answer, feel free to take our career quiz. It is perfect for students who are about to enter the workforce, or for anyone else who is trying to learn more about themselves.'
            buttonText='Take Our Career Quiz'
            link='/career-quiz'
          />
          <InfoBox
            title='Discover Companies'
            paragraph='While searching for a job, there are countless companies to consider. Job opportunities posted on EmployME will include a company profile. By using our enhanced search feature, you can easily find your dream company to work for.'
            buttonText='Search for Companies'
            link='/search'
          />
        </section>
      </>
    )
}

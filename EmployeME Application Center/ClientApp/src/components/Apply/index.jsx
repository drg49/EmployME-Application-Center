import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as toastMethods from '../Toasts/toastMethods';
import * as api from '../../api/jobApplications';
import * as parser from './questionParser';
import './index.scss';

const moment = require('moment');

const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size="8x" />;

export default function Apply(props) {
  const appId = props.match.params.appId;
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({}); // Data to build the job application
  const [jobAppData, setJobAppData] = React.useState({}); // Job app fields filled out by the applicant
  const [addressTwoField, setAddressTwoField] = React.useState(null);

  const addSecondAddress = (isRequired) => setAddressTwoField(
      <div id="second-address">
        {parser.addressFields(isRequired)}
      </div>
    )

  React.useEffect(() => {
    setIsLoading(true);
    api.getjobApplication(appId)
      .then(async (response) => {
        if (!response.ok){
          const message = await response.text();
          return toastMethods.notifyError(message || "There was an issue finding this job application");
        }
        return response.json();
      })
      .then((result) => {
        result.defaultQuestions = JSON.parse(result.defaultQuestions);   
          api.getCustomJobAppQuestions(result.appId)
            .then((customQuestions) => {
              result.customQuestions = customQuestions;
              setData(result);
              setIsLoading(false);
            })
            .catch(() => toastMethods.notifyError("There was an error, please try again later"))
      })
  }, []);

  const addressTwo = (isRequired) => (
    <>
      {addressTwoField}
      {!addressTwoField &&
      <button
        onClick={() => addSecondAddress(isRequired)}
        className='em-global-add-btn'
      >
        Add Another Address
      </button>}
      {addressTwoField && removeSecondAddress()}
    </>
  );

  const removeSecondAddress = () => (
    <button
      onClick={() => setAddressTwoField(null)}
      className='em-global-danger-btn'
    >
      Remove Second Address
    </button>
  )

  const defaultMapper = () => (
    data.defaultQuestions.map((item, index) => {
      return (
        <div key={index} className="job-app-question">
          <strong>{parser.parseQuestionText(item.name)}</strong>
          {parser.parseInputField(item.name, item.checked, jobAppData, setJobAppData)}
          {item.name === 'addressTwo' && addressTwo(item.checked)}
        </div>
      )
    })
  );

  const customMapper = () => (
    data.customQuestions.map((item, index) => {
      return (
        <div key={index} className="job-app-question">
          <strong>{item.question}</strong>
          {parser.parseCustomQuestion(item.inputFieldType, item.required, index)}
        </div>
      )
    })
  );

  React.useEffect(() => console.log(jobAppData), [jobAppData]);

  return (
    <>
      {isLoading ? spinner : 
      <>
        <h2>{data.jobTitle} - {data.companyName}</h2>
        <span>{data.jobLocation}</span>
        <p>Posted on {moment(data.uploadDate).format('LL')}</p>
        <section id="job-app-question-wrapper">
          {data.defaultQuestions?.length > 0 && defaultMapper()}
          {data.customQuestions?.length > 0 && customMapper()}
        </section>
        <button id="complete-job-app">Complete</button>
      </>
      }
    </>
  )
}

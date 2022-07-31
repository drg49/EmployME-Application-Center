import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as toastMethods from '../Toasts/toastMethods';
import * as api from '../../api/jobApplications';
import * as parser from './defaultQuestionParser';

const moment = require('moment');

const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size="8x" />;

export default function Apply(props) {
  const appId = props.match.params.appId;
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({});

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
              console.log(result); //
              setData(result);
              setIsLoading(false);
            })
            .catch(() => toastMethods.notifyError("There was an error, please try again later"))
      })
  }, []);

  const mapper = () => (
    data.defaultQuestions.map((item, index) => {
      return (
        <div key={index} className="job-app-question">
          <strong>{parser.parseQuestionText(item.name)}</strong>
          {parser.parseInputField(item.name, item.checked)}
        </div>
      )
    })
  );

  return (
    <>
      {isLoading ? spinner : 
      <>
        <h2>{data.jobTitle} - {data.companyName}</h2>
        <span>{data.jobLocation}</span>
        <p>Posted on {moment(data.uploadDate).format('LL')}</p>
        {data.defaultQuestions && mapper()}
      </>
      }
    </>
  )
}

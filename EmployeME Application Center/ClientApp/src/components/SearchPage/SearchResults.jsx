import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import ModalActionHeader from '../ModalActionHeader';

const moment = require('moment');

const spinner = <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size="8x" style={{ 'marginTop': '20px' }} />
const pin = <FontAwesomeIcon icon={faMapMarker} color="gray" />

Modal.setAppElement('#root');

export default function SearchResults({ results, isLoading }) {
  const [resultUI, setResultUI] = React.useState(<></>);
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    jobAppData: {}
  });

  const history = useHistory();

  const openJobModal = (jobData) => setModalState({ isOpen: true, jobAppData: jobData });

  const applyBtn = (jobAppId) => (
    <button 
      className="em-global-add-btn" 
      onClick={(e) => {
        e.stopPropagation(); // Prevents the onClick event of the parent div
        history.push(`apply/${jobAppId}`)
      }}
    >
      Apply
    </button>
  )

  React.useEffect(() => {
    setResultUI(results?.map((item, index) => {
      return (
        <div key={index} id="job-app-card" className='card' onClick={() => openJobModal(item)}>
          <section>
            <p>{item.jobTitle}</p>
            <p>{item.companyName}</p>
            <br/>
            <p><span>{pin}</span> {item.jobLocation}</p>
          </section>
          {applyBtn(item.appId)}
        </div>
      )
    }));
  }, [results]);

  return (
    <>
      {isLoading ? spinner : resultUI}
      <Modal
        isOpen={modalState.isOpen}
        className="modal mediumModal"
        overlayClassName="myoverlay"
      >
        <ModalActionHeader
          title={modalState.jobAppData.jobTitle}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
        />
        <strong>{modalState.jobAppData.companyName} | {modalState.jobAppData.jobLocation}</strong>
        <p>Posted on {moment(modalState.jobAppData.uploadDate).format('LL')}</p>
        <p>{modalState.jobAppData.description}</p>
        {applyBtn(modalState.jobAppData.appId)}
      </Modal>
    </>
  )
}

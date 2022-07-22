import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import ModalActionHeader from '../ModalActionHeader';

const moment = require('moment');

const spinner = (size, style) => <FontAwesomeIcon icon={faSpinner} spin color="#2b2d2f" size={size} style={style} />
const pin = <FontAwesomeIcon icon={faMapMarker} color="gray" />

Modal.setAppElement('#root');

export default function SearchResults({ results, isLoading, page, setPage, paginateActive, setPaginateActive }) {
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

  const paginate = (e) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom && !isLoading) {
      setPaginateActive(true);
      setPage(page + 1);
    }
  }

  return (
    <>
      <div
        id="search-results"
        onScroll={paginate}
      >
        {isLoading ? spinner("8x", { 'marginTop': '20px' }) : resultUI}
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
      </div>
      {paginateActive && spinner("1x", {})}
    </>
  )
}

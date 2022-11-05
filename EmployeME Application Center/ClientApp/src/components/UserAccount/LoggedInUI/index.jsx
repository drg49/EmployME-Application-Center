import React from 'react';
import Modal from 'react-modal';
import ModalActionHeader from '../../ModalActionHeader';
import FirstPanel from './FirstPanel';

export default function LoggedInUI({userInfo, logoutBtn}) {
  const [isEdit, setIsEdit] = React.useState(false);
  const [editData, setEditData] = React.useState({
    userId: userInfo?.userId,
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
  });
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    title: '',
    content: null
  });

  React.useEffect(() => console.log(editData), [editData]);

  return (
    <div id="profile-page">
      <FirstPanel
        userInfo={userInfo}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editData={editData}
        setEditData={setEditData}
        setModalState={setModalState}
        logoutBtn={logoutBtn} 
      />
      <Modal
        isOpen={modalState.isOpen}
        className="modal mediumModal"
        overlayClassName="myoverlay"
      >
        <ModalActionHeader
          title={modalState.title}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
        />
        {modalState.content}
      </Modal>
    </div>
  )
}
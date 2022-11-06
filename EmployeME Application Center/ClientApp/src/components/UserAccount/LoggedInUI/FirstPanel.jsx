import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faSave } from '@fortawesome/free-solid-svg-icons';
import * as api from '../../../api/authentication';
import ChangeProfilePicture from './ChangeProfilePicture';

const editIcon = <FontAwesomeIcon icon={faPencil} color="#666666" size="2x"/>
const saveIcon = <FontAwesomeIcon icon={faSave} color="green" size="2x"/>

export default function FirstPanel({ userInfo, isEdit, setIsEdit, editData, setEditData, setModalState, logoutBtn }) {
  const saveChanges = () => {
    api.updateUser(editData)
      .then(() => {
        console.log('Done loading')
        setIsEdit(false);
      });
  }

  const handleChange = e => setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleProfilePicUpdate = () => setModalState({ isOpen: true, title: 'Change Profile Picture', content: <ChangeProfilePicture /> });

  return (
    <section id="first-panel">
        <div id="profile-pic">
          <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="Profile Pic" />
          {isEdit ?
            <>
              <span
                className='mock-link'
                onClick={handleProfilePicUpdate}
              >
                Change Picture
              </span>
              <div>
                <input
                  type="text"
                  placeholder="First Nm"
                  title='Enter your first name'
                  maxLength={15}
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Last Nm"
                  title='Enter your last name'
                  maxLength={15}
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleChange}
                />
              </div>
            </>
          :
          <p>{userInfo?.firstName + " " + userInfo?.lastName}</p>
          }
        </div>
        <button
          id="edit-btn"
          onClick={() => isEdit ? saveChanges() : setIsEdit(true)}
          title={isEdit ? 'Save' : 'Edit Profile'}
        >
          {isEdit ? saveIcon : editIcon}
        </button>
        {logoutBtn} 
      </section>
  )
}
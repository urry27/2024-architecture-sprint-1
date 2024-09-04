import React from 'react';
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProfileMain from "./ProfileMain";

function ProfileApp( { setCurrentUser }) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

    function handleUpdateUser(userUpdate) {
      api
        .setUserInfo(userUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeProfilePopups();
        })
        .catch((err) => console.log(err));
    }
  
    function handleUpdateAvatar(avatarUpdate) {
      api
        .setUserAvatar(avatarUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeProfilePopups();
        })
        .catch((err) => console.log(err));
    }

    function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
    }
  
    function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
    }

    function closeProfilePopups() {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
    }

  return (
    <>
      <ProfileMain
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
        />
      <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeProfilePopups}
        />
      <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeProfilePopups}
       />
    </>
  );
}

export default ProfileApp;

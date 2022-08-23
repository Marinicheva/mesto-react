import React from "react";
import api from "../utils/api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(info => setCurrentUser(info))
      .catch(err => console.error(err));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then(newData => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleUpdateAvatar = (avatarData) => {
    api.setUserAvatar(avatarData)
      .then(newData => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="add-place"
          title="Новое место"
          buttonText="Добавить"
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        >
          <input
            className="popup__input popup__input-place-name"
            type="text"
            name="name"
            id="place-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error place-name-input-error"></span>
          <input
            className="popup__input popup__input-place-link"
            type="url"
            name="link"
            id="place-link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error place-link-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Удалить"
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

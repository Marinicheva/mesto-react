import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopup = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonText="Cохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
      >
        <input
          className="popup__input popup__input-name"
          type="text"
          name="name"
          id="user-name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error user-name-input-error"></span>
        <input
          className="popup__input popup__input-about"
          type="text"
          name="about"
          id="user-about"
          placeholder="Пару слов о Вас"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__input-error user-about-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="add-place"
        title="Новое место"
        buttonText="Добавить"
        onClose={closeAllPopup}
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
        onClose={closeAllPopup}
      />

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        buttonText="Обновить"
        onClose={closeAllPopup}
        isOpen={isEditAvatarPopupOpen}
      >
        <input
          className="popup__input popup__input-avatar-link"
          type="url"
          name="avatar"
          id="avatar-link"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__input-error avatar-link-input-error"></span>
        {/*  */}
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopup} />
    </div>
  );
}

export default App;

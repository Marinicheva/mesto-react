import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpenState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpenState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpenState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditAvatarClick = () => {
    setEditAvatarOpenState(true);
  };

  const handleEditProfileClick = () => {
    setEditProfileOpenState(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlaceOpenState(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopup = () => {
    setEditAvatarOpenState(false);
    setEditProfileOpenState(false);
    setAddPlaceOpenState(false);
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
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
        children={
          <>
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
            <button className="popup__btn" type="submit" data-name="Сохранить">
              Сохранить
            </button>
          </>
        }
      />

      <PopupWithForm
        name="add-place"
        title="Новое место"
        onClose={closeAllPopup}
        isOpen={isAddPlacePopupOpen}
        children={
          <>
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
            <button className="popup__btn" type="submit" data-name="Создать">
              Создать
            </button>
          </>
        }
      />

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        onClose={closeAllPopup}
        children={
          <button
            className="popup__btn popup__btn-delete"
            type="submit"
            data-name="Да"
          >
            Да
          </button>
        }
      />

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        onClose={closeAllPopup}
        isOpen={isEditAvatarPopupOpen}
        children={
          <>
            <input
              className="popup__input popup__input-avatar-link"
              type="url"
              name="avatar"
              id="avatar-link"
              placeholder="Ссылка на аватар"
              required
            />
            <span className="popup__input-error avatar-link-input-error"></span>
            <button
              className="popup__btn popup__btn-update"
              type="submit"
              data-name="Сохранить"
            >
              Сохранить
            </button>
          </>
        }
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopup} />
    </div>
  );
}

export default App;

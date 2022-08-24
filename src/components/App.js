import React from "react";
import api from "../utils/api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  //Стейты
  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
  const [isRenderLoading, setIsRenderLoading] = React.useState(false);


  React.useEffect(() => {
    Promise.all([api.getCardList(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData)
      })
      .catch((err) => console.error(err));
  }, []);

  //Открытие попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //Закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  //Рендер загрузки
  const renderLoading = () => {
    setIsRenderLoading(isRenderLoading => !isRenderLoading);
  }

  //Действия с карточками (просмотр, лайк, удаление, добавление)
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter(item => item._id !== card._id));
    });
  };

  const handleAddPlaceSubmit = (cardData) => {
    api.addNewCard(cardData)
      .then(data => setCards([data, ...cards]))
      .then(() => closeAllPopups())
      .then(() => renderLoading())
      .catch(err => console.error(err));
  }

  //Изменение данных пользователя (данные, аватар)
  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then(newData => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .then(() => renderLoading())
      .catch(err => console.log(err));
  }

  const handleUpdateAvatar = (avatarData) => {
    api.setUserAvatar(avatarData)
      .then(newData => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .then(() => renderLoading())
      .catch(err => console.log(err));
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          isRenderLoading={isRenderLoading}
          renderLoading={renderLoading}
          renderLoadingButtonText={'Сохранение...'}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRenderLoading={isRenderLoading}
          renderLoading={renderLoading}
          renderLoadingButtonText={'Обновление...'}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewCard={handleAddPlaceSubmit}
          isRenderLoading={isRenderLoading}
          renderLoading={renderLoading}
          renderLoadingButtonText={'Добавление...'}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Удалить"
          onClose={closeAllPopups}
          isRenderLoading={isRenderLoading}
          renderLoading={renderLoading}
          renderLoadingButtonText={'Удаление...'}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";

function App() {
  //Стейты
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState("");

  const [isRenderLoading, setIsRenderLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getCardList(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
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

  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card);
  };

  //Закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  };

  //Рендер загрузки
  const renderLoading = () => {
    setIsRenderLoading((isRenderLoading) => !isRenderLoading);
  };

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

  const handleCardDelete = () => {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== deletedCard._id)
        );
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => renderLoading());
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addNewCard(cardData)
      .then((data) => setCards([data, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.error(err))
      .finally(() => renderLoading());
  };

  //Изменение данных пользователя (данные, аватар)
  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => renderLoading());
  };

  const handleUpdateAvatar = (avatarData) => {
    api
      .setUserAvatar(avatarData)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => renderLoading());
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
          onCardDelete={handleDeleteCardClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRenderLoading={isRenderLoading}
          renderLoading={renderLoading}
          renderLoadingButtonText={"Сохранение..."}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRenderLoading={isRenderLoading}
          renderLoading={renderLoading}
          renderLoadingButtonText={"Обновление..."}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewCard={handleAddPlaceSubmit}
          isRenderLoading={isRenderLoading}
          renderLoading={renderLoading}
          renderLoadingButtonText={"Добавление..."}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          isRenderLoading={isRenderLoading}
          renderLoading={renderLoading}
          onDeleteCard={handleCardDelete}
        />

        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups} 
        />
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

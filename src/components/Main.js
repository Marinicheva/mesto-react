import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../utils/api";
import Card from "./Card";

function Main({ onCardClick, onAddPlace, onEditAvatar, onEditProfile }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getCards()
      .then(cardData => setCards(cardData))
      .catch(err => console.error(err));
  }, []);

  const cardItems = cards.map((item) => {
    return <Card key={item._id} card={item} onCardClick={onCardClick} />;
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="Фото автора страницы"
              className="profile__avatar"
            />
            <button
              className="profile__edit-avatar-btn"
              type="button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn"
            aria-label="Изменить данные профиля"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn"
          aria-label="Добавить новое фото"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery" aria-label="Галерея фотографий пользователя">
        <ul className="gallery__list">{cardItems}</ul>
      </section>
    </main>
  );
}

export default Main;

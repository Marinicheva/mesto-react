import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
      .then(([userData, cardData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardData);
      })
      .catch((err) => console.error(err));
  }, []);

  const cardItems = cards.map((item) => {
    return <Card key={item._id} card={item} onCardClick={props.onCardClick} />;
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar-container">
            <img
              src={userAvatar}
              alt="Фото автора страницы"
              className="profile__avatar"
            />
            <button
              className="profile__edit-avatar-btn"
              type="button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-btn"
            aria-label="Изменить данные профиля"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          className="profile__add-btn"
          aria-label="Добавить новое фото"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="gallery" aria-label="Галерея фотографий пользователя">
        <ul className="gallery__list">{cardItems}</ul>
      </section>
    </main>
  );
}

export default Main;

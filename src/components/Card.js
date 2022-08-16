function Card({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <li className="gallery__item">
      <img
        src={card.link}
        alt={card.name}
        className="gallery__img"
        onClick={handleCardClick}
      />
      <div className="gallery__item-footer">
        <h2 className="gallery__img-caption">{card.name}</h2>
        <div className="gallery__like-container">
          <button
            className="gallery__like-btn"
            aria-label="Нравится"
            type="button"
          ></button>
          <p className="gallery__like-counter">
            {card.likes.length > 0 ? card.likes.length : null}
          </p>
        </div>
      </div>
      <button
        className="gallery__delete-btn"
        aria-label="Удалить карточку"
        type="button"
      ></button>
    </li>
  );
}

export default Card;

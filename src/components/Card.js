function Card(props) {
  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  return (
    <li className="gallery__item">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="gallery__img"
        onClick={handleCardClick}
      />
      <div className="gallery__item-footer">
        <h2 className="gallery__img-caption">{props.card.name}</h2>
        <div className="gallery__like-container">
          <button
            className="gallery__like-btn"
            aria-label="Нравится"
            type="button"
          ></button>
          <p className="gallery__like-counter">
            {props.card.likes.length > 0 ? props.card.likes.length : null}
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

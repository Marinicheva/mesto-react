function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_fullscreen-img ${
        props.card ? "popup_opened" : ""
      }`}
    >
      <div className="popup__fullscreen-container">
        <img
          src={props.card ? props.card.link : '#'}
          alt={props.card ? props.card.name: ''}
          className="popup__img-fullscreen"
        />
        <h2 className="popup__fullscreen-caption">{props.card ? props.card.name: ''}</h2>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;

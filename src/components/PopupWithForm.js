function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          action="#"
          method="POST"
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__btn popup__btn-update" type="submit">
            {buttonText}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;

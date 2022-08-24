import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddNewCard}) {

  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');
 

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddNewCard({name: placeName, link: placeLink});
  }

  const handleChangePlaceName = (evt) => {
    setPlaceName(evt.target.value)
  }

  const handleChangePlaceLink = (evt) => {
    setPlaceLink(evt.target.value)
  }



  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Добавить"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-place-name"
        type="text"
        name="name"
        id="place-name"
        placeholder="Название"
        value={placeName}
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangePlaceName}
      />
      <span className="popup__input-error place-name-input-error"></span>
      <input
        className="popup__input popup__input-place-link"
        type="url"
        name="link"
        id="place-link"
        placeholder="Ссылка на картинку"
        value={placeLink}
        required
        onChange={handleChangePlaceLink}
      />
      <span className="popup__input-error place-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

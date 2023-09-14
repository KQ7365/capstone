import { useEffect, useState } from "react";
import { CryptoFavoriteList } from "../../services/CryptoFavoriteList";
import { NotesPost } from "../../services/NotesPost";

export const MyPortfolio = ({ currentUser }) => {
  const [favoriteCryptoList, setFavoriteCryptoList] = useState([]);
  const [newCryptoObject, setNewCryptoObject] = useState({
    cryptoName: "",
    note: "",
    image: "",
    currentUserId: { currentUser },
  });

  useEffect(() => {
    CryptoFavoriteList().then((favorites) => {
      const filteredFavorites = favorites.filter(
        (fav) => fav.userId.currentUser.id === currentUser.id
      );
      setFavoriteCryptoList(filteredFavorites);
    });
  }, [currentUser]);

  const handleInputChange = (e) => {
    const itemCopy = { ...newCryptoObject };
    itemCopy[e.target.name] = e.target.value;
    setNewCryptoObject(itemCopy);
  };

  const handleAddNotesClick = (e) => {
    e.preventDefault();

    const newNotesItem = {
      name: newCryptoObject.cryptoName,
      note: newCryptoObject.note,
      imageUrl: newCryptoObject.image,
      currentUser: { currentUser },
    };

    NotesPost(newNotesItem);
  };

  return (
    <form>
      <fieldset>
        <select
          onChange={handleInputChange}
          name="cryptoName"
          value={favoriteCryptoList.id}
        >
          <option value="0">Choose one of your crypto favorites</option>
          {favoriteCryptoList.map((favObj) => {
            return (
              <option key={favObj.id} value={favObj.cryptoName}>
                {favObj.cryptoName}
              </option>
            );
          })}
        </select>
      </fieldset>

      <fieldset>
        <label>Enter Notes</label>
        <input
          name="note"
          required
          type="text"
          className="setLater"
          placeholder=""
          onChange={handleInputChange}
        ></input>
      </fieldset>

      <fieldset>
        <label>Enter image link</label>
        <input
          name="image"
          required
          type="text"
          className="setLater"
          placeholder="https://www.example.com"
          onChange={handleInputChange}
        ></input>
      </fieldset>

      <button onClick={handleAddNotesClick}>Add Note</button>
    </form>
  );
};

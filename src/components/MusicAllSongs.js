import React, { useState } from "react";
import "./MusicAllSongs.css";

const MusicAllSongs = (props) => {
  const { albums } = props;
  const [searchedSong, setSearchedSong] = useState("");

  const filteredSongs = albums.filter((item) => {
    return searchedSong !== ""
      ? item.title.toLowerCase().includes(searchedSong.toLowerCase())
      : item;
  });
  return (
    <div className="song-wrapper">
      <br />
      <input
        type="text"
        className="input-field"
        id="search"
        placeholder="Search Songs here"
        variant="standard"
        onChange={(e) => {
          setSearchedSong(e.target.value);
        }}
      />
      {filteredSongs.map((value, key) => (
        <div key={key} className="song-wrapper-item">
          <img
            className="thumbnail-img"
            src={value.thumbnailUrl}
            alt="thumbnailUrl"
          />
          <p className="title-text">Song Name - {value["title"]}</p>
          <p className="title-text">Albumn number - {value["albumId"]}</p>
        </div>
      ))}
    </div>
  );
};
export default MusicAllSongs;

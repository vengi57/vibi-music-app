import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MusicPlayerWrapper from "./components/MusicPlayerWrapper";

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  const setViBiSongs = async () => {
    const responce = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    const data = await responce.json();
    console.log(data);
    let splitedData = data.splice(0,100);
    setAlbums(splitedData);
  };
  const setViBiAlbumns = async () => {
    const responce = await fetch(`https://jsonplaceholder.typicode.com/albums`);
    const data = await responce.json();
    console.log(data);
    let splitedData = data.splice(0,100);
    setSongs(splitedData);
  };
  useEffect(() => {
    setViBiSongs();
    setViBiAlbumns();
  }, []);
  return (
    <div className="App">
      <Header />
      <MusicPlayerWrapper albums={albums} songs={songs} />
    </div>
  );
};

export default App;

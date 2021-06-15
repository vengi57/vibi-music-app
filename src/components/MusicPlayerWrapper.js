import React from "react";
import MusicAllSongs from "./MusicAllSongs";
import MusicPlayList from "./MusicPlayList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./MusicPlayerWrapper.css";
const MusicPlayer = (props) => {
  return (
    <Router>
      <div className="music-wrapper">
        <p>
          <Link to="/"><span>All Songs</span></Link>
        </p>
        <p>
          <Link to="/playlist"><span>Playlist</span></Link>
        </p>
      </div>
      <div>
        <Switch>
          <Route exact path="/">
            <MusicAllSongs albums={props.albums} />
          </Route>
          <Route path="/playlist">
            <MusicPlayList albums={props.albums} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default MusicPlayer;

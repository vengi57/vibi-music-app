import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";
import "./MusicPlayList.css";

const MusicPlayList = (props) => {
  const { albums } = props;
  const [playListName, setPlayListName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openTextField, setOpenTextField] = useState(false);
  const [openPlayList, setOpenPlayList] = useState(false);
  const [playListArr, setPlayListArr] = useState([]);
  const [selectedPlayList, setSelectedPlayList] = useState("");
  const [playListArrWithSongs, setPlayListArrWithSongs] = useState([]);
  const [filteredPlayListData, setFilteredPlayListData] = useState([]);
  const [searchDataInsidePlayList, setSearchDataInsidePlayList] = useState([]);
  const [songInPlayList, setSongInPlayList] = useState("");

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenTextFiled = () => {
    setOpenTextField(true);
  };

  const handleCloseTextFiled = () => {
    setOpenTextField(false);
  };

  const createNewPlaylist = () => {
    debugger;
    if(playListArr.length> 0){
      playListArr.map((obj)=>{
       if(obj['playlist_name']!==playListName){
         let newPlayListObj = {};
         newPlayListObj["playlist_name"] = playListName;
         setPlayListArr([...playListArr, newPlayListObj]);
         handleCloseTextFiled(false);
       }else{
         swal(
           "Error !",
           "Playlist Name already exists",
           "error"
         );
       }
     })
    }else{
      let newPlayListObj = {};
      newPlayListObj["playlist_name"] = playListName;
      setPlayListArr([...playListArr, newPlayListObj]);
      handleCloseTextFiled(false);
    }
  };

  const addSongsToPlaylist = (playlistName) => {
    setOpen(true);
    setSelectedPlayList(playlistName);
  };

  const addSongs = (song) => {
    let obj = {};
    obj["playListName"] = selectedPlayList;
    obj["title"] = song.title;
    obj["albumId"] = song.albumId;
    obj["date_time"] = new Date().toLocaleString();
    setPlayListArrWithSongs([...playListArrWithSongs, obj]);
    localStorage.setItem("playList", JSON.stringify(playListArrWithSongs));
    swal(
      "Success !",
      `Song added to ${selectedPlayList.toUpperCase()} Playlist`,
      "success"
    );
  };

  const ViewSongsonPlayList = (selectedPlayList) => {
    setOpenPlayList(true);

    setFilteredPlayListData(
      _.filter(playListArrWithSongs, {
        playListName: selectedPlayList,
      })
    );
  };

  const classes = useStyles();

  const shuffle = () => {
    setFilteredPlayListData(_.shuffle(filteredPlayListData));
  };

  const searchInsidePlayList = (value) => {
    setSongInPlayList(value);
    let data = _.filter(filteredPlayListData, { title: value });
    setSearchDataInsidePlayList(data);
  };

  const closePlaylist =()=>{
    setOpenPlayList(false)
    setSearchDataInsidePlayList([])
  }

  const setNewPlaylistName=(value)=>{
    setPlayListName(value)
  }
  return (
    <div className="playlist-wrapper">
      <br />
      <Button
        variant="outlined"
        style={{ cursor: "pointer" }}
        color="primary"
        onClick={handleClickOpenTextFiled}
      >
        Create New Playlist
      </Button>
      {playListArr.map((value, key) => (
        <div key={key}>
          <br />
          <h2 className="playlist-text">{value["playlist_name"]}</h2>
          <br />
          <Button
            variant="outlined"
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={() => addSongsToPlaylist(value["playlist_name"])}
          >
            Add Songs
          </Button>
          &emsp;
          <Button
            variant="outlined"
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={() => ViewSongsonPlayList(value["playlist_name"])}
          >
            View Songs
          </Button>
        </div>
      ))}
      <Dialog
        open={openTextField}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New PlayList</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginLeft: "25%" }}
            id="outlined-basic"
            label="Enter Playlist Name"
            variant="outlined"
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={createNewPlaylist}
          >
            Save
          </Button>
          &emsp;
          <Button
            variant="outlined"
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={handleCloseTextFiled}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xl"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select the songs for adding into playlist"}
        </DialogTitle>
        <DialogContent>
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Song Name</TableCell>
                    <TableCell align="center">Albumn Number</TableCell>
                    <TableCell align="center">Add to PlayList</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {albums.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="center">{row.albumId}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Add a song" arrow>
                          <AddIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => addSongs(row)}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPlayList}
        fullWidth={true}
        maxWidth={"xl"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Songs on PlayList</DialogTitle>
        <DialogContent>
          <div className="alert-dialog-flex">
            <DialogContentText>
              <Button
                variant="outlined"
                style={{ cursor: "pointer", height: "56px" }}
                color="primary"
                onClick={shuffle}
              >
                Shuffle the Playlist
              </Button>
            </DialogContentText>
            <DialogContentText>
              <TextField
                variant="outlined"
                style={{ cursor: "pointer" }}
                color="primary"
                label="Serach for the song"
                onChange={(e) => searchInsidePlayList(e.target.value)}
              />
            </DialogContentText>
          </div>


          <DialogContentText id="alert-dialog-description">
            <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Song Name</TableCell>
                      <TableCell align="center">Albumn Number</TableCell>
                      <TableCell align="center">Date & Time </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchDataInsidePlayList &&
                    searchDataInsidePlayList.length > 0
                      ?  searchDataInsidePlayList.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align="left">{row.title}</TableCell>
                          <TableCell align="center">{row.albumId}</TableCell>
                          <TableCell align="center">
                            {row.date_time}
                          </TableCell>
                        </TableRow>
                      ))
                      : filteredPlayListData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="left">{row.title}</TableCell>
                            <TableCell align="center">{row.albumId}</TableCell>
                            <TableCell align="center">
                              {row.date_time}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            style={{ cursor: "pointer" }}
            color="primary"
            onClick={closePlaylist}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default MusicPlayList;

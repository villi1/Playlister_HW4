import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MUIEditSongModal() {
  const { store } = useContext(GlobalStoreContext);
  const [title, setTitle] = useState(store.currentSong.title);
  const [artist, setArtist] = useState(store.currentSong.artist);
  const [youTubeId, setYouTubeId] = useState(store.currentSong.youTubeId);

  function handleConfirmEditSong() {
    let newSongData = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    store.addUpdateSongTransaction(store.currentSongIndex, newSongData);
  }

  function handleCancelEditSong() {
    store.hideModals();
  }

  function handleUpdateTitle(event) {
    setTitle(event.target.value);
  }

  function handleUpdateArtist(event) {
    setArtist(event.target.value);
  }

  function handleUpdateYouTubeId(event) {
    setYouTubeId(event.target.value);
  }

  return (
    <Modal open={store.currentSong !== null}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography component='h1' variant='h4'>
              Edit Song
            </Typography>
          </Grid>
          <Typography component='h1' variant='h6'>
            Title
          </Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            fullWidth
            defaultValue={title}
            onChange={handleUpdateTitle}
          />
          <Typography component='h1' variant='h5'>
            Artist
          </Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            fullWidth
            defaultValue={artist}
            onChange={handleUpdateArtist}
          />
          <Typography component='h1' variant='h5'>
            YouTubeId
          </Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            fullWidth
            defaultValue={youTubeId}
            onChange={handleUpdateYouTubeId}
          />
          <Grid item xs={12}>
            <Box
              component='span'
              m={1}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Button variant='contained' onClick={handleConfirmEditSong}>
                Confirm
              </Button>
              <Button variant='contained' onClick={handleCancelEditSong}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

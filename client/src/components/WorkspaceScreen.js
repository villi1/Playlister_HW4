import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SongCard from './SongCard.js';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
  const { store } = useContext(GlobalStoreContext);
  store.history = useHistory();

  if (!store.currentList) {
    store.history.push('/');
    store.history.go(0);
  }
  
  let modalJSX = '';
  if (store.isEditSongModalOpen()) {
    modalJSX = <MUIEditSongModal />;
  } else if (store.isRemoveSongModalOpen()) {
    modalJSX = <MUIRemoveSongModal />;
  }
  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <List
          id='playlist-cards'
          sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
          {store.currentList.songs.map((song, index) => (
            <SongCard
              id={'playlist-song-' + index}
              key={'playlist-song-' + index}
              index={index}
              song={song}
            />
          ))}
        </List>
      </Box>

      {modalJSX}
    </Box>
  );
}

export default WorkspaceScreen;
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import ConnectBtn from '../ConnectBtn/ConnectBtn';
import PlaylistList from '../PlaylistList/PlaylistList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My PlayList',
      playlistTracks: [], 
      connected: '',
      profileImage: '',
      playlists: [],
    }
    this.addTrack = this.addTrack.bind(this); 
    this.removeTrack = this.removeTrack.bind(this); 
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);

  };

  componentDidMount() {
    this.getUserPlaylists();
  }

  getUserPlaylists() {
    Spotify.getUserPlaylists().then((playlists) => {
      this.setState({ playlists });
    });
  };

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks})
  };

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)

    this.setState({playlistTracks: tracks})
  };

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  };
  
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New playlist",
        playlistTracks: []
      })
    }
    ) 
  };

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    })
  }

  connect() {
    Spotify.connect().then(response => {
      if(response.id) {
        // console.log(response);
        this.setState({
          connected: response.display_name,
        });
      if (response) {
        this.setState({profileImage: response.images[0].url})
      } else {
        return response.images[0].url
      }
      }
    });
  }

  disconnect() {
    Spotify.disconnect();
    window.location.reload();
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <ConnectBtn onConnect={this.connect} onDisconnect={this.disconnect} connected={this.state.connected} imageUrl={this.state.profileImage} />
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            />
          </div>
          <PlaylistList playlists={this.state.playlists} />
        </div>
      </div>
    )
  }
}

export default App;

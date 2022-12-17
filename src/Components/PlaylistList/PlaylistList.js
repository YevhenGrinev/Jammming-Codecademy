import React from "react";
import './PlaylistList.css';
import PlaylistItem from "../PlaylistItem/PlaylistItem";

export default class PlaylistList extends React.Component {
  render() {
    return (
      <div className="PlaylistList">
        <h2>Your Playlists</h2>
        <>
        {this.props.playlists && this.props.playlists.map((playlist) => {
          return (
            <PlaylistItem
            playlistItemName={playlist.playlistName}
            playlistItemKey={playlist.playlistId}
            playlistQuantity={playlist.playlistQuantity}
            />
          );
        })}
        </>
      </div>
    );
  }
}
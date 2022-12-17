import React from "react";
import './PlaylistItem.css';

class PlaylistItem extends React.Component {
    render() {
        return (
            <div className="PlaylistItem">
                <h3>{this.props.playlistItemName}</h3>
                <span>Traks: {this.props.playlistQuantity}</span>

            </div>
        )
    }    
}

export default PlaylistItem
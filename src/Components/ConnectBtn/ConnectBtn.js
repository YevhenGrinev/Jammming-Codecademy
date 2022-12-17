import React from 'react';
import './ConnectBtn.css';

class ConnectBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.connected) {
        this.props.onDisconnect();
    } else {
        this.props.onConnect();
    }
  }

  render() {
    let buttonText;
    let toolTip;
    let buttonClass;
    let imageClass;

    if (this.props.connected) {
      buttonText = this.props.connected;
      toolTip = (
        <span className="tooltiptext">Disconnect from Spotify</span>
      );
      buttonClass = 'Disconnect-button tooltip';
      imageClass = 'Profile-image Visible'
    } else {
      buttonText = 'CONNECT TO SPOTIFY';
      buttonClass = 'Connect-button';
      imageClass = 'Profile-image'
    }
    return (
      <div className='Connect'>
        <a className={buttonClass} onClick={this.handleClick}>
          <img className={imageClass} src={this.props.imageUrl} alt=''/>
          {buttonText}
          {toolTip}
        </a>
      </div>
    );
  }
}

export default ConnectBtn;
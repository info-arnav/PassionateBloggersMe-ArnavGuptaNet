import React, { Component } from "react";
import { withToastManager } from "react-toast-notifications";

class ConnectivityListener extends Component {
  state = { isOnline: window ? window.navigator.onLine : false };

  // NOTE: add/remove event listeners omitted for brevity

  onlineCallback = () => {
    this.props.toastManager.remove(this.offlineToastId);
    this.offlineToastId = null;
  };
  offlineCallback = (id) => {
    this.offlineToastId = id;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { isOnline } = this.state;

    if (prevState.isOnline !== isOnline) {
      return { isOnline };
    }

    return null;
  }
  componentDidUpdate(props, state, snapshot) {
    if (!snapshot) return;

    const { toastManager } = props;
    const { isOnline } = snapshot;

    const content = (
      <div>
        <strong>{isOnline ? "Online" : "Offline"}</strong>
        <div>
          {isOnline
            ? "Reload to view changes"
            : "Please connect to internet for new content or visit home page for some previous posts of people you follow"}
        </div>
      </div>
    );

    const callback = isOnline ? this.onlineCallback : this.offlineCallback;

    toastManager.add(
      content,
      {
        appearance: "info",
        autoDismiss: isOnline,
      },
      callback
    );
  }
  render() {
    return null;
  }
}

export default withToastManager(ConnectivityListener);

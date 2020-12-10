import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

class OfflineNotify extends Component {
  componentDidMount() {
    toast.warning("Offline ! connect to wifi to load posts, etc");
  }
  render() {
    return <ToastContainer></ToastContainer>;
  }
}

export default OfflineNotify;

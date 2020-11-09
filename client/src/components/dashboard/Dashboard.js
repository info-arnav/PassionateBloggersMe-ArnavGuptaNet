import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Navigation from "../../elements/Navigation";
import Wysiwyg from "../../elements/Wysiwyg";

class Dashboard extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  constructor(props) {
    super(props);
    this.state = { inputValue : "", editorState: EditorState.createEmpty(),data: [], sdata: { confirmed: true }, loading: true };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  async componentDidMount() {
    const { user } = this.props.auth;
    await fetch(`/posts/user/${user.name}`)
      .then((e) => e.json())
      .then((e) => this.setState({ data: e }))
      .then(async (e) => await fetch(`/datas/user/${user.name}`))
      .then((e) => e.json())
      .then((e) => this.setState({ sdata: e }))
      .then((e) => this.setState({ loading: false }));
  }

  render() {
    const { sdata, editorState, inputValue } = this.state;
    const { data, loading } = this.state;
    const { user } = this.props.auth;
    return (
      <div>
        {loading ? (
          <div>
            <Navigation />
            <main className="page registration-page">
              <section className="clean-block clean-form dark">
                <h1>load</h1>
                <div className="container">
                  <div className="block-heading">
                    <h2 className="text-info">
                      <Skeleton />
                    </h2>
                  </div>
                  <form>
                    <div className="form-group">
                      <input
                        value={user.name}
                        className="form-control item"
                        type="text"
                        id="name"
                        name="name"
                        hidden
                      />
                    </div>
                    <div className="form-group">
                      <Skeleton />

                      <Skeleton />
                    </div>
                    <div className="form-group">
                      <Skeleton />
                      <Skeleton />
                    </div>
                    <div className="form-group">
                      <Skeleton />
                    </div>
                  </form>
                </div>
              </section>
            </main>
          </div>
        ) : (
          <div>
            {sdata.confirmed == true ? (
              <div>
                <Navigation />
                <main className="page registration-page">
                  <section className="clean-block clean-form dark">
                    <h1 />
                    <div className="container">
                      <div className="block-heading">
                        <h2 className="text-info">New Blog</h2>
                      </div>
                      <form action="/teams/submit" method="POST">
                        <div className="form-group">
                          <input
                            value={user.name}
                            className="form-control item"
                            type="text"
                            id="name"
                            name="name"
                            hidden
                          />
                          <input
                            value={sdata._id}
                            className="form-control item"
                            type="text"
                            id="userId"
                            name="userId"
                            hidden
                          />
                        </div>
                        <div className="form-group">
                          <label for="subject">Subject</label>
                          <input
                            className="form-control item"
                            type="text"
                            id="subject"
                            name="subject"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label for="blog">Blog</label>
                          <input
                            className="form-control item"
                            type="text"
                            id="blog"
                              name="blog"
                              hidden
                              required
                              value = {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                          />
                          <div class="wysiwyg">
                        <Editor className = "wsiwyg"
            editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        /></div>
                          </div>
                        <div className="form-group">
                          <button
                            className="btn btn-primary btn-block btn-lg"
                            type="submit"
                          >
                            Submit Form
                          </button>
                        </div>
                      </form>
                    </div>
                  </section>
                </main>
              </div>
            ) : (
              <div>
                <Navigation />
                <main className="page registration-page">
                  <section className="clean-block clean-form dark">
                    <h1>load</h1>
                    <div className="container">
                      <div className="block-heading">
                        <h2 className="text-info">Verify</h2>
                      </div>
                      <form>
                        <a href={`/request/verification/${sdata._id}`}>
                          Request Verification Email by clicking here
                        </a>
                      </form>
                    </div>
                  </section>
                </main>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

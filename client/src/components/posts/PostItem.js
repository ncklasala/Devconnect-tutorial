import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth, showActions } = this.props;

    return (
      <section className="container">
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to="/profile">
              <img className="round-img" src={post.avatar} alt="" />
              <h4>{post.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes),
                    })}
                  />
                  <span className="badge badge-like">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr1"
                >
                  <i className="text info fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </section>
    );
  }
}
PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);

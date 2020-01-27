import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import { isEmpty, map, pick } from "lodash";
import { TiEdit, TiTrash } from 'react-icons/ti'
import { ImageType } from "../../shared/types";
import ArtForm from "../artForm/artForm";
import { fetchArt, onDeleteArt, onEditArt, onUpdateArt } from "../../actions/images";

import "./imageList.scss";

class ImageList extends Component {
  static propTypes = {
    uploaded: PropTypes.objectOf(ImageType),
    fetchArt: PropTypes.func.isRequired,
    onDeleteArt: PropTypes.func.isRequired,
    onEditArt: PropTypes.func.isRequired,
    onUpdateArt: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.fetchArt();
  }

  handleDelete = id => {
    return ev => {
      ev.preventDefault();
      this.props.onDeleteArt(id);
    };
  };

  handleEdit = id => {
    return ev => {
      ev.preventDefault();
      this.props.onEditArt(id);
    };
  };

  renderImageInfoRow = (image, field, label) => {
    const value = image[field];
    if (!value) {
      return "";
    }
    return (
      <div className="image-list__info" key={field}>
        <label className="image-list__info__label">{label}</label>
        <div className="image-list__info__value">{image[field]}</div>
      </div>
    );
  };

  onUpdate = formValues => {
    this.props.onUpdateArt(formValues);
  };

  renderShowOrEdit = image => {
    const { id } = image;
    const isEditing = this.props.editing && this.props.editing.id === id;
    if (isEditing) {
      return (
        <Fragment>
          <ArtForm initialValues={this.props.editing} onSubmit={this.onUpdate} />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {this.renderImageInfoRow(image, "title", "Title")}
          {this.renderImageInfoRow(image, "year", "Year")}
          {this.renderImageInfoRow(image, "medium", "Medium")}
          {this.renderImageInfoRow(image, "dimensions", "Size")}
          {this.renderImageInfoRow(image, "price", "Price")}
        </Fragment>
      );
    }
  };

  renderArt = () => {
    const { uploaded } = this.props;
    const ids = Object.keys(uploaded).sort((a, b) => b - a);

    return ids.map(id => {
      const image = uploaded[id];
      return (
        <li className="image-list__item-wrapper" key={id}>
          <header className="image-list__item-header">
            <button title="edit" className="image-list__edit image-list__action" onClick={this.handleEdit(id)}>
              <TiEdit />
            </button>
            <button
              title="delete"
              className="image-list__delete image-list__action"
              disabled={this.isEditing}
              onClick={this.handleDelete(id)}
            >
              <TiTrash />              
            </button>
          </header>
          <div className="image-list__item">
            <img className="image-list__image" src={image.file} />
            {this.renderShowOrEdit(image)}
          </div>
        </li>
      );
    });
  };

  render() {
    if (isEmpty(this.props.uploaded)) {
      return null;
    }
    return (
      <div className="image-list">
        <ul className="image-list__images">{this.renderArt()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return pick(state.images, "isLoading", "uploaded", "editing");
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArt: data => dispatch(fetchArt(data)),
    onDeleteArt: data => dispatch(onDeleteArt(data)),
    onEditArt: data => dispatch(onEditArt(data)),
    onUpdateArt: data => dispatch(onUpdateArt(data)),
  };
};

export { ImageList };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageList);

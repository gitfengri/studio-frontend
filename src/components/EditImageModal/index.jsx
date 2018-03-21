import React from 'react';
import { Button, CheckBox, InputText, Modal } from '@edx/paragon';

import edxBootstrap from '../../SFE.scss';

const placeHolderImageSource = 'https://images.pexels.com/photos/39803/pexels-photo-39803.jpeg?w=940&h=650&auto=compress&cs=tinysrgb';

export default class EditImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageDescription: '',
      imageDimensions: {},
      imageIsDecorative: false,
      imageSource: '',
      proportionsAreConstrained: false,
    };

    this.onConstrainProportionsClick = this.onConstrainProportionsClick.bind(this);
    this.onImageDescriptionBlur = this.onImageDescriptionBlur.bind(this);
    this.onImageIsDecorativeClick = this.onImageIsDecorativeClick.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.onImageSourceBlur = this.onImageSourceBlur.bind(this);
    this.onInsertImageButtonClick = this.onInsertImageButtonClick.bind(this);

    this.formRef = {};
  }

  onConstrainProportionsClick = (checked) => {
    this.setState({
      proportionsAreConstrained: checked,
    });
  }

  onImageIsDecorativeClick = (checked) => {
    this.setState({
      imageIsDecorative: checked,
    });
  }

  onImageLoad = ({ target: img }) => {
    this.setState({
      imageDimensions: {
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
      },
    });
  }

  onImageSourceBlur = (imageSource) => {
    this.setState({
      imageSource,
    });
  }

  onImageDescriptionBlur = (imageDescription) => {
    this.setState({
      imageDescription,
    });
  }

  onImageDimensionChange = (dimensionType) => {
    let aspectRatio;
    let newDimensionType;

    if (dimensionType === 'height') {
      aspectRatio = this.state.imageDimensions.aspectRatio;
      newDimensionType = 'width';
    } else if (dimensionType === 'width') {
      aspectRatio = (1 / this.state.imageDimensions.aspectRatio);
      newDimensionType = 'height';
    } else {
      throw new Error(`Unknown dimension type ${dimensionType}.`);
    }

    return (dimensionValue) => {
      if (this.state.proportionsAreConstrained) {
        // should this be rounded only for display or for all things? should I use a percentange instead?
        const newDimensionValue = Math.round(dimensionValue * aspectRatio);
        const newImageDimensions = { ...this.state.imageDimensions };
        newImageDimensions[newDimensionType] = newDimensionValue;

        this.setState({ imageDimensions: newImageDimensions });
      }
    };
  }

  onInsertImageButtonClick = () => {
    this.formRef.dispatchEvent(new CustomEvent('submitForm',
      {
        bubbles: true,
        detail: {
          height: this.state.imageDimensions.height,
          width: this.state.imageDimensions.width,
          source: this.state.imageSource,
        },
      },
    ));
  }

  getImageSourceInput = () => (
    <InputText
      name="imageSourceURL"
      label="Image Source URL"
      description="Copy Studio URL from Files & Uploads or use an external image URL."
      id="imageSourceURL"
      type="text"
      onBlur={this.onImageSourceBlur}
    />
  );

  getImageDescriptionInput = () => (
    <fieldset className="border p-3">
      <legend>Image Description</legend>
      <InputText
        name="imageDescription"
        label="Image Description (Alt Text)"
        description="Used by screen readers and when the image cannot be shown. E.g. 'The sky with clouds'."
        id="imageDescription"
        type="text"
        disabled={this.state.imageIsDecorative}
        onBlur={this.onImageDescriptionBlur}
      />
      <CheckBox
        id="isDecorative"
        name="isDecorative"
        label="This image is decorative only."
        description="Screen readers will ignore this image. Use for background images only."
        onChange={this.onImageIsDecorativeClick}
      />
    </fieldset>
  );

  getImageDimensionsInput = () => (
    <fieldset className="border p-3">
      <legend>Image Dimensions</legend>
      <InputText
        name="imageWidth"
        label="Width"
        id="imageWidth"
        type="text"
        value={'width' in this.state.imageDimensions ? `${this.state.imageDimensions.width}` : ''}
        inline
        onChange={this.onImageDimensionChange('width')}
      />
      <InputText
        name="imageHeight"
        label="Height"
        id="imageHeight"
        type="text"
        value={'height' in this.state.imageDimensions ? `${this.state.imageDimensions.height}` : ''}
        inline
        onChange={this.onImageDimensionChange('height')}
      />
      <CheckBox
        id="constrainProportions"
        name="constrainProportions"
        label="Constrain proportions?"
        onChange={this.onConstrainProportionsClick}
      />
    </fieldset>
  );

  getModalBody = () => (
    <div className={edxBootstrap.row}>
      <div className={edxBootstrap['col-4']}>
        <img
          alt="placeholder"
          src={this.state.imageSource}
          onLoad={this.onImageLoad}
        />
      </div>
      <div className={edxBootstrap.col}>
        <form onSubmit={this.onFormSubmit} ref={(input) => { this.formRef = input; }}>
          {this.getImageSourceInput()}
          {this.getImageDescriptionInput()}
          {this.getImageDimensionsInput()}
        </form>
      </div>
    </div>
  );

  render = () => (
    <Modal
      open
      title="Insert/Edit Image"
      body={this.getModalBody()}
      onClose={() => { }}
      buttons={[
        <Button
          label="Insert Image"
          buttonType="primary"
          onClick={this.onInsertImageButtonClick}
        />]}
    />
  );
}

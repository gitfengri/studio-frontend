import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@edx/paragon';

import WrappedMessage from '../../utils/i18n/formattedMessageWrapper';
import messages from './displayMessages';


const AssetsClearFiltersButton = ({ clearFilters, courseDetails }) => (
  <Button
    buttonType="link"
    onClick={() => clearFilters(courseDetails)}
    label={
      <WrappedMessage message={messages.assetsClearFiltersButtonLabel} />
    }
  />
);

AssetsClearFiltersButton.propTypes = {
  clearFilters: PropTypes.func.isRequired,
  courseDetails: PropTypes.shape({
    lang: PropTypes.string,
    url_name: PropTypes.string,
    name: PropTypes.string,
    display_course_number: PropTypes.string,
    num: PropTypes.string,
    org: PropTypes.string,
    id: PropTypes.string,
    revision: PropTypes.string,
  }).isRequired,
};

export default AssetsClearFiltersButton;

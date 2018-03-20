import React from 'react';
import { Modal } from '@edx/paragon';
import './EditImageModal.scss';

const EditImageModal = () => (
  <Modal
    open
    title="Edit Image"
    body="Sample Edit Image Modal"
    onClose={() => { }}
  />
);

export default EditImageModal;

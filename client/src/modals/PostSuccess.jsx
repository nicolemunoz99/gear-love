import React from 'react';
import Modal from './Modal.jsx';

const PostSuccess = (props) => {
  return (
    <Modal width={8} changeModal={props.changeModal}>
        <div className="full-height">
          <div className="text-center vertical-align-hack h3">
            Successfully added part
          </div>
          </div>

    </Modal>
  )
};

export default PostSuccess;
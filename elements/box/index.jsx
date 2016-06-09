import React, {PropTypes} from 'react';
import {Col} from 'react-flexbox-grid/lib';

const Box = (props) => {
  return (
    <Col {...props}>
        <div>
          {props.children}
        </div>
    </Col>
  );
};

Box.propTypes = {
  type: PropTypes.oneOf(['row', 'container', 'nested', 'large']).isRequired,
  children: PropTypes.node
};

export default Box;
import React from 'react';
import TextField from 'material-ui/TextField';

const CoveragePage = (props) => {
  return (
    <div className="coverage-page">
      <TextField
        floatingLabelText="Enter the desired coverage amount here"
        floatingLabelFixed={true}
      />
    </div>
  )
};

export default CoveragePage;

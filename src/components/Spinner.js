import React from 'react';

export const Spinner = props => {
  return (
    <div className="ui segment" style={{ minHeight: "10em" }}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">{props.message} Loading</div>
      </div>
      <p></p>
    </div>
  );
};

export default Spinner;
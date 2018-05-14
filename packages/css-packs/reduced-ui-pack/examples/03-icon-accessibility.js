// @flow

import React from 'react';
// eslint-disable-next-line
import icons from '!!raw-loader!../src/icons-sprite.svg';

// eslint-disable-next-line react/no-danger
const Spritemap = () => <div dangerouslySetInnerHTML={{ __html: icons }} />;

export default () => (
  <div>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@atlaskit/reduced-ui-pack@8.8.0/dist/bundle.css"
    />
    <Spritemap />
    <div className="ak-field-group">
      <label htmlFor="dummy">Dummy input</label>
      <input
        type="text"
        className="ak-field-text ak-field__size-medium"
        id="dummy"
        placeholder="Focus on this field then tab to the button"
      />
    </div>
    <p>
      <button type="button" className="ak-button ak-button__appearance-default">
        <svg focusable="false" className="ak-icon" aria-label="Add">
          <use xlinkHref="#ak-icon-add" />
        </svg>
      </button>
    </p>
  </div>
);

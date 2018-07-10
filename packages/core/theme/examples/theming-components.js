// @flow

import React, { Component, Fragment } from 'react';
import { Theme } from '../src';

const DefaultButtonTheme = props => (
  <Theme
    button={(state, theme) => ({
      backgroundColor: state.hover ? '#ddd' : '#eee',
      textColor: '#333',
      ...theme(state),
    })}
    {...props}
  />
);

const AppTheme = props => (
  <Theme
    button={state => ({
      backgroundColor: state.hover ? 'rebeccapurple' : 'palevioletred',
      textColor: state.hover ? '#fff' : 'papayawhip',
    })}
    {...props}
  />
);

const CustomButtonTheme = props => (
  <DefaultButtonTheme>
    <Theme
      button={(state, theme) => ({
        ...theme(state),
        backgroundColor: state.hover ? 'palevioletred' : 'rebeccapurple',
      })}
      {...props}
    />
  </DefaultButtonTheme>
);

// ESLint thinks these are unused even though we are using props.*.
type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  children: React.Node,
  // eslint-disable-next-line react/no-unused-prop-types
  theme: Component,
};

type State = {
  hover: Boolean,
};

class Button extends Component<Props, State> {
  static defaultProps = {
    theme: DefaultButtonTheme,
  };
  state = {
    hover: false,
  };
  onMouseEnter = () => this.setState({ hover: true });
  onMouseLeave = () => this.setState({ hover: false });
  render() {
    const { props, state } = this;
    return (
      <props.theme>
        {({ button }) => {
          const { backgroundColor, textColor: color } = button(state);
          return (
            <button
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              style={{
                backgroundColor,
                border: 0,
                borderRadius: 3,
                color,
                cursor: 'pointer',
                marginBottom: 10,
                marginRight: 10,
                padding: 10,
              }}
              type="button"
            >
              {props.children}
            </button>
          );
        }}
      </props.theme>
    );
  }
}

export default () => (
  <Fragment>
    <Button>Default</Button>
    <AppTheme>
      <Button>Context</Button>
      <Button theme={CustomButtonTheme}>Custom</Button>
    </AppTheme>
  </Fragment>
);

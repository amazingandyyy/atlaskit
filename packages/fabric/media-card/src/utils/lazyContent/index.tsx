import * as React from 'react';
import LazilyRender from 'react-lazily-render';

/*
  I could have used LazilyRender directly whereever LazyContent is used, but it was easier to test
  with enzyme (the .find() method just works, no need to execute the render fn)
*/

export interface LazyContentProps {
  placeholder?: JSX.Element;
  children?: React.ReactNode;
}

export interface LazyContentState {}

export class LazyContent extends React.Component<
  LazyContentProps,
  LazyContentState
> {
  render() {
    const { children, placeholder } = this.props;
    return (
      <LazilyRender>{render => (render ? children : placeholder)}</LazilyRender>
    );
  }
}

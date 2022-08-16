import React from 'react';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res?.statusCode || err?.statusCode || null;
    return { statusCode };
  }

  render() {
    return <div>Error Page</div>;
  }
}

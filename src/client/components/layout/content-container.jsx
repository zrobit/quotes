import React, {Component} from 'react';

class Content extends Component {
  render() {
    return (
      <section className="content">
        {this.props.children}
      </section>
    );
  }
}

export default Content;

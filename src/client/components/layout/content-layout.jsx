import React, {Component} from 'react';
import Header from './header-container';

class ContentLayout extends Component {
  render() {
    return (
      <div>
        <Header/>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default ContentLayout;

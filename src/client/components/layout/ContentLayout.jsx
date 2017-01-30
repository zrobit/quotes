import React, {Component} from 'react';
import Header from "./HeaderContainer";


class ContentLayout extends Component {
  render() {
    return (
      <div>
        <Header/>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default ContentLayout

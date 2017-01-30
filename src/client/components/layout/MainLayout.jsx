import React, {Component} from 'react';
import Header from "./HeaderContainer";


class Layout extends Component {
  render() {
    return (
      <div>
        <Header/>
        <section className="content-wrap">
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default Layout

import React, {Component} from 'react';
import MainLayout from './layout/main-layout';

class Main extends Component {
  render() {
    return (
      <MainLayout>
        {this.props.children}
      </MainLayout>
    );
  }
}

export default Main;

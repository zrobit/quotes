import React, {Component} from 'react';
import MainLayout from './layout/main-layout';
import HomeSection from './home/home-section';

class Main extends Component {
  render() {
    return (
      <MainLayout>
        {this.props.children || <HomeSection/>}
      </MainLayout>
    );
  }
}

export default Main;

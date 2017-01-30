import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import MainLayout from "./layout/MainLayout";
import HomeSection from "./home/HomeSection";

class Main extends Component {
  render() {
    return (
      <MainLayout>
        {this.props.children || <HomeSection />}
      </MainLayout>
    )
  }
}

export default Main

import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import MainLayout from "./layout/mainLayout";
import Home from "./home"

@observer
class Main extends Component {
  render() {
    return (
      <MainLayout>
        {this.props.children || <Home />}
      </MainLayout>
    )
  }
}

export default Main

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import ListItem from './ListItem';
import axios from 'axios';
import config from '../../config';
import * as actions from '../../actions/manual'

type Props = {
  manualFetch: Function
};

class Manual extends Component<Props> {
  componentWillMount() {
    this.props.manualFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ manual }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.datasource = ds.cloneWithRows(manual);
  }

  renderRow(item) {
    return <ListItem data={item} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.datasource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = ({ manual }) => {
  return { manual };
}

export default connect(mapStateToProps, actions)(Manual);
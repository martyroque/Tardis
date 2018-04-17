/**
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import config from '../../config';
import { Spinner } from '../common';

type Props = {
  token: String
};

class KeyFob extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      locked: true, 
      error: '',
      loading: false
    };
  }

  async toggleLockUnlock(action) {
    if (this.props.token !== null) {
      this.setState({ loading: true });

      try {
        await axios.post(`${config.apiUrl}/keyfob`, {
          type: action
        }, {
          headers: { Authorization: this.props.token }
        });

        const statusPoll = setInterval(async () => {
          const { data } = await axios.get(`${config.apiUrl}/keyfob?type=${action}`, {
            headers: { Authorization: this.props.token }
          });

          if (data.status !== 'in_progress') {
            this.setState({ loading: false, locked: action === 'LOCK' ? true : false });
            clearInterval(statusPoll);
          }
        }, 3000);
      } catch (err) {
        this.setState({
          loading: false,
          error: 'There was an error processing your request.' 
        });
      }
    }
  }

  renderFeedback() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Text>TARDIS is {this.state.locked ? 'Locked' : 'Unlocked'}</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.toggleLockUnlock('LOCK')}
            disabled={this.state.loading || this.state.locked}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/lock.png')} />
          </TouchableHighlight>
          <View style={{ height: 88, paddingTop: 35 }}>
            {this.renderFeedback()}
          </View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.toggleLockUnlock('UNLOCK')}
            disabled={this.state.loading || !this.state.locked}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/unlock.png')} />
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 4,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    padding: 8,
    width: 100,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f5Fcff',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    tintColor: '#5e81bc'
  }
});

const mapStateToProps = ({ auth }) => {
  const { token } = auth;

  return { token };
};

export default connect(mapStateToProps, {})(KeyFob);

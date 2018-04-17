/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../actions/auth';

import { Spinner } from '../common';

type Props = {
  loginUser: Function,
  loading: String,
  error: String,
  token: String
};

class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token !== null) {
      Actions.keyfob();
    }
  }

  handleSubmit = () => {
    const { username, password } = this.state;

    this.props.loginUser({ username, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={styles.errorContainer}>
            <Text style={{ color: '#fff' }}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" style={{ paddingTop: 20 }} />;
    }

    return (
      <TouchableOpacity
        style={styles.submit}
        onPress={this.handleSubmit}
        disabled={false}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('./img/tardis.png')} />
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.textField}
            placeholder={'username'}
            onChangeText={(text) => {this.setState((previous) => ({...previous, username: text}))}}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            secureTextEntry
            autoCapitalize='none'
            style={styles.textField}
            placeholder={'password'}
            onChangeText={(text) => {this.setState((previous) => ({...previous, password: text}))}}
          />
        </View>
        <View style={styles.rowContainer}>
          {this.renderError()}
        </View>
        <View style={styles.rowContainer}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  disabledSubmit: {
    alignItems: 'center',
    backgroundColor: '#b9ccee',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  image: {
    height: 240,
    marginBottom: 44,
    marginTop: 60,
    resizeMode: Image.resizeMode.contain,
    width: 240,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#5e81bc',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  text: {
    color: 'white'
  },
  textField: {
    borderColor: 'black',
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
    padding: 10,
  },
  errorContainer: { 
    backgroundColor: 'darkred', 
    marginTop: 20, 
    marginBottom: 10,
    padding: 10
  }
});

const mapStateToProps = ({ auth }) => {
  const { token, error, loading } = auth;

  return { token, error, loading };
};

export default connect(mapStateToProps, actions)(Login);

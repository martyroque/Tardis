import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Login, KeyFob, Manual } from './components';

const RouterComponent = () => (
  <Router>
    <Scene key="root" tabs>
      <Scene 
        key="login" 
        component={Login} 
        title="Please Login" 
        hideTabBar
      />
      <Scene key="main">
        <Scene 
          onRight={() => Actions.manual()} 
          rightTitle="Manual" 
          key="keyfob" 
          component={KeyFob} 
          title="KeyFob"
          renderBackButton={()=>(null)} 
          renderLeftButton={()=>(null)}
          hideTabBar
        />
        <Scene 
          key="manual" 
          component={Manual} 
          title="Manual"
          hideTabBar
        />
      </Scene>
    </Scene>
  </Router>
);

export default RouterComponent;
/* Core libraries */
import 'angular';
import '../lib/angular-animate';
import '../lib/angular-sanitize';
import '../lib/angular-ui-router/release/angular-ui-router.min.js';


import ngRedux from 'ng-redux';

import '../lib/ionic/js/ionic.js';
import '../lib/ionic/js/ionic-angular.js';
import '../lib/onezone-datepicker/dist/onezone-datepicker.min.js';

import 'ionic.app.scss';

/**
 * App
*/
import './app.routes.js';

// View Components
import './sections/login/login.component.js';
import './sections/signUp/signup.component.js';
import './sections/taskView/taskView.component.js'
import './sections/taskViewLists/taskViewLists.component.js';
import './sections/editTask/editTask.component.js';
import './sections/addTask/addTask.component.js';
import './sections/taskCalendar/taskCalendar.component.js';

// Ui Components
import './components/app.uiComponents.js';

import './services/AuthService.js';

// Root Reducer
import { RootReducer } from './reducers';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

angular.module('mainApp', [
  'ionic',
  'app.routes',
  'app.ui.components',
  'onezone-datepicker',

  ngRedux,

  // components
  'task.login',
  'task.signUp',
  'task.view',
  'task.view.lists',
  'task.edit',
  'task.addTask',
  'task.calendar',

  // services
  'app.auth'

])

.run(($ionicPlatform, $ngRedux, $rootScope, AuthService, $state) => {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // @TODO create redux auth
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

    if (!AuthService.isLoggedIn()) {

      console.log('$stateChangeStart', next.name);

      if (next.name !== 'login' && next.name !== 'signup') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });

})
.run(function (AuthService) {})
.config(($ngReduxProvider) => {

  $ngReduxProvider.createStoreWith(RootReducer, [thunk, createLogger()]);
})
.config(($httpProvider) => {

  // @TODO create redux auth
  $httpProvider.interceptors.push('AuthInterceptor');
})







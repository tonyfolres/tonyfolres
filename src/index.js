import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase/app';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
  apiKey: 'AIzaSyBxy-nUe8a0iFp1zYkhLy9h6SuoUolKZNs',
  authDomain: 'simple-appointment-manager.firebaseapp.com',
  projectId: 'simple-appointment-manager',
  storageBucket: 'simple-appointment-manager.appspot.com',
  messagingSenderId: '951602826186',
  appId: '1:951602826186:web:c22de33a121cbe8e479d33',
  measurementId: 'G-MQMEH75Y9Y'
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

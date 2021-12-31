// External
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// Internal
import { store } from './store';
import App from './App';

import './index.css';
import './antStyles.css';

ReactDOM.render(
  <Provider store={store}>
    <Router
      getUserConfirmation={() => {
        /* Empty callback to block the default browser prompt */
      }}
    >
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

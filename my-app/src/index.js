import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 다른 CSS 파일이 있다면 Bootstrap import 이후에 위치해야 함
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import (반드시 다른 import보다 먼저!)
import App from './App';
import { Provider } from 'react-redux';
import store from './component/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <App />
</Provider>
);
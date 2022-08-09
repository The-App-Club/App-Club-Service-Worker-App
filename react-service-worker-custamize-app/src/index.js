import React, {useReducer, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {reducer} from './worker/reducer';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {Controller} from './components/Controller';

import {ResultItemList} from './components/ResultItemList';

function App() {
  const [jobInfoList, setJobInfoList] = useState([]);

  const [info, dispatch] = useReducer(reducer, {
    taskName: 'Prime',
    queue: [],
  });

  return (
    <>
      <div>App</div>
      <Controller info={info} dispatch={dispatch}></Controller>
      <ResultItemList resultInfoList={info.queue}></ResultItemList>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

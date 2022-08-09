import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {addOrdinalSuffix} from './plugins/utils';
import {reducer} from './reducer';
import {Controller} from './components/Controller';
import {ResultItemList} from './components/ResultItemList';

import styled from '@emotion/styled';

const StyledContainer = styled.div``;

const StyledContainerHeader = styled.div`
  padding: 20px;
  color: white;
  background: #7a84dd;
`;

const StyledContainerHeaderContent = styled.h1``;

const StyledContainerContent = styled.div`
  width: 50%;
  padding: 0 5vw;
`;

const StyledErrorMessage = styled.p`
  color: red;
`;

function App() {
  const [info, dispatch] = React.useReducer(reducer, {
    err: '',
    num: '',
    computedFibs: [],
  });

  return (
    <StyledContainer>
      <StyledContainerHeader>
        <StyledContainerHeaderContent>
          Computing the nth Fibonnaci number
        </StyledContainerHeaderContent>
      </StyledContainerHeader>

      <StyledContainerContent>
        <StyledErrorMessage>{info.err}</StyledErrorMessage>

        <Controller info={info} dispatch={dispatch}></Controller>

        <ResultItemList results={info.computedFibs}></ResultItemList>
      </StyledContainerContent>
    </StyledContainer>
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

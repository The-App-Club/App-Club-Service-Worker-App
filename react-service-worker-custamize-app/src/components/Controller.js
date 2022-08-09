import {useState} from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import {getUUID} from '../plugins/uuid';

const StyledController = styled.div`
  padding: 30px;
`;

const Controller = ({info, dispatch}) => {
  const runWorker = ({id, fromNumber, toNumber, dispatch}) => {
    dispatch({type: 'SET_ERROR', errorInfo: {}});

    // ソースドットが大切
    const worker = new window.Worker('./findPrimesWorker.js');

    worker.postMessage({id, fromNumber, toNumber});
    worker.onerror = (error) => {
      console.log(error);
      dispatch({
        type: 'SET_ERROR',
        errorInfo: error,
      });
    };
    worker.onmessage = (e) => {
      if (!e.data.primeInfoList) {
        dispatch({
          type: 'PROGRESS',
          id: e.data.id,
          progress: e.data.progress,
          endTime: dayjs(),
        });
      } else {
        dispatch({
          type: 'UPDATE_RESULT',
          id: e.data.id,
          primeInfoList: e.data.primeInfoList,
          progress: 100,
          isLoading: false,
          endTime: dayjs(),
        });
      }
    };
  };

  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(200000);

  const handleClick = (e) => {
    const uuid = getUUID();

    dispatch({
      type: 'SET_ARGUMENT',
      id: uuid,
      fromNumber: fromValue,
      toNumber: toValue,
    });

    dispatch({
      type: 'EXECUTE',
      id: uuid,
      isLoading: true,
      startTime: dayjs(),
      endTime: dayjs(),
    });

    runWorker({id: uuid, fromNumber: fromValue, toNumber: toValue, dispatch});
  };

  const handleInputChange = (e, {type}) => {
    const value = Number(e.target.value);
    if (type === 'from') {
      setFromValue(value);
    }

    if (type === 'to') {
      setToValue(value);
    }
  };

  return (
    <StyledController className="controller">
      <p>
        Do a prime number search from{' '}
        <input
          id="from"
          type={'number'}
          min={0}
          max={200000}
          value={fromValue}
          onChange={(e) => {
            handleInputChange(e, {type: 'from'});
          }}
        />{' '}
        to{' '}
        <input
          id="to"
          min={0}
          max={200000}
          type={'number'}
          value={toValue}
          onChange={(e) => {
            handleInputChange(e, {type: 'to'});
          }}
        />
        .
      </p>
      <button className="search" onClick={handleClick}>
        Searching
      </button>
    </StyledController>
  );
};

export {Controller};

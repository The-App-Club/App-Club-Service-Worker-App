import styled from '@emotion/styled';
import {addOrdinalSuffix} from '../plugins/utils';

const StyledController = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  font-size: 25px;
  padding: 7.5px 10px;
`;

const StyledButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background: #07f;
  font-size: 24px;
  color: white;
  cursor: pointer;
  margin: 0 10px;
`;

const Controller = ({info, dispatch}) => {
  const runWorker = (num, id, dispatch) => {
    dispatch({type: 'SET_ERROR', err: ''});

    // ソースドットが大切
    const worker = new window.Worker('./fib-worker.js');
    console.log(worker);
    worker.postMessage({num});
    worker.onerror = (err) => err;
    worker.onmessage = (e) => {
      const {time, fibNum} = e.data;
      dispatch({
        type: 'UPDATE_FIBO',
        id,
        time,
        fibNum,
      });
      worker.terminate();
    };
  };

  return (
    <StyledController>
      <StyledInput
        type="number"
        value={info.num ? info.num : ''}
        placeholder="Enter a number"
        onChange={(e) =>
          dispatch({
            type: 'SET_NUMBER',
            num: window.Number(e.target.value),
          })
        }
      />

      <StyledButton
        id="submit-btn"
        onClick={() => {
          if (info.num < 2) {
            dispatch({
              type: 'SET_ERROR',
              err: 'Please enter a number greater than 2',
            });
            return;
          }

          const id = info.computedFibs.length;
          dispatch({
            type: 'SET_FIBO',
            id,
            loading: true,
            nth: addOrdinalSuffix(info.num),
          });
          runWorker(info.num, id, dispatch);
        }}
      >
        Calculate
      </StyledButton>
    </StyledController>
  );
};

export {Controller};

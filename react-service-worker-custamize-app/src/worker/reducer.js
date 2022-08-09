const updateQueueState = ({state, action}, objectKeyList = []) => {
  const job = state.queue.filter((item) => item.id === action.id)[0];
  const idx = state.queue.indexOf(job);
  for (let index = 0; index < objectKeyList.length; index++) {
    const objectKey = objectKeyList[index];
    job[objectKey] = action[objectKey];
  }
  state.queue[idx] = job;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {...state, errorInfo: action.errorInfo};
    case 'SET_ARGUMENT':
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            id: action.id,
            fromNumber: action.fromNumber,
            toNumber: action.toNumber,
          },
        ],
      };
      break;

    case 'EXECUTE':
      updateQueueState({state, action}, [
        'isLoading',
        'id',
        'startTime',
        'endTime',
      ]);
      return {...state};
      break;
    case 'PROGRESS':
      updateQueueState({state, action}, ['progress', 'id', 'endTime']);
      return {...state};
      break;
    case 'UPDATE_RESULT': {
      updateQueueState({state, action}, [
        'progress',
        'id',
        'isLoading',
        'primeInfoList',
        'endTime',
      ]);
      return {...state};
    }
    default:
      return state;
      break;
  }
};

export {reducer};

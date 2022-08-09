import styled from '@emotion/styled';
import {ResultItem} from './ResultItem';

const StyledResultItemList = styled.div``;

const ResultItemList = ({results}) => {
  return (
    <StyledResultItemList>
      {results.map((fb, index) => {
        const {id, nth, time, fibNum, loading} = fb;
        return (
          <ResultItem
            key={index}
            id={id}
            nth={nth}
            time={time}
            fibNum={fibNum}
            loading={loading}
          ></ResultItem>
        );
      })}
    </StyledResultItemList>
  );
};

export {ResultItemList};

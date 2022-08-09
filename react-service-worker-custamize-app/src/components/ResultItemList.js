import styled from '@emotion/styled';
import {ResultItem} from './ResultItem';

const StyledResultItemList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  gap: 3vw;
  flex-wrap: wrap;
`;

const ResultItemList = ({resultInfoList}) => {
  return (
    <StyledResultItemList>
      {resultInfoList.map((resultInfo, index) => {
        const {id, progress, primeInfoList, isLoading, startTime, endTime} =
          resultInfo;
        return (
          <ResultItem
            key={index}
            id={id}
            progress={progress}
            primeInfoList={primeInfoList}
            isLoading={isLoading}
            startTime={startTime}
            endTime={endTime}
          ></ResultItem>
        );
      })}
    </StyledResultItemList>
  );
};

export {ResultItemList};

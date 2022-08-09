import styled from '@emotion/styled';
import dayjs from 'dayjs';
const StyledResultItem = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 10px 0;
  background-color: #e09bb7;
  width: 30%;
  overflow: hidden;
  overflow-x: auto;
`;

const StyledEmphansis = styled.div`
  font-weight: bold;
`;

const StyledMessageArea = styled.div``;
const StyledStatusArea = styled.div``;

const StyledResultArea = styled.div``;

const ResultItem = ({
  id,
  progress,
  primeInfoList,
  isLoading,
  startTime,
  endTime,
}) => {
  return (
    <StyledResultItem key={id}>
      <StyledStatusArea>
        progress<StyledEmphansis>{progress || ''} %</StyledEmphansis>
      </StyledStatusArea>
      <StyledStatusArea>
        elapsed time
        <StyledEmphansis>
          {`${endTime.diff(startTime, 'seconds')} seconds`}
        </StyledEmphansis>
      </StyledStatusArea>
      <StyledResultArea>
        id<StyledEmphansis>{id}</StyledEmphansis>
        Prime List
        <StyledEmphansis>{JSON.stringify(primeInfoList)}</StyledEmphansis>
      </StyledResultArea>
    </StyledResultItem>
  );
};

export {ResultItem};

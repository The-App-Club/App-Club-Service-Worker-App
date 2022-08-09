import styled from '@emotion/styled';

const StyledResultItem = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 10px 0;
  background-color: #e09bb7;
`;

const StyledEmphansis = styled.span`
  font-weight: bold;
`;

const StyledMessageArea = styled.div``;
const StyledStatusArea = styled.div``;

const StyledResultArea = styled.div``;

const ResultItem = ({id, nth, time, fibNum, loading}) => {
  return (
    <StyledResultItem key={id}>
      {loading ? (
        <StyledMessageArea>
          Calculating the <StyledEmphansis>{nth}</StyledEmphansis> Fibonacci
          number...
        </StyledMessageArea>
      ) : (
        <>
          <StyledStatusArea>
            Time: <StyledEmphansis>{time} ms</StyledEmphansis>
          </StyledStatusArea>
          <StyledResultArea>
            <StyledEmphansis>{nth}</StyledEmphansis> fibonnaci number:{' '}
            <StyledEmphansis>{fibNum}</StyledEmphansis>
          </StyledResultArea>
        </>
      )}
    </StyledResultItem>
  );
};

export {ResultItem};

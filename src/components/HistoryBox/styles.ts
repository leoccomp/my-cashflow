import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  
  width: 100%;
  height: 260px;

  margin: 10px 0;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  border-radius: 7px;
`;
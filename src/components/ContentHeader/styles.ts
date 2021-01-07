import styled from 'styled-components';

interface ITittleContainerProps {
  lineColor: string,
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 25px;
  padding: 0px 10px;

  @media(max-width: 370px) {
    flex-direction: column;
  }
`;

export const TitleContainer = styled.div<ITittleContainerProps>`
  > h1 {
    color: ${props => props.theme.colors.white};
    cursor: pointer;

    &::after {
      content: '';
      display: block;
      width: 55px;
      border-bottom: 10px solid ${props => props.lineColor};
    }
  }

  @media(max-width: 420px) {
    > h1 {
      font-size: 22px;

      &::after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 5px solid ${props => props.lineColor};
      }
    }
  }
`;

export const Controllers = styled.div`
  display: flex;

  @media(max-width: 370px) {
    justify-content: space-around;
    width: 100%;
    margin-top: 20px;
  }
`;
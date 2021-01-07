import styled from 'styled-components';

interface ILegendProps {
  color: string,
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 100%;
  height: 360px;

  margin: 10px 0;
  padding: 30px 20px;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  border-radius: 7px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  width: 100%;
  
  > h2 {
    margin-bottom: 10px;
    padding-left: 15px;
  }

  @media(max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LegendContainer = styled.ul`
  display: flex;
  list-style: none;
`;

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 7px;
  padding: 0 20px;

  > div {
    background-color: ${props => props.color};
    width: 40px;
    height: 40px;
    border-radius: 5px;

    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }

  > span {
    margin-left: 5px;
  }

  @media(max-width: 1280px) {
    > div {
      width: 30px;
      height: 30px;
    }
  }
`;
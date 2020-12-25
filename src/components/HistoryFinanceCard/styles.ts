import styled from 'styled-components';

interface ITagProps {
  color: string,
}

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background-color: ${props => props.theme.colors.tertiary};

  list-style: none;
  border-radius: 10px;

  margin: 10px;
  padding: 12px 10px;
  cursor: pointer;
  transition: all .3s;

  position: relative;

  &:hover {
    opacity: .7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-left: 10px;
  }

  > div span {
    font-weight: 500;
    font-size: 20px;
  }
`;

export const Tag = styled.div<ITagProps>`
  width: 13px;
  height: 60%;
  position: absolute;
  left: 0;
  background-color: ${props => props.color};
`;


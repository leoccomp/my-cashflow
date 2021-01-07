import React, { useState } from 'react';

import emojis from '../../utils/emojis';
import Toggle from '../Toogle';

import { useTheme } from '../../hooks/theme';

import { 
  Container, 
  Profile, 
  Welcome, 
  UserName
} from './styles';
import dark from '../../styles/themes/dark';

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

  const handleChangeTheme = () => {
    setDarkTheme(!dark);
    toggleTheme();
  };

  return (
    <Container>
      <Toggle 
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
      />
      <Profile>
        <Welcome>Olá, {emojis[0]}</Welcome>
        <UserName>Leonardo Azevedo</UserName>
      </Profile>
    </Container>
  );
}

export default MainHeader;
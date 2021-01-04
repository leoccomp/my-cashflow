import React, { useMemo, useState } from 'react';

import emojis from '../../utils/emojis';
import Toogle from '../Toogle';

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
      <Toogle 
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
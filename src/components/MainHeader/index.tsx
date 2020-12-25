import React, { useMemo } from 'react';

import emojis from '../../utils/emojis';
import Toogle from '../Toogle';

import { 
  Container, 
  Profile, 
  Welcome, 
  UserName 
} from './styles';

const MainHeader: React.FC = () => {
  return (
    <Container>
      <Toogle />
      <Profile>
        <Welcome>Olá, {emojis[0]}</Welcome>
        <UserName>Leonardo Azevedo</UserName>
      </Profile>
    </Container>
  );
}

export default MainHeader;
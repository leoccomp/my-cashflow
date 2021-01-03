import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Cart
} from 'recharts';

import { Container } from './styles';

const HistoryBox: React.FC = () => {
  return (
    <Container>
      <h2>Histórico de Saldos</h2>
      <ChartContainer>

      </ChartContainer>
    </Container>
  );
}

export default HistoryBox;
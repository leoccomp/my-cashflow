import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const options = [
    {value: 'Leo', label: 'Leo'},
    {value: 'Joao', label: 'Joao'},
    {value: 'jose', label: 'jose'}
  ];
  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f79918">
        <SelectInput options={options} onChange={() => {}} />
      </ContentHeader>
    </Container>
  );
}

export default Dashboard;
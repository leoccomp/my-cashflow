import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import { Container, Content, Filters } from './styles';

const List: React.FC = () => {
  const months = [
    {value: 7, label: 'Julho'},
    {value: 8, label: 'Agosto'},
    {value: 9, label: 'Setembro'}
  ];
  const years = [
    {value: 2020, label: 2020},
    {value: 2019, label: 2019},
    {value: 2018, label: 2018}
  ];
  return (
    <Container>
      <ContentHeader title="Saídas" lineColor="#E44C4e">
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ContentHeader>
      <Filters>
        <button 
          type="button"
          className="tag-filters tag-filter-recurrent"
        >
          Recorrentes
        </button>
        <button 
          type="button"
          className="tag-filters tag-filter-eventual"
        >
          Eventuais
        </button>
      </Filters>
      <Content>
        <HistoryFinanceCard
            tagColor="#e44c4e"
            title="Conta de Luz"
            subTitle="17/12/2020"
            amount="R$ 125,50"
        />
        <HistoryFinanceCard
            tagColor="#e44c4e"
            title="Conta de Luz"
            subTitle="17/12/2020"
            amount="R$ 125,50"
        />
        <HistoryFinanceCard
            tagColor="#e44c4e"
            title="Conta de Luz"
            subTitle="17/12/2020"
            amount="R$ 125,50"
        />
      </Content>
    </Container>
  );
}

export default List;
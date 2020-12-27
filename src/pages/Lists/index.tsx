import React, { useMemo, useState, useEffect } from 'react';
import { v4 } from 'uuid';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

import monthsList from '../../utils/months';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string
    }
  }
}

interface IData {
  id: string,
  description: string,
  amountFormatted: string,
  frequency: string,
  dateFormatted: string,
  tagColor: string, 
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

  const { type } = match.params;

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses; 
  }, [type]);

  useEffect(() => {
    const filteredDate = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());
      
      return month === monthSelected && year === yearSelected;
    });

    const response = filteredDate.map(item => {
      return {
        id: v4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? "#4E41F0" : "#E44C4E",
      }
    });
    
    setData(response);
  }, [listData, monthSelected, yearSelected]);
  
  const title = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas' : 'Saídas'; 
  }, [type]);
  
  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931b' : '#E44C4E'; 
  }, [type]);
  
  const months = useMemo(() => {
    return monthsList.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, [monthsList]);
  
  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    listData.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });
    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      }
    });
  }, [listData]);

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
        <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />
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
        {
          data.map(item => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subTitle={item.dateFormatted}
              amount={item.amountFormatted}
            />    
          ))
        }
      </Content>
    </Container>
  );
}

export default List;
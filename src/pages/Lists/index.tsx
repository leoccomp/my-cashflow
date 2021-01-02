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
  const [selectedFrequency, setSelectedFrequency] = useState<String[]>(['recorrente', 'eventual']);
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

  const movimentType = match.params.type;

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance' ? 
    {
      title: 'Entradas',
      lineColor: '#4E41F0',
      data: gains,
    } : 
    {
      title: 'Saídas',
      lineColor: '#E44C4E',
      data: expenses,
    }
  }, [movimentType]);
  
  useEffect(() => {
    const { data } = pageData;
    const filteredDate = data.filter(item => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
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
  }, [pageData, monthSelected, yearSelected, selectedFrequency]);
  
  const months = useMemo(() => {
    return monthsList.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, []);
  
  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    const { data } = pageData;

    data.forEach(item => {
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
  }, [pageData]);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter(item => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  }

  const handleMonthSelected = (month: string) => {
    try{
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (err) {
      throw new Error('Invalid month value. Is acept 1 - 12');
    }
  }

  const handleYearSelected = (year: string) => {
    try{
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (err) {
      throw new Error('Invalid year value');
    }
  }
  
  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput 
          options={months} 
          onChange={(e) => handleMonthSelected(e.target.value)} 
          defaultValue={monthSelected} 
        />
        <SelectInput 
          options={years} 
          onChange={(e) => handleYearSelected(e.target.value)} 
          defaultValue={yearSelected} 
        />
      </ContentHeader>
      <Filters>
        <button 
          type="button"
          className={
            `tag-filters tag-filter-recurrent
            ${selectedFrequency.includes('recorrente') && 'tag-actived'}
          `}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button 
          type="button"
          className={
            `tag-filters tag-filter-eventual
            ${selectedFrequency.includes('eventual') && 'tag-actived'}
          `}
          onClick={() => handleFrequencyClick('eventual')}
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
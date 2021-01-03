import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import monthsList from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

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

    [...expenses, ...gains].forEach(item => {
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
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number.')
        }
      }

    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount! Amount must be number.')
        }
      }

    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Neste mês você gastou mais que deveria.',
        footerText: 'Verifique seus gastos e tente cortar os desnecessários.',
        icon: sadImg,
      }
    } else if (totalBalance === 0) {
      return {
        title: 'Ufa!',
        description: 'Neste mês você gastou exatamente o que ganhou.',
        footerText: 'Tenha cuidado. No proximo mês tente poupar um pouco.',
        icon: happyImg,
      }
    } else {
      return {
        title: 'Muito bem!',
        description: 'Sua carteira está positiva.',
        footerText: 'Continue assim. Considera investir seu saldo.',
        icon: happyImg,
      }
    }
  }, [totalBalance]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;
    
    const percentGains = (totalGains / total) * 100;
    const percentExpenses = (totalExpenses / total) * 100;

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: Number(percentGains.toFixed(1)),
        color: "#E44C4E"
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: Number(percentExpenses.toFixed(1)),
        color: "#F7931B"
      }
    ];

    return data;

  }, [totalGains, totalExpenses]);

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
      <ContentHeader title="Dashboard" lineColor="#f79918">
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

      <Content>
        <WalletBox 
          title="Saldo"
          amount={totalBalance}
          footerLabel="atualizado com base nas entradas e saídas"
          icon='dolar'
          color="#4E41F0"
        />
        <WalletBox 
          title="Entradas"
          amount={totalGains}
          footerLabel="Entradas"
          icon='arrowUp'
          color="#F7931B"
        />
        <WalletBox 
          title="Saída"
          amount={totalExpenses}
          footerLabel="Saídas"
          icon='arrowDown'
          color="#E44C4E"
        />
        <MessageBox 
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
        <PieChartBox data={relationExpensesVersusGains}/>
        <HistoryBox />
      </Content>
    </Container>
  );
}

export default Dashboard;
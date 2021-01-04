import React, { useState, useMemo, useCallback } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

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
    
    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: "#E44C4E"
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: "#F7931B"
      }
    ];

    return data;

  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {
    return monthsList.map((_, month) => {
      let amountEntry = 0;
      let amountOutput = 0;
      gains.forEach(gain => {
        const date = new Date(gain.date);
        const gainYear = date.getFullYear();
        const gainMonth = date.getMonth();

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error('Amount entry is invalid!');
          }
        }
        
      });
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const expenseYear = date.getFullYear();
        const expenseMonth = date.getMonth();

        if (expenseMonth === month && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error('Amount output is invalid!');
          }
        }
        
      });
      return {
        monthNumber: month,
        month: monthsList[month].substr(0,3),
        amountEntry,
        amountOutput
      };
    }).filter(item => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();

      return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
    });
  }, [yearSelected]);

  const relationRecurrentVersusEventualExpenses = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses.filter(expense => {
      const date = new Date(expense.date);
      const expenseYear = date.getFullYear();
      const expenseMonth = date.getMonth() + 1;

      return expenseMonth === monthSelected && expenseYear === yearSelected;
    })
    .forEach((expense) => {
      if (expense.frequency === 'recorrente') {
        return amountRecurrent += Number(expense.amount);
      }
      if (expense.frequency === 'eventual') {
        return amountEventual += Number(expense.amount);
      }
    });

    const total = amountRecurrent + amountEventual;
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
    const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#F7931B"
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "#E44C4E"
      }
    ];
  }, [monthSelected, yearSelected]);

  const relationRecurrentVersusEventualGains = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains.filter(gain => {
      const date = new Date(gain.date);
      const gainYear = date.getFullYear();
      const gainMonth = date.getMonth() + 1;

      return gainMonth === monthSelected && gainYear === yearSelected;
    })
    .forEach((gain) => {
      if (gain.frequency === 'recorrente') {
        return amountRecurrent += Number(gain.amount);
      }
      if (gain.frequency === 'eventual') {
        return amountEventual += Number(gain.amount);
      }
    });

    const total = amountRecurrent + amountEventual;
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
    const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: "#F7931B"
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: "#E44C4E"
      }
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try{
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (err) {
      throw new Error('Invalid month value. Is acept 1 - 12');
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try{
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (err) {
      throw new Error('Invalid year value');
    }
  }, []);

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
          footerLabel="Atualizado com base nas entradas e saídas"
          icon='dolar'
          color="#4E41F0"
        />
        <WalletBox 
          title="Entradas"
          amount={totalGains}
          footerLabel="Total recebido no mês"
          icon='arrowUp'
          color="#F7931B"
        />
        <WalletBox 
          title="Saída"
          amount={totalExpenses}
          footerLabel="Total de pagamentos no mês"
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
        <HistoryBox 
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />
        <BarChartBox 
          title="Saídas" 
          data={relationRecurrentVersusEventualExpenses} 
        />
        <BarChartBox 
          title="Entradas" 
          data={relationRecurrentVersusEventualGains} 
        />
      </Content>
    </Container>
  );
}

export default Dashboard;
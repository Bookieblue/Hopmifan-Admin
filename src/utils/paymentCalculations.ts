export interface Payment {
  date: string;
  amount: number;
  customer: string;
  method: string;
  reference: string;
  type: string;
}

export const calculateTotalEarnings = (payments: Payment[]): number => {
  return payments.reduce((total, payment) => total + payment.amount, 0);
};

export const groupPaymentsByTimeRange = (payments: Payment[], range: string) => {
  const now = new Date();
  const filteredPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    switch (range) {
      case "24H":
        return now.getTime() - paymentDate.getTime() <= 24 * 60 * 60 * 1000;
      case "1W":
        return now.getTime() - paymentDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
      case "1M":
        return now.getTime() - paymentDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
      case "3M":
        return now.getTime() - paymentDate.getTime() <= 90 * 24 * 60 * 60 * 1000;
      case "1Y":
        return now.getTime() - paymentDate.getTime() <= 365 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  });

  return filteredPayments.reduce((acc, payment) => {
    const date = new Date(payment.date);
    let key = "";
    
    switch (range) {
      case "24H":
        key = `${date.getHours().toString().padStart(2, '0')}:00`;
        break;
      case "1W":
        key = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
        break;
      case "1M":
        key = `Week ${Math.ceil(date.getDate() / 7)}`;
        break;
      case "3M":
        key = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
        break;
      case "1Y":
        key = `Q${Math.floor(date.getMonth() / 3) + 1}`;
        break;
      default:
        key = date.getFullYear().toString();
    }

    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += payment.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const formatChartData = (groupedData: Record<string, number>) => {
  return Object.entries(groupedData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => ({
      month,
      amount,
    }));
};
import { Card } from "@/components/ui/card";
import { CircleDot } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { convertToNaira } from "@/utils/currencyConverter";

async function fetchDonations() {
  // This should be replaced with actual API call
  const donations = [
    { amount: 5057, currency: 'NGN' },
    { amount: 100, currency: 'USD' },
    { amount: 50, currency: 'EUR' }
  ];

  let totalAmount = 0;
  for (const donation of donations) {
    if (donation.currency === 'NGN') {
      totalAmount += donation.amount;
    } else {
      const convertedAmount = await convertToNaira(donation.amount, donation.currency);
      totalAmount += convertedAmount;
    }
  }
  return totalAmount;
}

async function fetchBookstoreSales() {
  // This should be replaced with actual API call
  const sales = [
    { amount: 30500, currency: 'NGN' },
    { amount: 75, currency: 'USD' }
  ];

  let totalAmount = 0;
  for (const sale of sales) {
    if (sale.currency === 'NGN') {
      totalAmount += sale.amount;
    } else {
      const convertedAmount = await convertToNaira(sale.amount, sale.currency);
      totalAmount += convertedAmount;
    }
  }
  return totalAmount;
}

async function fetchPendingPrayerRequests() {
  // This should be replaced with actual API call
  return 24;
}

async function fetchPendingMemberRequests() {
  // This should be replaced with actual API call
  return 2;
}

export function StatsGrid() {
  const { data: totalDonations = 0, isLoading: isDonationsLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: fetchDonations,
  });

  const { data: bookstoreSales = 0, isLoading: isSalesLoading } = useQuery({
    queryKey: ['bookstore-sales'],
    queryFn: fetchBookstoreSales,
  });

  const { data: prayerRequests = 0, isLoading: isPrayerLoading } = useQuery({
    queryKey: ['prayer-requests'],
    queryFn: fetchPendingPrayerRequests,
  });

  const { data: membershipRequests = 0, isLoading: isMemberLoading } = useQuery({
    queryKey: ['membership-requests'],
    queryFn: fetchPendingMemberRequests,
  });

  return (
    <>
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-green-500 h-4 w-4" />
              <span className="text-lg font-medium">Total Donations</span>
            </div>
            <span className="text-3xl font-bold block">
              ₦{isDonationsLoading ? '...' : totalDonations.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-orange-500 h-4 w-4" />
              <span className="text-lg font-medium">Bookstore Sales</span>
            </div>
            <span className="text-3xl font-bold block">
              ₦{isSalesLoading ? '...' : bookstoreSales.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-blue-500 h-4 w-4" />
              <span className="text-lg font-medium">Prayer Requests</span>
            </div>
            <span className="text-3xl font-bold block">
              {isPrayerLoading ? '...' : prayerRequests}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="text-purple-500 h-4 w-4" />
              <span className="text-lg font-medium">Members Request</span>
            </div>
            <span className="text-3xl font-bold block">
              {isMemberLoading ? '...' : membershipRequests}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
}
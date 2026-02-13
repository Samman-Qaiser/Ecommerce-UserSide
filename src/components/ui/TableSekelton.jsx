const OrderRowSkeleton = () => (
  <tr className="animate-pulse border-b border-gray-100">
    <td className="p-4"><div className="h-4 w-12 bg-gray-200 rounded"></div></td>
    <td className="p-4">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-3 w-20 bg-gray-100 rounded"></div>
      </div>
    </td>
    <td className="p-4"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
    <td className="p-4"><div className="h-6 w-16 bg-gray-200 rounded-full"></div></td>
    <td className="p-4"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
    <td className="p-4 text-right"><div className="h-8 w-8 bg-gray-100 rounded ml-auto"></div></td>
  </tr>
);

const OrderTableSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {['ID', 'Customer', 'Date', 'Status', 'Amount', ''].map((header) => (
              <th key={header} className="p-4 text-sm font-semibold text-gray-400">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <OrderRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTableSkeleton;
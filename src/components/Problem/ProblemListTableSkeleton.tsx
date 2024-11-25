import useProblemListStore from '@zustand/ProblemListStore';

export default function ProblemListTableSkeleton() {
  const { pageSize } = useProblemListStore((state) => state.pagingInfo);
  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="w-full min-w-[800px] table-fixed">
        <thead className="h-12 mb-12 border-b border-gray-300">
          <tr>
            <th className="w-16 pl-4 text-center">
              <div className="w-8 h-6 mx-auto bg-gray-300 rounded" />
            </th>
            <th className="pl-12 text-left min-w-[400px]">
              <div className="w-32 h-6 mx-auto bg-gray-300 rounded" />
            </th>
            <th className="pl-2 text-center w-36">
              <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
            </th>
            <th className="w-32">
              <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
            </th>
            <th className="w-28">
              <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
            </th>
            <th className="w-20">
              <div className="w-12 h-6 mx-auto bg-gray-300 rounded" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: pageSize }).map((_, index) => (
            <tr key={index} className="h-16 border-b border-gray-300">
              <td className="pl-4">
                <div className="w-8 h-6 mx-auto bg-gray-300 rounded" />
              </td>
              <td className="pl-12 min-w-[400px]">
                <div className="w-full h-6 bg-gray-300 rounded" />
              </td>
              <td>
                <div className="w-12 h-6 mx-auto bg-gray-300 rounded" />
              </td>
              <td>
                <div className="w-12 h-6 mx-auto bg-gray-300 rounded" />
              </td>
              <td>
                <div className="w-12 h-6 mx-auto bg-gray-300 rounded" />
              </td>
              <td>
                <div className="w-8 h-6 mx-auto bg-gray-300 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

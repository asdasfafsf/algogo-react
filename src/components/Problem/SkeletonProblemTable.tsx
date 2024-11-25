export default function SkeletonProblemTable() {
  return (
    <div className="animate-pulse">
      <div className="p-6 mb-4 bg-gray-200 rounded">
        <div className="w-1/4 h-12 bg-gray-300 rounded" />
        <div className="flex items-center justify-between mt-4 space-x-2">
          <div className="flex space-x-2">
            <div className="w-32 h-10 bg-gray-300 rounded" />
            <div className="w-32 h-10 bg-gray-300 rounded" />
            <div className="w-32 h-10 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-64 h-10 bg-gray-300 rounded" />
            <div className="w-20 h-10 bg-gray-300 rounded" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] table-fixed">
          <thead className="h-12 mb-12 border-b border-gray-300">
            <tr>
              <th className="w-16 pl-4">
                <div className="w-8 h-6 mx-auto bg-gray-300 rounded" />
              </th>
              <th className="w-full pl-12">
                <div className="w-32 h-6 mx-auto bg-gray-300 rounded" />
              </th>
              <th className="pl-2 w-36">
                <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
              </th>
              <th className="w-32">
                <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
              </th>
              <th className="w-28">
                <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
              </th>
              <th className="w-20">
                <div className="w-16 h-6 mx-auto bg-gray-300 rounded" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="h-16 border-b border-gray-300">
                <td className="pl-4">
                  <div className="w-8 h-6 mx-auto bg-gray-300 rounded" />
                </td>
                <td className="pl-12">
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

      <div className="flex items-center justify-center w-full h-20">
        <div className="w-48 h-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

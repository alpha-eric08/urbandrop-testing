import { getStatusColor, ridersData } from "@/assets/data/data";
import { ordersData } from "@/assets/data/ordersData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // import useNavigate

const OrderStatus = () => {
  const navigate = useNavigate(); // initialize navigate

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">
          Orders Payment Status
        </h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Order
                </th>
                <th className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Payment
                </th>
                <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ordersData.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer"
                   onClick={() => navigate(`/orders/view?id=${order.id}`)}
                >
                  <td
                    className="py-4"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-green-600 hover:underline">
                        {order.orderNumber}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <a href="/orders">
            <button className="text-sm font-bold text-gray-600 hover:text-gray-800 uppercase tracking-wider">
              Full Details
            </button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderStatus;

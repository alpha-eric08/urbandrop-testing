import { getStatusColor, promotionsData } from "@/assets/data/data"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"

const ActivePromotions = () => {
  return (
     <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Active Promotions
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Merchant
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Promo
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Date
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Status
                      </th>
                      <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {promotionsData.map((promo) => (
                      <tr key={promo.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={promo.avatar}
                              alt={promo.merchant}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="font-semibold text-gray-900">
                                {promo.merchant}
                              </div>
                              <div className="text-sm text-gray-500">
                                {promo.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                            {promo.promo}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          {promo.date}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              promo.status
                            )}`}
                          >
                            {promo.status.charAt(0).toUpperCase() +
                              promo.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-center space-x-2">
                <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 rounded-full bg-green-600 text-white text-sm font-semibold">
                  1
                </button>
                <button className="px-3 py-1 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-50">
                  8
                </button>
                <button className="px-3 py-1 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-50">
                  9
                </button>
                <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
  )
}

export default ActivePromotions
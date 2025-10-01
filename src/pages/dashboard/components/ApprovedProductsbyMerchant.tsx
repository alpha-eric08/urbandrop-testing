import { approvedProducts } from "@/assets/data/data";
import { motion } from "framer-motion";

const ApprovedProductsbyMerchant = () => {
  return (
     <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Approved Products by Merchant
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Merchant Name
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Pending Products
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Last Updated
                      </th>
                      <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {approvedProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <span className="font-semibold text-gray-900">
                            {product.merchant}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                            {product.pending}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          {product.lastUpdated}
                        </td>
                        <td className="py-4">
                          <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded uppercase tracking-wider transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
  )
}

export default ApprovedProductsbyMerchant
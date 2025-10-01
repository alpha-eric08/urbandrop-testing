import { merchantUpdates } from "@/assets/data/data"
import { motion } from "framer-motion"

const MerchantsProductUpdate = () => {
  return (
    <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Merchants Product Update
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {merchantUpdates.map((merchant) => (
                  <div
                    key={merchant.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={merchant.image}
                        alt={merchant.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-semibold text-gray-900">
                        {merchant.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {merchant.pending}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
  )
}

export default MerchantsProductUpdate
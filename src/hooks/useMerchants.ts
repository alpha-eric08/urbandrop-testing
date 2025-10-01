import { useState } from "react";
import { merchantsData, merchantFileUploads, merchantOrders, merchantProducts } from "@/assets/data/merchantsData";
import type { Merchant, MerchantFileUpload, MerchantOrder, MerchantProduct } from "@/assets/data/merchantsData";

export const useMerchants = () => {
  const [merchants, setMerchants] = useState<Merchant[]>(merchantsData);
  const [fileUploads] = useState<MerchantFileUpload[]>(merchantFileUploads);
  const [orders] = useState<MerchantOrder[]>(merchantOrders);
  const [products] = useState<MerchantProduct[]>(merchantProducts);

  const addMerchant = (merchantData: any) => {
    const newMerchant: Merchant = {
      ...merchantData,
      id: `MCH${String(merchants.length + 1).padStart(3, "0")}`,
      totalOrders: 0,
      totalRevenue: 0,
    };
    setMerchants([...merchants, newMerchant]);
  };

  const updateMerchant = (id: string, merchantData: Partial<Merchant>) => {
    setMerchants(merchants.map(merchant => 
      merchant.id === id ? { ...merchant, ...merchantData } : merchant
    ));
  };

  const deleteMerchant = (id: string) => {
    setMerchants(merchants.filter(merchant => merchant.id !== id));
  };

  const getMerchantById = (id: string) => {
    return merchants.find(merchant => merchant.id === id);
  };

  const getMerchantFileUploads = (merchantId: string) => {
    return fileUploads.filter(upload => upload.merchantId === merchantId);
  };

  const getMerchantOrders = (merchantId: string) => {
    return orders.filter(order => order.merchantId === merchantId);
  };

  const getMerchantProducts = (merchantId: string) => {
    return products.filter(product => product.merchantId === merchantId);
  };

  return {
    merchants,
    addMerchant,
    updateMerchant,
    deleteMerchant,
    getMerchantById,
    getMerchantFileUploads,
    getMerchantOrders,
    getMerchantProducts,
  };
};
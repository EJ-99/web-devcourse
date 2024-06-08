import { useEffect, useState } from 'react';
import { Delivery } from './../models/delivery.model';
import { addDelivery, fetchDeliveryLists } from '../api/delivery.api';

export const useDelivery = () => {
  const [deliveryList, setDeliveryList] = useState<Delivery[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const addDeliveryInfo = async (info: Omit<Delivery, 'deliveryId'>) => {
    const { deliveryId } = await addDelivery(info);
    setDeliveryList((prev) => [...prev, { ...info, deliveryId }]);

    return deliveryId;
  };

  useEffect(() => {
    fetchDeliveryLists().then((deliveryLists) => {
      setDeliveryList(deliveryLists);
      setIsEmpty(deliveryLists.length === 0);
    });
  }, []);

  return {
    deliveryList,
    isEmpty,
    addDeliveryInfo,
  };
};

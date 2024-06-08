import { Delivery } from '../models/delivery.model';
import { httpClient } from './http';

export const fetchDeliveryLists = async () => {
  const response = await httpClient.get<Delivery[]>('/deliveries');

  return response.data;
};

export const addDelivery = async (params: Omit<Delivery, 'deliveryId'>) => {
  const response = await httpClient.post('/deliveries', params);

  return response.data;
};

export interface Order {
  id: number;
  orderedAt: string;
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface OrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  firstBookTitle: string;
  deliveryId: number;
}

export interface OrderDetailItem {
  bookId: number;
  author: string;
  price: number;
  quantity: number;
  title: string;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}

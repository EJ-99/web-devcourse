import styled from 'styled-components';
import { Delivery } from '../../models/delivery.model';
import DeliveryItem from './DeliveryItem';

interface Props {
  deliveryList: Delivery[];
  deliveryId: number | undefined;
  handleCheck: (id: number) => void;
}

export default function DeliveryList({
  deliveryList,
  deliveryId,
  handleCheck,
}: Props) {
  return (
    <DeliveryListStyle className='delivery-list'>
      {deliveryList.map((item) => (
        <DeliveryItem
          key={item.deliveryId}
          delivery={item}
          isChecked={item.deliveryId === deliveryId}
          handleCheck={handleCheck}
        />
      ))}
    </DeliveryListStyle>
  );
}

const DeliveryListStyle = styled.ul`
  padding: 0;
`;

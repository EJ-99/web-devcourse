import React from 'react';
import styled from 'styled-components';
import { Delivery } from '../../models/delivery.model';
import CheckIconButton from '../common/CheckIconButton';

interface Props {
  delivery: Delivery;
  isChecked: boolean;
  handleCheck: (id: number) => void;
}
export default function DeliveryItem({
  delivery,
  isChecked,
  handleCheck,
}: Props) {
  return (
    <DeliveryItemStyle>
      <CheckIconButton
        isChecked={isChecked}
        onCheck={() => handleCheck(delivery.deliveryId)}
      />
      <div className='delivery-info'>
        <p>
          <strong>{delivery.receiver}</strong>
        </p>
        <p>{delivery.address}</p>
        <p>{delivery.contact}</p>
      </div>
    </DeliveryItemStyle>
  );
}

const DeliveryItemStyle = styled.li`
  list-style: none;
  display: flex;
  align-items: start;
  gap: 24px;
  padding: 0 0 16px 0;

  .delivery-info {
    flex: 1;
    p {
      margin: 0;
      padding: 0 0 4px 0;
    }
  }
`;

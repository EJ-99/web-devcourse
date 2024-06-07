import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function Order() {
  const { state: orderData } = useLocation();

  return <OrderStyle></OrderStyle>;
}

const OrderStyle = styled.div``;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Title from '../components/common/Title';
import { CartStyle } from './Cart';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import { useForm } from 'react-hook-form';
import { OrderSheet } from '../models/order.model';
import { Delivery } from '../models/delivery.model';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useDelivery } from '../hooks/useDelivery';
import { useAlert } from '../hooks/useAlert';
import DeliveryList from '../components/order/DeliveryList';
import FindAddressButton from '../components/order/FindAddressButton';
import { order } from '../api/order.api';

interface DeliveryForm extends Omit<Delivery, 'deliveryId'> {
  detailAddress: string;
}

export default function Order() {
  const { showAlert, showConfirm } = useAlert();
  const { deliveryList, isEmpty, addDeliveryInfo } = useDelivery();
  const [deliveryId, setDeliveryId] = useState<number>();

  const [expanded, setExpanded] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const navigate = useNavigate();
  const { state: orderDataFromCart } = useLocation();
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;

  const handlePay = async (data: DeliveryForm) => {
    if (expanded && !deliveryId) {
      showAlert('배송 정보를 선택해주세요');
    }
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      deliveryId,
    };
    if (!expanded) {
      const deliveryInfo = {
        ...data,
        address: `${data.address} ${data.detailAddress}`,
      };
      const id = await addDeliveryInfo(deliveryInfo);
      orderData['deliveryId'] = id;
    }

    showConfirm('주문을 진행하시겠습니까?', () => {
      order(orderData).then(() => {
        showAlert('주문이 처리되었습니다.');
        navigate('/orderlist');
      });
    });
  };

  const handleCheck = (id: number) => {
    setDeliveryId(id);
  };

  return (
    <>
      <Title size='large'>주문서 작성</Title>
      <CartStyle>
        <div className='content'>
          <div className='order-info'>
            <div className='toggle'>
              <Title size='medium' color='text'>
                배송 정보
              </Title>
              {!isEmpty && (
                <button onClick={() => setExpanded(!expanded)}>
                  {expanded ? (
                    <>
                      <FaAngleUp />
                      새로운 배송지 입력
                    </>
                  ) : (
                    <>
                      <FaAngleDown />
                      기존 배송지 사용
                    </>
                  )}
                </button>
              )}
            </div>
            {expanded && (
              <DeliveryList
                deliveryId={deliveryId}
                deliveryList={deliveryList}
                handleCheck={handleCheck}
              />
            )}
            {!expanded && (
              <form className='delivery'>
                <fieldset>
                  <label>주소</label>
                  <div className='input'>
                    <InputText
                      inputType='text'
                      {...register('address', { required: true })}
                    />
                  </div>
                  <FindAddressButton
                    onCompleted={(address) => {
                      setValue('address', address);
                    }}
                  />
                </fieldset>
                {errors.address && (
                  <p className='error-text'>주소를 입력해주세요</p>
                )}
                <fieldset>
                  <label>상세 주소</label>
                  <div className='input'>
                    <InputText
                      inputType='text'
                      {...register('detailAddress', { required: true })}
                    />
                  </div>
                </fieldset>
                {errors.detailAddress && (
                  <p className='error-text'>상세 주소를 입력해주세요</p>
                )}
                <fieldset>
                  <label>수령인</label>
                  <div className='input'>
                    <InputText
                      inputType='text'
                      {...register('receiver', { required: true })}
                    />
                  </div>
                </fieldset>
                {errors.receiver && (
                  <p className='error-text'>수령인을 입력해주세요</p>
                )}
                <fieldset>
                  <label>전화번호</label>
                  <div className='input'>
                    <InputText
                      inputType='text'
                      {...register('contact', { required: true })}
                    />
                  </div>
                </fieldset>
                {errors.contact && (
                  <p className='error-text'>전화번호를 입력해주세요</p>
                )}
              </form>
            )}
          </div>
          <div className='order-info'>
            <Title size='medium' color='text'>
              주문 상품
            </Title>
            <strong>
              {firstBookTitle} 등 총 {totalQuantity} 권
            </strong>
          </div>
        </div>
        <div className='summary'>
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button
            size='large'
            scheme='primary'
            onClick={handleSubmit(handlePay)}>
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}

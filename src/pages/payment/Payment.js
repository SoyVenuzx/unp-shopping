import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/pageProps/Breadcrumbs'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'

const Payment = () => {
  const totalAmount = useSelector(state => state.orebiReducer.totalAmount)
  const initialOptions = {
    'client-id':
      'ASI-SLC5EYr7WAYpA0aARuCLH99ParhxZuaEAWUhKT3z53Ak28nrBZEZ6zWImYbYyo5mIAzOd5NbxNcL',
    currency: 'USD',
    intent: 'capture'
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '0.01'
          }
        }
      ]
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(details => {
      alert('Transacción commpletada por: ', details.payer.name.given_name)
    })
  }

  console.log({ totalAmount: totalAmount })
  return (
    <div className='max-w-container mx-auto px-4'>
      <Breadcrumbs title='Payment gateway' />
      <div className='pb-10 mx-auto text-center'>
        <PayPalScriptProvider options={initialOptions}>
          <div className='h-100 flex justify-center flex-col items-center'>
            <div className='mt-4 mb-8'>
              <p className='text-xl font-semibold'>Finaliza tu pago</p>
              <p className='text-md text-gray-500'>Completa tu pago con las siguientes opciones</p>
            </div>
            <div className='w-96'>
              <PayPalButtons
                style={{
                  shape: 'rect',
                  layout: 'vertical',
                  color: 'silver',
                  label: 'paypal'
                }}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
              />
            </div>
          </div>
        </PayPalScriptProvider>
      </div>
    </div>
  )
}

export default Payment

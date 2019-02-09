
import { AnyAction } from 'redux'; 
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { IState } from './../redux-store'
import { ModifyBalanceAction } from './../components/component-interface'

export const getRates = ((defaultCurrency: string) => async (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  try{
    const rates = await fetch(`/api/rates/${defaultCurrency}`)
    dispatch({
      type: 'GET_RATES',
      status: rates.status,
      payload: rates.payload
    })
  }catch(err){
    dispatch({
      type: 'GET_RATES',
      status: err.status,
      message: err.message
    })
  }
})

export const convert = ((fromCurrency: string, toCurrency: string, value: number) => async (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  try{
    const rates = await fetch(`/api/convert/${value}/${fromCurrency}/${toCurrency}`)
    dispatch({
      type: 'RECV_CONVERT',
      status: rates.status,
      payload: rates.payload
    })
  }catch(err){
    dispatch({
      type: 'RECV_CONVERT',
      status: err.status,
      message: err.message
    })
  }
})

export const getBalance = (() => async (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  try{
    const balance = await fetch('/api/balance')
    dispatch({
      type: 'GET_BALANCE',
      status: balance.status,
      payload: balance.payload
    })
  }catch(err){
    dispatch({
      type: 'GET_BALANCE',
      status: err.status,
      message: err.message
    })
  }
})

export const modifyBalance = ((modifyBalanceActions: Array<ModifyBalanceAction>) => async (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  const promises = modifyBalanceActions.map((modifyBalanceAction) => {
    return fetch(`/api/balance/${modifyBalanceAction.type}/${modifyBalanceAction.currency}/${modifyBalanceAction.amount}`)
  })
  axios.all(promises)
  .then(() => getBalance())
  .catch((err) => alert(err))
})

async function fetch(url: string) {
  return axios.get(url)
  .then((response) => Promise.resolve(response.data))
  .catch((error) => Promise.reject(error))
} 

import { AnyAction } from 'redux'; 
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { IState } from './../redux-store'

export const getRates = ((defaultCurrency: string) => async (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  try{
    const rates = await fetch(`/api/rates/${defaultCurrency}`)
    dispatch({
      type: 'GET_RATES',
      payload: rates
    })
  }catch(err){
    dispatch({
      type: 'GET_RATES',
      payload: err
    })
  }
})

export const convert = (() => async (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  try{
    const rates = await fetch('/api/convert')
    dispatch({
      type: 'CONVERT',
      payload: rates.data
    })
  }catch(err){
    dispatch({
      type: 'CONVERT',
      payload: err
    })
  }
})

export const getBalance = (() => async (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  try{
    const balance = await fetch('/api/balance')
    dispatch({
      type: 'GET_BALANCE',
      payload: balance
    })
  }catch(err){
    dispatch({
      type: 'GET_BALANCE',
      payload: err
    })
  }
})

async function fetch(url: string) {
  return axios.get(url)
  .then((response) => Promise.resolve(response.data))
  .catch((error) => Promise.reject(error))
} 
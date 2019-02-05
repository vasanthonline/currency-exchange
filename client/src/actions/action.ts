
import { AnyAction } from 'redux'; 
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { IState } from './../redux-store'

export const getRates = (() => (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  axios.get('/api/getRates')
    .then(function (response) {
        dispatch({
            type: 'GET_RATES',
            payload: response.data.rates
        })
    })
    .catch(function (error) {
        dispatch({
            type: 'GET_RATES',
            payload: error
        })
    })
})
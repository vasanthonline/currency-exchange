
import { AnyAction } from 'redux'; 
import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { IState } from './../redux-store'

export const getRates = (() => (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
  // axios.get('/api/getRates')
  //   .then(function (response) {
    setTimeout(() => {
        const response = {'data': {
          type: 'GET_RATES',
          payload: [
            {'currency': 'USD','rate':  0.7}, 
            {'currency': 'GBP','rate':  0.5}, 
            {'currency': 'EUR','rate':  0.8}
          ]
        }};
        dispatch({
            type: 'GET_RATES',
            ...response.data
        })
    }, 1000)
    // })
    // .catch(function (error) {
    //     dispatch({
    //         type: 'GET_RATES',
    //         payload: error
    //     })
    // })
})
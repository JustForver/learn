/**
 * 商城的reducer
 * @module mallReducer
 */

import * as types from '../../actions/actionTypes'
import {ListView} from 'react-native'
import config from '../../common/configuration'
import {ERROR_TYPE} from '../../common/error'

/**
 * 商城
 * @type {json}
 * @property {boolean} networkError             -是否网络错误
 * @property {DataSource} dataSource            -商城数据源
 * @property {array} rawData                    -原始数据列表
 * @property {boolean} hasMore                  -是否有更多数据(true代表有更多,false代表没有更多)
 * @property {boolean} isEmpty                  -是否列表为空(true为空,false为不为空)
 * @property {number} page                      -当前页数
 * @property {number} count                     -总条数
 */

const initialState = {
    isLoading: false,
    networkError:false,
    detailLoading:true,
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    rawData: [],
    page: 0,
    hasMore: false,
    isEmpty: true,
    count: 0,
};

/**
 * 商城
 * @function mallReducer
 * @param {json} state  mallReducer的初始状态
 * @param {json} action 更新的状态
 * @return {json}
 */

let mallReducer = (state = initialState ,action) => {
    switch (action.type) {
        case types.FETCH_MALL_LIST:
            state.rawData = state.rawData.concat(action.data.commoditys);
            return Object.assign({}, state, {
                dataSource: state.dataSource.cloneWithRows(state.rawData),
                rawData: state.rawData,
                page: action.data.page,
                count: action.data.total_count,
                hasMore: action.data.total_count > action.data.page * config.limit,
                networkError: false,
                isLoading:false,
                isEmpty: !(action.data.commoditys.length != 0 || state.dataSource.getRowCount() != 0)
            });
        case types.LOADING_MALL_LIST:
            return Object.assign({},state,{
                isLoading:true
            });
        case types.REFRESH_MALL_LIST:
            return Object.assign({}, state, {
                isRefreshing: false,
                dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                rawData: [],
                page: 0,
                hasMore: false,
                isEmpty: true
            });
        case types.ADDERROR:
            if(action.error.name === ERROR_TYPE.NETWORK_ERROR){
                return Object.assign({}, state, {
                    isRefreshing:false,
                    networkError:true
                })
            }
            return state;
        case types.FETCH_MALL_DETAIL:
            return  Object.assign({}, state, action.data,{detailLoading:false});
        default:
            return state
    }
};

export default mallReducer;
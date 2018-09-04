'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

import QRCode from 'react-native-qrcode';
import {connect} from "react-redux";
import {fetchTime} from './actions/qrcodeAction'
import constants from './constants';//获取屏幕的宽和高
import {PayCode} from './paycode' //值的加密设置

class QRCodePage extends Component {
    constructor(props){
        super(props);
        this.time = null;
        this.status = true;
        this.status2 = false;
        this.number = 0;
        this.state= {
            text: 'http://facebook.github.io/react-native/',
            data: null
        };
        this.interval = null;
    }
    /**
     * 生命周期的componentDidUpdate方法
     * @function componentDidUpdate
     */
    componentDidUpdate() {
        const {TicketReducer} = this.props;
        if (this.status2) {
            if (TicketReducer.content) {
                const timeError = Math.abs(TicketReducer.content - (new Date()).getTime());
                if (timeError < 5000) {
                    //如果服务器的时间和本地时间的差值小于5秒则认为本地时间是标准时间
                } else {
                    //认为服务器时间是标准时间
                    this.time = parseInt(TicketReducer.content/1000);
                }
                //当取到TicketReducer.content的值时,改变status2值防止重复执行
                this.status2 = false;
            }
        }
    }
    /**
     * 刷新二维码
     * @function refreshQr
     */
    refreshQr() {
        //手动刷新二维码时清除自动刷新定时器
        this.clear();
        //初始化time的值
        this.time = null;
        const randomNum = Math.floor(Math.random()*1000 + 1);//真实项目中此处应该用用户的id
        let otp = new PayCode("a1™¡¢∞§hjg",randomNum,1);
        this.setState({data: otp.next()})//真实项目中，此处的数据data为自己设置的值，demo中为一个时间戳
    }

    /**
     * 设置定时器,定时刷新
     * @function QRInterval
     */
    QRInterval() {
        this.interval = setInterval(() => {
            //每过30秒,刷新二维码
            const randomNum = Math.floor(Math.random()*1000 + 1);//真实项目中此处应该用用户的id
            let otp = new PayCode("a1™¡¢∞§hjg",randomNum,1);
            this.setState({data: otp.next()})
        }, 30 * 1000)
    }

    /**
     * 清除定时器
     * @function clear
     */
    clear() {
        if (this.interval != null) {
            clearInterval(this.interval);
            //在定时器被清除时将this.status的值初始化
            this.status = true;
        }
    }
    render() {
        let otp = new PayCode("a1™¡¢∞§hjg",2,1);
        return (
            <View style={styles.background}>
                    {
                        (()=>{
                            //第一次进入二维码界面开始获取服务器时间,之后每刷新界面10次再次去服务器获取时间
                            if (this.number % 10 === 0) {
                                this.props.dispatch(fetchTime());
                            }
                            //this.props.dispatch(fetchTime())之后,当取到时间时,页面会刷新,在这次刷新中将this.status2改为true
                            if (this.number % 10 === 1) {
                                //当请求时间后,改变status2值为true
                                this.status2 = true;
                            }
                            //第一次进入二维码界面启动定时器
                            if (this.status) {
                                this.QRInterval();
                                this.status = false
                            }
                            //每次自动刷新二维码时,将计数器加1
                            ++this.number;
                            return(
                                <View style = {{flex:1}}>
                                    <View style={styles.borderView}>
                                        <TouchableOpacity onPress={this.refreshQr.bind(this)}>
                                            <QRCode
                                                value={this.state.data === null ? otp.next() : this.state.data}
                                                size={constants.window.width - 100}
                                                bgcolor='purple'
                                                fgColor='white'
                                            >
                                            </QRCode>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })()
                    }
                {/*<TouchableOpacity onPress={this.refreshQr.bind(this)}>
                    <QRCode
                    value={this.state.text}
                    size={250}
                    bgColor='purple'
                    fgColor='white'/>
                </TouchableOpacity>*/}//最简单的二维码
            </View>
        );
    };
}

const styles = StyleSheet.create({
    background: {
        width: constants.window.width,
        height: constants.window.height
    },
    borderView: {
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
});
export default connect(
    (state)=>({
        TicketReducer:state.TicketReducer,
        UserReducer:state.UserReducer
    })
)(QRCodePage)


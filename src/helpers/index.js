import axios from "axios";
import router from 'next/router'

const helpers = {
    coefficientForUnauthorizedUsers: 2,
    getCurrentUser: function(){
        const currentUserJson = localStorage.getItem(helpers.localStorageKeys.user)
            || JSON.stringify({
                coefficient: this.coefficientForUnauthorizedUsers,
                phone: '',
                fullName: 'Не авторизованный пользователь',
                roleId: 0
            });
        return JSON.parse(currentUserJson);
    },
    roles: {
        UNAUTHORIZED: 0,
        ADMIN: 1,
        AUTHORIZED: 2
    },
    checkAuthorization: function(roleId){
        if(this.getCurrentUser().role !== roleId){
            router.push('/login');
        }
    },
    dateTimeFormatter: function(date){
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`
    },
    prettify: function (num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    },
    split: function (text) {
        const split = text.split('|')

        return(
            <>
                {split.map(item => {
                    return(
                        <>
                            {item}
                            <br/>
                        </>
                    )
                })}
            </>
        )
    },
    //serverDomain: 'http://localhost:3030/api',
    serverDomain: 'https://mattex-backend.herokuapp.com/api',
    localStorageKeys: {
        user: 'user',
        cart: 'cart'
    },
    addToCart: function(mattress){
        let cartArray = JSON.parse(localStorage.getItem(helpers.localStorageKeys.cart)) || [];
        console.log(mattress);
        cartArray.push(mattress);
        localStorage.setItem(helpers.localStorageKeys.cart, JSON.stringify(cartArray));
    },
    sendTelegramNotification: (phone, totalSum) => {
        let token = "5115708314:AAHtHBLCUySN-bhun1z27IScuFoBeGZd8Fs";
        let url = `https://api.telegram.org/bot${token}/sendMessage`;

        axios.post(url, {
            chat_id: 567414370,
            text: `Новый заказ на сайте Mattex.kz!
            Телефон клиента: ${phone}.
            Сумма заказа: ${totalSum} KZT.`

        })
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default helpers;

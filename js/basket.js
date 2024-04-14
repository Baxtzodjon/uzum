import { permission } from "../js/header"
import { reload } from "../js/header"
import { given } from "../js/header"
import { get } from '../js/header.js'
import { post } from '../js/header.js'
import { remove } from '../js/header.js'
import { put } from '../js/header.js'
get("http://localhost:9090/new_products")
    .then(data => {
        let arr_from_users = data
        const rub = 138.26
        let homePage = document.querySelector("#homePage")

        homePage.onclick = () => {
            location.assign('/')
        }
        let onsale_main = document.querySelectorAll('.onsale_main')
        get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
            .then(data => {
                data.goods = [...data.goods, ...arr_from_users]
                for (let item of data.goods) {
                    if (item.rating == 5) {
                        item.price = parseInt(item.price * rub)
                        reload(onsale_main[0], item)
                    }
                }
                given()
            })
        if (permission == true) {
            get('http://localhost:9090/basket')
                .then(data => {
                    if (data.length > 0) {
                        let cart_page_items = document.querySelector('.cart_page_items')
                        let amount_tovar = document.querySelector('.amount_tovar')
                        let all_price = document.querySelector('.all_price')
                        let sum = document.querySelector('.sum')
                        let summa = 0
                        let summa_without = 0
                        let only_discount = document.querySelector('.only_discount')
                        amount_tovar.innerHTML = `количество товаров: ${data.length}`
                        all_price.innerHTML = `${data.length}`
                        for (let i of data) {
                            let price = parseInt(i.price * rub)
                            summa += Math.ceil(price / 100 * (100 - i.salePercentage)) * i.quantity
                            summa_without += price * i.quantity
                            cart_page_items.innerHTML += `<div class="cart_page_item" id="${i.id}">
                <img width="100px" src="${i.media[0]}" alt="">
                <div class="item_column">
                  <div class="w-kor">
                    <p class="w-kor_p_texts">${i.title}</p>
                    <p class="w-kor_p_texts2">Цвет: ${i.colors.join(',')}</p>
                  </div>
                  <div class="kol-vo" id="${i.id}">
                    <button class="btns_count minus_one">-</button>
                    <input type="number" class="inp_basket" value="${i.quantity}">
                    <button class="btns_count plus_one">+</button>
                  </div>
                  <div class="price_block">
                    <p>${(Math.ceil(price / 100 * (100 - i.salePercentage)) * i.quantity).toLocaleString()} сум</p>
                    <p class="without_sale">${(price * i.quantity).toLocaleString()} сум</p>
                  </div>
                  <buton class="cart_page_item_delblock_btn" id="${i.id}">
                    <p>Удалить</p>
                  </buton>
                </div>
              </div>`
                        }
                        sum.innerHTML = `${summa.toLocaleString()} сум`
                        only_discount.innerHTML = `${(summa_without - summa).toLocaleString()} сум`
                        let minus_one = document.querySelectorAll('.minus_one')
                        let plus_one = document.querySelectorAll('.plus_one')
                        let inp_baskets = document.querySelectorAll('.inp_basket')
                        let cart_page_item_delblock_btn = document.querySelectorAll('.cart_page_item_delblock_btn')
                        for (let delte of cart_page_item_delblock_btn) {
                            delte.onclick = () => {
                                remove('http://localhost:9090/basket', delte.id)
                                    .then(responseData => {
                                        console.log(responseData);
                                        location.reload()
                                    })
                                    .catch(error => {
                                        console.error('Произошла ошибка:', error);
                                    });
                            }
                        }
                        async function evention(block, numb) {
                            get(`http://localhost:9090/basket`)
                                .then(datab => {
                                    for (let data of datab) {
                                        if (data.id == block.parentElement.id) {
                                            data.quantity = parseInt(numb)
                                            put(`http://localhost:9090/basket`, data)
                                                .then(responseData => {
                                                    location.reload()
                                                })
                                        }
                                    }
                                })
                        }
                        for (let minus of minus_one) {
                            minus.onclick = () => {
                                if (parseInt(minus.nextElementSibling.value) > 1) {
                                    minus.nextElementSibling.value = parseInt(minus.nextElementSibling.value) - 1
                                    evention(minus, parseInt(minus.nextElementSibling.value))
                                }
                            }
                        }
                        for (let plus of plus_one) {
                            plus.onclick = () => {
                                if (parseInt(plus.previousElementSibling.value) < 100) {
                                    plus.previousElementSibling.value = parseInt(plus.previousElementSibling.value) + 1
                                    evention(plus, parseInt(plus.previousElementSibling.value))
                                }
                            }
                        }
                        for (let inp_basket of inp_baskets) {
                            inp_basket.onchange = () => {
                                if (parseInt(inp_basket.value) >= 1 && parseInt(inp_basket.value) <= 100) {
                                    evention(inp_basket, parseInt(inp_basket.value))
                                } else {
                                    alert("Вы вышли за диапазон количества товаров.")
                                    location.reload()
                                }
                            }
                        }
                    } else {
                        let cart_page_indextation = document.querySelector('.indextation')
                        let no_tovar = document.querySelector('.no_tovar')
                        no_tovar.style.display = 'flex'
                        cart_page_indextation.style.display = 'none'
                    }
                })
        } else {
            let cart_page_indextation = document.querySelector('.indextation')
            let no_tovar = document.querySelector('.no_tovar')
            no_tovar.style.display = 'flex'
            cart_page_indextation.style.display = 'none'
        }
    })
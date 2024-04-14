import { reload } from "../js/header"
import { given } from "../js/header"
import { get } from '../js/header.js'
import { post } from '../js/header.js'
import { remove } from '../js/header.js'
import { put } from '../js/header.js'
import { permission } from "../js/header"
get("http://localhost:9090/new_products")
    .then(data => {
        let arr_from_users = data
        const rub = 138.26
        let njj = document.querySelector('.njj')
        let not_found = true
        let category1 = null
        let log_in = document.querySelector('.log_in')
        let id_of_product = null
        let images_third_page = document.querySelector('.images_third_page')
        let id = location.search.split('=').at(-1)
        let dop_obj = {}
        let description_of_product = document.querySelector('.description_of_product')
        get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
            .then(data => {
                data.goods = [...data.goods, ...arr_from_users]
                for (let item of data.goods) {
                    if (item.id == id) {
                        dop_obj = item
                        item.price = parseInt(item.price * rub)
                        not_found = false
                        category1 = item.type
                        id_of_product = item.id
                        njj.src = item.media[0]
                        description_of_product.innerHTML = item.description
                        let need_do = document.querySelector('.need_do')
                        need_do.innerHTML = `<span style="color: #FDB44B;">★</span> ${item.rating}`
                        let title_third = document.querySelector('.title_third')
                        title_third.innerHTML = item.title
                        let price_third = document.querySelector('.price_third')
                        let green_prices = document.querySelector('.green_prices')
                        price_third.innerHTML = `от ${Math.ceil(item.price / 100 * (100 - item.salePercentage)).toLocaleString()} сум`
                        green_prices.innerHTML = `${Math.ceil(item.price / 100 * (100 - item.salePercentage)).toLocaleString()} сум/ед`
                        let sale_third = document.querySelector('.sale_third')
                        sale_third.innerHTML = `${item.price.toLocaleString()} сум`
                        let rass_third = document.querySelector('.rass_third')
                        rass_third.innerHTML = `${parseInt(Math.ceil(item.price / 100 * (100 - item.salePercentage)) / 8).toLocaleString()}`
                        for (let img of item.media) {
                            images_third_page.innerHTML += `<img src="${img}" class="third_img_left">`
                        }
                        let third_img_left = document.querySelectorAll('.third_img_left')
                        for (let i of third_img_left) {
                            i.onclick = () => {
                                njj.src = i.src
                            }
                        }
                    }
                }
                if (not_found == true) {
                    location.assign('/pages/doesntexist')
                }
            })
        let onsale_main = document.querySelector('.onsale_main')
        get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
            .then(data => {
                data.goods = [...data.goods, ...arr_from_users]
                for (let item of data.goods) {
                    if (item.type == category1 && item.id != id_of_product) {
                        item.price = parseInt(item.price * rub)
                        reload(onsale_main, item)
                    }
                }
                given()
            })
        let add_in_liked = document.querySelector('.add_in_liked')
        get('http://localhost:9090/liked')
            .then(data => {
                for (let item of data) {
                    if (item.id == id) {
                        add_in_liked.classList.add('product_be_liked')
                        add_in_liked.innerHTML = `Добавлен в избранное`
                        add_in_liked.title = 'Удалить?'
                    }
                }
            })
        add_in_liked.onclick = () => {
            if (permission == true) {
                if (add_in_liked.className != 'add_in_liked product_be_liked') {
                    try {
                        dop_obj.id = dop_obj.id.toString()
                        post('http://localhost:9090/liked', dop_obj)
                            .then(responseData => {
                                console.log(responseData);
                            })
                            .catch(error => {
                                console.error('Произошла ошибка:', error);
                            });
                        location.reload()
                    } catch { }
                } else {
                    remove('http://localhost:9090/liked', dop_obj.id)
                        .then(responseData => {
                            location.reload()
                        })
                        .catch(error => {
                            console.error('Произошла ошибка:', error);
                        });
                }
            } else {
                log_in.click()
            }
        }
        let notification = document.querySelector('#notification')
        let countsit = document.querySelectorAll('.countsit')
        let minus_one = countsit[1]
        let plus_one = countsit[0]
        let inp_baskets = document.querySelector('.inp_basket2')
        let bas_added = document.querySelector('.bas_added')
        let price_third = document.querySelector('.price_third')
        let without_sale = document.querySelector('.without_sale')
        let rass_third = document.querySelector('.rass_third')
        let green_prices = document.querySelector('.green_prices')
        minus_one.onclick = () => {
            if (parseInt(inp_baskets.value) > 1) {
                inp_baskets.value = parseInt(inp_baskets.value) - 1
                price_third.innerHTML = `от ${(Math.ceil(dop_obj.price / 100 * (100 - dop_obj.salePercentage)) * parseInt(inp_baskets.value)).toLocaleString()} сум`
                without_sale.innerHTML = `${(dop_obj.price * parseInt(inp_baskets.value)).toLocaleString()} сум`
                rass_third.innerHTML = `${(parseInt(Math.ceil(dop_obj.price / 100 * (100 - dop_obj.salePercentage)) / 8) * parseInt(inp_baskets.value)).toLocaleString()}`
                if (parseInt(inp_baskets.value) > 1) {
                    green_prices.style.display = 'block'
                } else {
                    green_prices.style.display = 'none'
                }
            }
        }
        plus_one.onclick = () => {
            if (parseInt(inp_baskets.value) < 100) {
                inp_baskets.value = parseInt(inp_baskets.value) + 1
                price_third.innerHTML = `от ${(Math.ceil(dop_obj.price / 100 * (100 - dop_obj.salePercentage)) * parseInt(inp_baskets.value)).toLocaleString()} сум`
                rass_third.innerHTML = `${(parseInt(Math.ceil(dop_obj.price / 100 * (100 - dop_obj.salePercentage)) / 8) * parseInt(inp_baskets.value)).toLocaleString()}`
                without_sale.innerHTML = `${(dop_obj.price * parseInt(inp_baskets.value)).toLocaleString()} сум`
                if (parseInt(inp_baskets.value) > 1) {
                    green_prices.style.display = 'block'
                } else {
                    green_prices.style.display = 'none'
                }
            }
        }
        inp_baskets.onchange = () => {
            if (parseInt(inp_baskets.value) < 1 || parseInt(inp_baskets.value) > 100) {
                alert("Вы вышли за диапазон количества товаров.")
                location.reload()
            } else {
                price_third.innerHTML = `от ${(Math.ceil(dop_obj.price / 100 * (100 - dop_obj.salePercentage)) * parseInt(inp_baskets.value)).toLocaleString()} сум`
                rass_third.innerHTML = `${(parseInt(Math.ceil(dop_obj.price / 100 * (100 - dop_obj.salePercentage)) / 8) * parseInt(inp_baskets.value)).toLocaleString()}`
                without_sale.innerHTML = `${(dop_obj.price * parseInt(inp_baskets.value)).toLocaleString()} сум`
                if (parseInt(inp_baskets.value) > 1) {
                    green_prices.style.display = 'block'
                } else {
                    green_prices.style.display = 'none'
                }
            }
        }
        bas_added.onclick = () => {
            if (permission == true) {
                let arr_from_users = []
                get(`http://localhost:9090/new_products`)
                    .then(data => {
                        if (data.length > 0) {
                            arr_from_users = data
                        }
                    })
                let our_object = {}
                let pirm = false
                get(`http://localhost:9090/basket`)
                    .then(datab => {
                        if (datab.length < 1) {
                            pirm = false
                        } else {
                            for (let data of datab) {
                                if (data.id == id) {
                                    pirm = true
                                    get(`http://localhost:9090/basket`)
                                        .then(datab => {
                                            for (let data of datab) {
                                                if (data.id == id) {
                                                    data.quantity = data.quantity + parseInt(inp_baskets.value)
                                                    if (data.quantity >= 100) {
                                                        data.quantity = 100
                                                    }
                                                    put(`http://localhost:9090/basket`, data)
                                                        .then(responseData => {
                                                            notification.style.display = 'flex';
                                                            setTimeout(function () {
                                                                notification.style.display = 'none';
                                                            }, 2000);
                                                            location.reload()
                                                        })
                                                        .catch(error => {
                                                            console.error('Произошла ошибка:', error);
                                                        });
                                                }
                                            }
                                        })
                                }
                            }
                        }
                        if (pirm == false) {
                            get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
                                .then(data => {
                                    data.goods = [...data.goods, ...arr_from_users]
                                    for (let item of data.goods) {
                                        if (item.id == id) {
                                            our_object = item
                                            our_object.quantity = parseInt(inp_baskets.value)
                                            our_object.id = our_object.id.toString()
                                            post('http://localhost:9090/basket', our_object)
                                                .then(responseData => {
                                                    notification.style.display = 'flex';
                                                    setTimeout(function () {
                                                        notification.style.display = 'none';
                                                    }, 2000);
                                                    location.reload()
                                                })
                                                .catch(error => {
                                                    console.error('Произошла ошибка:', error);
                                                });
                                        }
                                    }
                                })
                        }
                    })
            } else {
                log_in.click()
            }
        }
    })
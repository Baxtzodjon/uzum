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
        let lyo = document.querySelector('.lyo')
        lyo.onclick = () => {
            if (document.body.offsetWidth < 981) {
                let filter = document.querySelector('#filt')
                filter.style.left = `0%`
            }
        }

        let otmen = document.querySelector("#otmen")
        otmen.onclick = () => {
            if (document.body.offsetWidth < 981) {
                let filter = document.querySelector('#filt')
                filter.style.left = `-100%`
            }
        }
        let onsale_main = document.querySelectorAll('.onsale_main')
        console.log(onsale_main)
        get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
            .then(data => {
                data.goods = [...data.goods, ...arr_from_users]
                for (let item of data.goods) {
                    if (item.rating == 5) {
                        item.price = parseInt(item.price * rub)
                        reload(onsale_main[0], item)
                    }
                }
            })
        let kat_link = document.querySelectorAll('.kat_link')
        let categories = ['furniture', 'PC', 'audio', 'TV', 'kitchen']
        let arrColors = ['red', 'green', 'orange', 'black', 'blue', 'gray', 'white']
        for (let j = 0; j < categories.length; j++) {
            kat_link[j].onclick = () => {
                location.assign(`/pages/category?=${kat_link[j].id}`)
            }
        }
        let id = ''
        let startString = "category?=";
        let endString = "&";
        let startIndex = window.location.href.indexOf(startString) + startString.length;
        let endIndex = window.location.href.indexOf(endString, startIndex);
        id = window.location.href.substring(startIndex, endIndex);
        if (id.charAt(id.length - 1) == '=') {
            id = location.search.split('=').at(-1)
        }
        const urlParams = new URLSearchParams(window.location.search);
        let arr_colors_of = []
        if (urlParams.has('colors')) {
            let query_url = urlParams.get('colors');
            arr_colors_of = query_url.split(',')
        }
        function prices() {
            let price_of_product = document.querySelectorAll('.filter_grid .price_of_product')
            let price = []
            for (let i of price_of_product) {
                let pricet = i.innerHTML.replace(/&nbsp;/g, '');
                pricet = pricet.slice(0, -4)
                pricet = parseInt(pricet)
                price.push(pricet)
            }
            console.log(price)
            let oton = document.querySelector('#ot')
            let don = document.querySelector('#do')
            let max = Math.max(...price)
            let min = Math.min(...price)
            oton.value = min
            don.value = max
            oton.onchange = () => {
                if (parseInt(oton.value) <= 0) {
                    oton.value = 0
                }
                if (parseInt(oton.value) >= parseInt(don.value)) {
                    oton.value = don.value
                }
                for (let i of price_of_product) {
                    if (parseInt(i.innerHTML.replace(/&nbsp;/g, '').slice(0, -4)) >= oton.value && parseInt(i.innerHTML.replace(/&nbsp;/g, '').slice(0, -4)) <= don.value) {
                        i.parentElement.parentElement.parentElement.parentElement.style.display = 'flex'
                    } else {
                        i.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
                    }
                }
            }
            don.onchange = () => {
                if (parseInt(don.value) >= max) {
                    don.value = max
                }
                if (parseInt(don.value) <= parseInt(oton.value)) {
                    don.value = oton.value
                }
                for (let i of price_of_product) {
                    if (parseInt(i.innerHTML.replace(/&nbsp;/g, '').slice(0, -4)) >= oton.value && parseInt(i.innerHTML.replace(/&nbsp;/g, '').slice(0, -4)) <= don.value) {
                        i.parentElement.parentElement.parentElement.parentElement.style.display = 'flex'
                    } else {
                        i.parentElement.parentElement.parentElement.parentElement.style.display = 'none'
                    }
                }
            }
        }
        let rus = ''
        if (id == 'furniture') { rus = 'Мебель' }
        else if (id == 'PC') { rus = 'Электроника' }
        else if (id == 'audio') { rus = 'Аудио техника' }
        else if (id == 'TV') { rus = 'Телевизоры' }
        else if (id == 'kitchen') { rus = 'Кухонные приборы' }
        let f_tit = document.querySelector('.f_tit')
        f_tit.innerHTML = rus
        let filter_grid = document.querySelector('.filter_grid')
        get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
            .then(data => {
                data.goods = [...data.goods, ...arr_from_users]
                for (let item of data.goods) {
                    if (item.type == id) {
                        if (arr_colors_of.length < 1) {
                            console.log(item)
                            reload(filter_grid, item)
                        } else {
                            if (arr_colors_of.includes(item.colors[0]) || arr_colors_of.includes(item.colors[1]) || arr_colors_of.includes(item.colors[2]) || arr_colors_of.includes(item.colors[3]) || arr_colors_of.includes(item.colors[4])) {
                                console.log(item)
                                reload(filter_grid, item)
                            }
                        }
                    }
                }
                given()
                prices()
            })
        if (urlParams.has('query')) {
            let queryValue = urlParams.get('query');
            console.log(queryValue)
            if (queryValue != '') {
                let main_search = document.querySelector('.main_search')
                let phone_search = document.querySelector('.phone-search')
                phone_search.value = queryValue
                main_search.value = queryValue
                let not_found = true
                get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
                    .then(data => {
                        data.goods = [...data.goods, ...arr_from_users]
                        for (let item of data.goods) {
                            if (item.title.toLocaleLowerCase().search(queryValue.toLocaleLowerCase()) != -1) {
                                not_found = false
                                if (arr_colors_of.length > 0) {
                                    if (arr_colors_of.includes(item.colors[0]) || arr_colors_of.includes(item.colors[1]) || arr_colors_of.includes(item.colors[2]) || arr_colors_of.includes(item.colors[3]) || arr_colors_of.includes(item.colors[4])) {
                                        f_tit.innerText = `Товары по запросу "${queryValue}"`
                                        reload(filter_grid, item)
                                    }
                                } else {
                                    f_tit.innerText = `Товары по запросу "${queryValue}"`
                                    reload(filter_grid, item)
                                }
                            }
                        }
                        if (not_found == true) {
                            location.assign('/pages/doesntexist')
                        }
                        given()
                        prices()
                    })
            } else {
                location.assign('/pages/doesntexist')
            }
        } else {
            console.log('Параметр "query" не найден в URL.');
        }
        let filter_color = document.querySelectorAll('.filter_color')
        let query_url = ''
        let arr_colors = []
        if (urlParams.has('colors')) {
            query_url = urlParams.get('colors');
            if (query_url != '') {
                arr_colors = query_url.split(',')
                for (let i = 0; i < arr_colors.length; i++) {
                    if (arrColors.includes(arr_colors[i])) { } else {
                        location.assign('/pages/doesntexist')
                    }
                    for (let filter of filter_color) {
                        if (filter.id == arr_colors[i]) {
                            filter.classList.add('act_block')
                        }
                    }
                    if (arr_colors.filter(item => item === arr_colors[i]).length >= 2) {
                        if (i > -1 && i < arr_colors.length) {
                            arr_colors.splice(i, 1);
                        }
                        let indexOfEqualSign = window.location.href.lastIndexOf("=");
                        let newUrl = window.location.href.substring(0, indexOfEqualSign + 1);
                        let colors_string = arr_colors.join(',')
                        location.assign(`${newUrl}${colors_string}`)
                    }
                }
            } else {
                let url = new URL(window.location.href);
                let params = new URLSearchParams(url.search);
                params.delete('colors');
                url.search = params.toString();
                url = url.toString();
                location.assign(url)
            }
        }
        for (let i of filter_color) {
            i.onclick = () => {
                if (i.className != 'filter_color act_block') {
                    if (urlParams.has('colors')) {
                        query_url = urlParams.get('colors');
                        if (query_url != '') {
                            location.assign(`${location},${i.id}`)
                        }
                    } else {
                        location.assign(`${location}&colors=${i.id}`)
                    }
                } else {
                    let url = window.location.href;
                    function removeWordFromLink(link, word) {
                        let url = new URL(link);
                        let params = new URLSearchParams(url.search);
                        params.forEach((value, key) => {
                            if (key === 'colors') {
                                let colors = value.split(',');
                                let index = colors.findIndex(color => color === word);
                                if (index !== -1) {
                                    colors.splice(index, 1);
                                    params.set('colors', colors.join(','));
                                }
                            }
                            if (key === 'color' && value === word) {
                                params.delete('color');
                            }
                        });
                        url.search = params.toString();
                        if (url.search.endsWith(',')) {
                            url.search = url.search.slice(0, -1);
                        }
                        return url.toString();
                    }
                    url = removeWordFromLink(url, i.id)
                    url = url.replace(/%2C/g, ',');
                    location.assign(url)
                }
            }
        }
        let clear_filters = document.querySelector('.clear_filters')
        clear_filters.onclick = () => {
            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search);
            params.delete('colors');
            url.search = params.toString();
            url = url.toString();
            location.assign(url)
        }
    })
import axios from 'axios'
// put
export const put = async (url, data) => {
  if (url != 'http://localhost:9090/basket') {
    try {
      let res = await axios.put(url, data);
      return res.data;
    } catch (error) {
      console.error('Ошибка при отправке PUT-запроса:', error);
      return null;
    }
  } else {
    console.log(url, data);
    fetch('http://localhost:9090/users')
      .then(response => response.json())
      .then(datab => {
        if (datab != null && datab.length > 0) {
          for (let my_account of datab) {
            if (my_account.email == localStorage.getItem('email')) {
              for (let i = 0; i < my_account.basket.length; i++) {
                if (my_account.basket[i].id == data.id) {
                  my_account.basket[i] = data
                }
              }
              const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(my_account)
              };
              fetch(`http://localhost:9090/users/${my_account.id}`, requestOptions)
                .then(async response => {
                  console.log(response);
                })
            }
          }
        }
      })
  }
};
// get
export const get = async (url) => {
  if (url != 'http://localhost:9090/liked' && url != 'http://localhost:9090/basket') {
    try {
      let res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error('Ошибка при отправке GET-запроса:', error);
      return null;
    }
  } else if (url == 'http://localhost:9090/liked') {
    return fetch('http://localhost:9090/users')
      .then(response => response.json())
      .then(data => {
        if (data != null && data.length > 0) {
          for (let my_account of data) {
            if (my_account.email == localStorage.getItem('email')) {
              console.log(my_account.liked);
              return my_account.liked
            }
          }
        }
      })
  } else if (url == 'http://localhost:9090/basket') {
    return fetch('http://localhost:9090/users')
      .then(response => response.json())
      .then(data => {
        if (data != null && data.length > 0) {
          for (let my_account of data) {
            if (my_account.email == localStorage.getItem('email')) {
              return my_account.basket
            }
          }
        }
      })
  }
};
// post
export const post = async (url, data) => {
  if (url != 'http://localhost:9090/liked' && url != 'http://localhost:9090/basket') {
    try {
      let res = await axios.post(url, data);
      return res.data;
    } catch (error) {
      console.error('Ошибка при отправке POST-запроса:', error);
      return null;
    }
  } else if (url == 'http://localhost:9090/liked') {
    return fetch('http://localhost:9090/users')
      .then(response => response.json())
      .then(datab => {
        if (datab != null && datab.length > 0) {
          for (let my_account of datab) {
            if (my_account.email == localStorage.getItem('email')) {
              my_account.liked.push(data)
              console.log(my_account);
              put(`http://localhost:9090/users/${my_account.id}`, my_account)
                .then(responseData => {
                  return responseData
                })
                .catch(error => {
                  console.error('Произошла ошибка:', error);
                });
            }
          }
        }
      })
  } else if (url == 'http://localhost:9090/basket') {
    return fetch('http://localhost:9090/users')
      .then(response => response.json())
      .then(datab => {
        if (datab != null && datab.length > 0) {
          for (let my_account of datab) {
            if (my_account.email == localStorage.getItem('email')) {
              my_account.basket.push(data)
              put(`http://localhost:9090/users/${my_account.id}`, my_account)
                .then(responseData => {
                  return responseData
                })
                .catch(error => {
                  console.error('Произошла ошибка:', error);
                });
            }
          }
        }
      })
  }
};
// delete
export const remove = async (url, id) => {
  if (url != 'http://localhost:9090/liked' && url != 'http://localhost:9090/basket') {
    try {
      const response = await axios.delete(`${url}/${id}`);
      console.log(`Успешно удален объект с id ${id}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении объекта:', error);
      return null;
    }
  } else if (url == 'http://localhost:9090/liked') {
    return fetch('http://localhost:9090/users')
      .then(response => response.json())
      .then(datab => {
        if (datab != null && datab.length > 0) {
          for (let my_account of datab) {
            if (my_account.email === localStorage.getItem('email')) {
              my_account.liked = my_account.liked.filter(item => item.id !== id.toString());
              console.log(my_account);
              put(`http://localhost:9090/users/${my_account.id}`, my_account)
                .then(responseData => {
                  return responseData
                })
                .catch(error => {
                  console.error('Произошла ошибка:', error);
                });
            }
          }
        }
      })
  } else if (url == 'http://localhost:9090/basket') {
    return fetch('http://localhost:9090/users')
      .then(response => response.json())
      .then(datab => {
        if (datab != null && datab.length > 0) {
          for (let my_account of datab) {
            if (my_account.email === localStorage.getItem('email')) {
              my_account.basket = my_account.basket.filter(item => item.id !== id.toString());
              console.log(my_account);
              put(`http://localhost:9090/users/${my_account.id}`, my_account)
                .then(responseData => {
                  return responseData
                })
                .catch(error => {
                  console.error('Произошла ошибка:', error);
                });
            }
          }
        }
      })
  }
};
const response = await fetch("http://localhost:9090/new_products");
let arr_from_users = await response.json();
let log_in = document.querySelector(".log_in")
let catalog_url = document.querySelector(".catalog_url")
const rub = 138.26
catalog_url.onclick = () => {
  location.assign("/pages/catalog")
}
let category_url = document.querySelector(".category_url")

category_url.onclick = () => {
  location.assign("/pages/cart")
}


let cabinet_url = document.querySelector(".cabinet_url")
export let permission = false
get('http://localhost:9090/users')
  .then(data => {
    if (data != null && data.length > 0) {
      for (let item of data) {
        if (localStorage.getItem('email') == item.email) {
          permission = true
          let lo = document.querySelector('#lo')
          lo.style.display = 'none'
        }
      }
    }
  })
cabinet_url.onclick = () => {
  if (permission == false) {
    log_in.click()
  } else {
    location.assign('/pages/cabinet')
  }
}
try {
  let home_url = document.querySelector(".home")
  home_url.onclick = () => {
    location.assign('/')
  }

}
catch { }
try {
  let reg_phone = document.querySelector(".reg_phone")

  reg_phone.onclick = () => {
    location.assign('/pages/profile')
  }
}
catch { }
try {
  let favorites_pages = document.querySelector(".favorites_pages")

  favorites_pages.onclick = () => {
    location.assign('/pages/wishes')
  }
  let favorites_url = document.querySelector(".favorites_url")

  favorites_url.onclick = () => {
    location.assign('/pages/wishes')
  }
}
catch { }

let logo = document.querySelector('.logo')
logo.onclick = () => {
  location.assign('/')
}
let home_phone = document.querySelector('.home_phone')
home_phone.onclick = () => {
  location.assign('/')
}
// let katalog_url = document.querySelector(".katalog")

// katalog_url.onclick = () => {
//     location.assign('/pages/category')
// }
try {
  let questionandanswer_url = document.querySelector(".questionandanswer_url")
  questionandanswer_url.onclick = () => {
    location.assign('/pages/quesandanswer/question')
  }
  let cart_url = document.querySelector(".cart_url")

  cart_url.onclick = () => {
    location.assign('/pages/cart')
  }

  let wishes_url = document.querySelector(".wishes_url")

  wishes_url.onclick = () => {
    location.assign('/pages/wishes')
  }
}
catch { }

let cart = document.querySelector(".cart_btn")

cart.onclick = () => {
  location.assign('/pages/cart')
}


let goTopBtn = document.querySelector('.go-top-btn')

window.addEventListener('scroll', checkHeigth)

function checkHeigth() {
  if (window.scrollY > 200) {
    goTopBtn.style.display = "flex"
  } else {
    goTopBtn.style.display = "none"
  }
}

goTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})
try {
  let new_tovar = document.querySelector(".new_tovar")

  new_tovar.onclick = () => {
    if (permission == true) {
      location.assign('/pages/newtovar')
    } else {
      log_in.click()
    }
  }
} catch { }

let wishes2 = document.querySelector(".adapt_1100");

wishes2.onclick = () => {
  location.assign('/pages/wishes')
}

let body2 = document.querySelector('.body2')
const divContainer = document.querySelector('#background_search');
const baxtzod = document.querySelector(".catalog_btn");
let isClicked = true;
let showOrHide = function () {
  if (isClicked) {
    divContainer.style.display = "block";
    body2.style.boxShadow = `rgb(238 238 238) 0px 90px 90px 0px`
    isClicked = false;
  } else {
    body2.style.boxShadow = `rgb(238 238 238) 0px 0px 0px 0px`
    divContainer.style.display = "none";
    isClicked = true;
  }
}
function countObjectsByCategory(data, category) {
  const count = data.filter(obj => obj.type === category).length;
  return count;
}

baxtzod.onclick = () => {
  showOrHide()
}
let user_personals = document.querySelector(".user_personal")
let register_modal = document.querySelector('.register_modal')
let register_modal_close = document.querySelector(".register_modal_close")
let register = document.querySelector(".register")
let body = document.body
register_modal_close.onclick = () => {
  body.style.overflow = "visible";
  register_modal.style.opacity = "0";
  register.style.transform = "translateY(50%)";

  setTimeout(() => {
    register_modal.style.display = "none";
  }, 1000);
}
user_personals.onclick = () => {
  if (permission == false) {
    body.style.overflow = "hidden";
    register_modal.style.opacity = "1";
    register.style.transform = "translateY(0%)";
    register_modal.style.display = "block";
  } else {
    location.assign('/pages/profile')
  }
}
export async function reload(place, item) {
  place.innerHTML += `<div class="onsale_products">
  <a href="/pages/product?id=${item.id}" class="background_products">
    <img src="${item.media[0]}" alt="">
  </a>
  <div class="heart" id="${item.id}">
    <svg data-v-ff0a7354="" width="20" height="20" class="heart_not_active" viewBox="0 0 20 20" fill="none"
      xmlns="http://www.w3.org/2000/svg" alt="like">
      <path
        d="M5.95 2C8.51792 2 10 4.15234 10 4.15234C10 4.15234 11.485 2 14.05 2C16.705 2 19 4.07 19 6.95C19 11.1805 12.5604 15.6197 10.3651 17.5603C10.1582 17.7432 9.84179 17.7432 9.63488 17.5603C7.44056 15.6209 1 11.1803 1 6.95C1 4.07 3.295 2 5.95 2Z"
        fill="white" fill-opacity="0.8"></path>
      <path
        d="M1 6.86486C1 4.20297 3.15017 2 5.86486 2C7.98685 2 9.35921 3.35876 10 4.18673C10.6408 3.35876 12.0132 2 14.1351 2C16.8506 2 19 4.20302 19 6.86486C19 8.02987 18.5328 9.18622 17.8534 10.265C17.1716 11.3476 16.252 12.3903 15.29 13.3377C13.9567 14.6508 12.4757 15.8387 11.4134 16.6907C10.9618 17.0529 10.5859 17.3544 10.3293 17.579C10.1407 17.7439 9.85926 17.7439 9.67075 17.579C9.41405 17.3544 9.03815 17.0529 8.58659 16.6907C7.52431 15.8387 6.04326 14.6508 4.70997 13.3377C3.74802 12.3903 2.82836 11.3476 2.14659 10.265C1.46724 9.18622 1 8.02987 1 6.86486ZM5.86486 3C3.70929 3 2 4.74838 2 6.86486C2 7.76743 2.36553 8.73607 2.99277 9.73208C3.61759 10.7242 4.47833 11.706 5.41165 12.6252C6.71033 13.9042 8.08423 15.005 9.13396 15.8461C9.45728 16.1052 9.74985 16.3396 10 16.547C10.2501 16.3396 10.5427 16.1052 10.866 15.8461C11.9158 15.005 13.2897 13.9042 14.5883 12.6252C15.5217 11.706 16.3824 10.7242 17.0072 9.73208C17.6345 8.73607 18 7.76743 18 6.86486C18 4.74833 16.2914 3 14.1351 3C12.0406 3 10.8181 4.70211 10.5033 5.21028C10.2727 5.5825 9.72727 5.58249 9.4967 5.21027C9.1819 4.7021 7.95944 3 5.86486 3Z"
        fill="#15151A"></path>
    </svg>
    <img src="/icons/uzum_active_heart.png" class="active-heart-image">
  </div>
  <!-- <img src="./img/uzum.uz_ru__1_-removebg-preview.png" class="active-heart-image"> -->
  <div class="onsale_item_text">
    <p class="item_title">${item.title}</p>
    <p style="color: #989BA5; font-size: 12px;"><span style="color: #FDB44B;">★</span> ${item.rating} (? оценок)</p>
    <span class="rassrochka">
      <p>${parseInt(Math.ceil(item.price / 100 * (100 - item.salePercentage)) / 8).toLocaleString()} сум/мес</p>
    </span>
    <div class="add_cart_block">
      <div>
        <p class="without_sale">${item.price.toLocaleString()} сум</p>
        <p style="font-size: 12px;" class="price_of_product">${Math.ceil(item.price / 100 * (100 - item.salePercentage)).toLocaleString()} сум</p>
      </div>
      <svg id="${item.id}" class="add_cart" data-v-40da8b10="" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z"
          fill="black"></path>
        <path
          d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17H10.5C10.7761 17 11 17.2239 11 17.5C11 17.7761 10.7761 18 10.5 18H8V20.5C8 20.7761 7.77614 21 7.5 21C7.22386 21 7 20.7761 7 20.5V18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H7V14.5C7 14.2239 7.22386 14 7.5 14Z"
          fill="black"></path>
      </svg>
    </div>
  </div>
</div>`
}
let heart = null
let notification = document.querySelector('#notification')
let add_cart = document.querySelectorAll('.add_cart')
export async function given() {
  // BASKET
  function give_busk() {
    add_cart = document.querySelectorAll('.add_cart')
    for (let item of add_cart) {
      item.onclick = () => {
        if (permission == true) {
          let our_object = {}
          get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
            .then(data => {
              data.goods = [...data.goods, ...arr_from_users]
              for (let it of data.goods) {
                if (it.id == item.id) {
                  our_object = it
                  our_object.quantity = 1
                  our_object.id = our_object.id.toString()
                }
              }
            })
          let true_or_false = false
          notification.style.display = 'flex';
          setTimeout(function () {
            notification.style.display = 'none';
          }, 2000);
          get('http://localhost:9090/basket')
            .then(data => {
              if (data.length > 0) {
                for (let it of data) {
                  if (it.id == item.id) {
                    true_or_false = true
                    it.quantity = it.quantity + 1
                    put(`http://localhost:9090/basket`, it)
                      .then(responseData => {
                        let link = window.location.href;
                        let lastSixCharacters = link.slice(-4);
                        if (lastSixCharacters == 'cart') {
                          location.reload()
                        }
                      })
                      .catch(error => {
                        console.error('Произошла ошибка:', error);
                      });
                  }
                }
                if (true_or_false == false) {
                  post('http://localhost:9090/basket', our_object)
                    .then(responseData => {
                      let link = window.location.href;
                      let lastSixCharacters = link.slice(-4);
                      if (lastSixCharacters == 'cart') {
                        location.reload()
                      }
                    })
                    .catch(error => {
                      console.error('Произошла ошибка:', error);
                    });
                }
              } else {
                post('http://localhost:9090/basket', our_object)
                  .then(responseData => {
                    let link = window.location.href;
                    let lastSixCharacters = link.slice(-4);
                    console.log(lastSixCharacters);
                    if (lastSixCharacters == 'cart') {
                      location.reload()
                    }
                  })
                  .catch(error => {
                    console.error('Произошла ошибка:', error);
                  });
              }
            })
        } else {
          log_in.click()
        }
      }
    }
  }
  give_busk()
  // LIKED
  function d() {
    for (let like of heart) {
      like.onclick = () => {
        if (permission == true) {
          if (like.className !== 'heart active_heart') {
            //add
            get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
              .then(data => {
                data.goods = [...data.goods, ...arr_from_users]
                for (let item of data.goods) {
                  if (item.id == like.id) {
                    let id = item.id
                    item.id = id.toString()
                    post('http://localhost:9090/liked', item)
                      .then(responseData => {
                        console.log(responseData);
                      })
                      .catch(error => {
                        console.error('Произошла ошибка:', error);
                      });
                  }
                }
              })
            let link = window.location.href;
            let lastSixCharacters = link.slice(-6);
            if (lastSixCharacters == 'wishes') {
              location.reload()
            }
            for (let it of heart) {
              if (it.id == like.id) {
                it.classList.add('active_heart')
              }
            }
          } else {
            //remove
            try {
              remove('http://localhost:9090/liked', like.id)
              let link = window.location.href;
              let lastSixCharacters = link.slice(-6);
              if (lastSixCharacters == 'wishes') {
                location.reload()
              }
            } catch { }
            for (let it of heart) {
              if (it.id == like.id) {
                it.classList.remove('active_heart')
              }
            }
          }
        } else {
          log_in.click()
        }
      }
    }
  }
  if (permission == true) {
    heart = document.querySelectorAll('.heart')
    try {
      const link = window.location.href;
      const lastSixCharacters = link.slice(-6);
      if (lastSixCharacters == 'wishes') {
        get('http://localhost:9090/liked')
          .then(data => {
            if (data.length > 0) {
              let lik = document.querySelector('.liked')
              lik.style.display = 'none'
              let wishes_none = document.querySelector('.wishes_none')
              wishes_none.style.display = 'grid'
              let onsale_main = document.querySelectorAll('.onsale_main');
              for (let item of data) {
                reload(onsale_main[0], item)
              }
              heart = document.querySelectorAll('.heart')
              d()
              give_busk()
            }
          })
      }
    } catch { }
    get('http://localhost:9090/liked')
      .then(data => {
        for (let it of heart) {
          for (let ti of data) {
            if (it.id == ti.id) {
              it.classList.add('active_heart')
            }
          }
        }
      })
    d()
  }
}
let catalog_search = document.querySelector('.catalog_search')
let childrens = catalog_search.children
let categories2 = ['furniture', 'PC', 'audio', 'TV', 'kitchen']
for (let j = 0; j < categories2.length; j++) {
  childrens[j + 1].id = categories2[j]
  childrens[j + 1].onclick = () => {
    location.assign(`/pages/category?=${childrens[j + 1].id}`)
  }
}
get('https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json')
  .then(data => {
    data.goods = [...data.goods, ...arr_from_users]
    let tvCount = countObjectsByCategory(data.goods, 'TV');
    let audioCount = countObjectsByCategory(data.goods, 'audio');
    let furnitureCount = countObjectsByCategory(data.goods, 'furniture');
    let kitchenCount = countObjectsByCategory(data.goods, 'kitchen');
    let pcCount = countObjectsByCategory(data.goods, 'PC');
    childrens[1].lastChild.innerHTML = `${furnitureCount} товара`
    childrens[2].lastChild.innerHTML = `${pcCount} товара`
    childrens[3].lastChild.innerHTML = `${audioCount} товара`
    childrens[4].lastChild.innerHTML = `${tvCount} товара`
    childrens[5].lastChild.innerHTML = `${kitchenCount} товара`
  })

let main_search = document.querySelector('.main_search')
let phone_search = document.querySelector('.phone-search')
main_search.onchange = () => {
  location.assign(`/pages/category?query=${main_search.value}`)
}
phone_search.onchange = () => {
  location.assign(`/pages/category?query=${phone_search.value}`)
}


// REGISTRATION
let inp_acc = document.querySelectorAll('.inp_acc')
let name = inp_acc[0]
let password = inp_acc[1]
let email = inp_acc[2]
let get_code = document.querySelectorAll('.get_code')
let login = get_code[0]
let signup = get_code[1]
signup.onclick = (e) => {
  e.preventDefault()
  let my_account = {
    name: name.value,
    password: password.value,
    email: email.value,
    liked: [],
    basket: []
  }
  let sign_permission = true
  get('http://localhost:9090/users')
    .then(data => {
      if (data.length > 0) {
        for (let item of data) {
          if (my_account.email == item.email) {
            sign_permission = false
          }
        }
        if (sign_permission == false) {
          alert('Аккаунт с таким "email" уже существует')
        } else {
          post('http://localhost:9090/users', my_account)
            .then(responseData => {
              localStorage.setItem('email', my_account.email)
              location.reload()
            })
        }
      } else {
        post('http://localhost:9090/users', my_account)
          .then(responseData => {
            localStorage.setItem('email', my_account.email)
            location.reload()
          })
      }
    })
}
login.onclick = (e) => {
  e.preventDefault()
  let my_account = {
    name: name.value,
    password: password.value,
    email: email.value
  }
  let sign_permission = true
  let yours = {}
  get('http://localhost:9090/users')
    .then(data => {
      if (data.length > 0) {
        for (let item of data) {
          if (my_account.email == item.email && my_account.name == item.name && my_account.password == item.password) {
            sign_permission = false
            yours = item
          }
        }
        if (sign_permission == false) {
          localStorage.setItem('email', yours.email)
          location.reload()
        } else {
          alert('Аккаунт не найден !')
        }
      } else {
        alert('Аккаунт не найден !')
      }
    })
}

get('http://localhost:9090/users')
  .then(data => {
    if (data.length > 0) {
      for (let item of data) {
        if (item.email == localStorage.getItem('email')) {
          if (item.image != undefined) {
            let avatarka = document.querySelector('.avatarka')
            avatarka.src = item.image
          }
        }
      }
    }
  })
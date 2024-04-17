let topchat_url = document.querySelector(".h-child")
let refBtn = document.querySelector(".refBtn")

refBtn.addEventListener("click", initChat)

topchat_url.onclick = () => {
    location.assign('/index')
}

let data = {
    // chatinit: {
    //     title: ["Здравствуйте <span class='emoji> &#128075;</span>", "Я Мистер Чатбот", "Могу я чем-нибудь помочь ?"],
    //     options: ["Мебель <span class='emoji'> &#128719;</span>", "Компютер <span class='emoji'> &#128187; </span>", "TV <span class='emoji'> &#128250; </span>", "Аудио <span class='emoji'> &#127897;</span>", "Кухня <span class='emoji'> &#127860;</span>"],
    // },
    // movies: {
    //     title: ["Today's Top 5 Headlinessfd"],
    //     options: ["The green", "The rare"],
    //     url: {

    //     }
    // },
    chatinit: {
        title: ["Здравствуйте <span class='emoji> &#128075;</span>", "Я Мистер Чатбот", "Могу я чем-нибудь помочь ?"],
        options: ["Mebel", "Kompyuter", "TV", "Audio"],
    },
    mebel: {
        title: ["Пожалуйста, выберите категорию"],
        options: ["GamingArmchair", "GamingArmChairNormal", "GamingArmchairMiddle"],
        url: {

        }
    },
    kompyuter: {
        title: ["2 лучших игровых монитора на сегодняшний день"],
        options: ["Монитор игровой HP OMEN X Emperium 65", "Монитор игровой Samsung Odyssey G5 (LS27AG502NIXCI)"],
        url: {
            more: "https://youtube.com/@KOMPUKTER?si=vnEhRfObMWKyNRk8",
            link: ["https://youtu.be/PS9F2KZ5Pbk?si=fWnQcD5kfFresn_Y", "https://youtu.be/aDUz4nCP_r4?si=4wDzQc1k4vmyD3_w"]
        }
    },
    tv: {
        title: ["Пожалуйста, выберите категорию ТВ <span class='emoji'> &#128250;</span>"],
        options: ["Телевизор Hisense 32A4BG", "Телевизор Haier 43 Smart TV MX", "Телевизор Hisense 50A6BG"],
        url: {
            more: "https://youtu.be/ryNKAuFvGCM?si=yHrQsi7s6yECr5JS",
            link: ["https://youtu.be/bzZYKuGRAYE?si=X953vgMKsF6eylPq", "https://youtu.be/cm0_dPZ7nCE?si=rCAVfNecB2YBJHGh", "https://youtu.be/7aICaFWO1N8?si=vsUn0obWaJNLdoB9"]
        }
    },
    audio: {
        title: ["Вот некоторые новейшие аудиогаджеты <span class='emoji'> &#128187;</span>"],
        options: ["Игровой микрофон для компьютера Blue Yeti Nano Shadow Grey (988-000205)", "Наушники True Wireless Soul SYNC PRO White", "Полочные колонки KEF Q150 Black (пара)"],
        url: {
            more: "https://youtu.be/zeDUuyFmnfo?si=4LIj0wBa628CmBt0",
            link: ["https://youtu.be/CC5pDWOErFU?si=CMk3ttSNnyz8QDej", "https://youtu.be/Vmle5Xl9yjM?si=dYeXPKQsidb6BNO2", "https://youtu.be/luxckmYz7q0?si=qEvw1TIhSe1wKP7M"]
        }
    },
    gamingarmchair: {
        title: ["Спасибо за ваш ответ", "Вот несколько название игровых креслов"],
        options: ["Кресло компьютерное игровое Cougar ARMOR One Black-Orange", "Кресло компьютерное игровое Red Square Pro Pure Black (RSQ-50020)", "Кресло компьютерное игровое Bloody GC-150", "Кресло компьютерное игровое Red Square Eco Blazing (RSQ-50026)"],
        url: {
            more: "https://youtu.be/1VDJ4MUC4-Y?si=Bigy25vmdCvfsGLl",
            link: ["https://youtu.be/7xMIoygPTCM?si=_MjSBTqgQu1mDnbf", "https://youtu.be/oy0Tk4ucOFM?si=sekp4bW4DyFfvmXL", "https://youtu.be/wjvyNmFyRSE?si=GP1uXFEeJVC8WsEr", "https://youtu.be/2iW7B9-BoCY?si=BF9B7VmfudG2PhBg"]
        }
    },
    gamingarmchairnormal: {
        title: ["Вот еще несколько вариантов для тебя"],
        options: ["Кресло компьютерное игровое ThunderX3 TC3 Azure Blue", "Кресло компьютерное игровое Red Square Pro: Fresh Lime", "Кресло компьютерное игровое Bloody GC-600", "Кресло компьютерное игровое Bloody GC-100"],
        url: {
            more: "https://youtu.be/YPRDXn3pueE?si=w8ovSYoPTqrQHMgC",
            link: ["https://youtu.be/VWolXiBCsEU?si=U18Wf_bAcJGlsu2s", "https://youtu.be/zwynTF2YToA?si=B1f4mGvIYknj786F", "https://youtu.be/k4XTX4ot980?si=E70SP7mzlVxCtpVQ", "https://youtu.be/p3axdRn1yaE?si=wTIZEKSkVVFx1hJg"]
        }
    },
    gamingarmchairmiddle: {
        title: ["Это последние категорий игровых креслов, которые стоит посмотреть"],
        options: ["Кресло компьютерное игровое Canyon Corax (CND-SGCH5)", "Кресло компьютерное Brabix Tender MG-330 Black (531845)"],
        url: {
            more: "https://youtu.be/RnVu7R8L46M?si=ioIz98V9h5XU7uXB",
            link: ["https://youtu.be/k5LtVil5hUA?si=r665qV5djoZoTuRO", "https://youtu.be/1R-eFeUtJtc?si=sculfbuViXZMunXk"]
        }
    },
    // others: {
    //     title: ["Вот еще несколько вариантов для тебя"],
    //     options: ["YouTube", "Netflix", "Amazon Prime", "Hot Star"],
    //     url: {
    //         more: "",
    //         link: ["", "", ""]
    //     }
    // },
}

document.getElementById("init").addEventListener("click", showChatBot);
let cbot = document.getElementById("chat-box");
let len1 = data.chatinit.title.length;

function showChatBot() {
    console.log(this.innerText);
    if (this.innerText == 'Start Chat') {
        document.getElementById('test').style.display = 'block';
        document.getElementById('init').style.innerText = 'CLOSE CHAT';
        initChat();
    } else {
        location.reload();
    }
}

function initChat() {
    j=0;
    cbot.innerHTML = '';
    for (let i = 0; i < len1; i++) {
        setTimeout(handleChat, (i * 500));
    }
    setTimeout(function() {
        showOptions(data.chatinit.options)
    }, ((len1+1) * 500))
}

let j = 0;
function handleChat() {
    console.log(j);
    let elm = document.createElement("p");
    elm.innerHTML = data.chatinit.title[j];
    elm.setAttribute("class", "msg");
    cbot.append(elm);
    j++;
    handleScroll();
}

function showOptions(options) {
    for (let i = 0; i < options.length; i++) {
        let opt = document.createElement("span")
        let inp = '<div>'+ options[i]+'</div>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt")
        opt.addEventListener("click", handleOpt);
        cbot.append(opt)
        handleScroll();
    }
}

function handleOpt() {
    console.log(this);
    let str = this.innerText;
    let textArr = str.split(" ");
    let findText = textArr[0];
    document.querySelectorAll(".opt").forEach(el => {
        el.remove();
    })
    let elm = document.createElement("p");
    elm.setAttribute("class", "test");
    let sp = '<span class="rep">'+findText+'</span>';
    elm.innerHTML = sp;
    cbot.append(elm);

    console.log(findText.toLowerCase());
    let tempObj = data[findText.toLowerCase()];
    handleResults(tempObj.title, tempObj.options, tempObj.url);
}

function handleResults(title, options, url) {
    for (let i = 0; i < title.length; i++) {
        let elm = document.createElement("p");
        elm.innerHTML = title[i];
        elm.setAttribute("class", "msg");
        cbot.append(elm);
    }

    const isObjectEmpty = (url) => {
        return JSON.stringify(url) === "{}";
    }

    if (isObjectEmpty(url) == true) {
        console.log(("having more options"));
        showOptions(options)
    } else {
        console.log("end result");
        handleOptions(options, url);
    }
}

function handleOptions(options, url) {
    for (let i = 0; i < options.length; i++) {
        let opt = document.createElement("span")
        let inp = '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        cbot.append(opt);
    }
    let opt = document.createElement("span")
    let inp = '<a class="m-link" href="'+url.more+'">'+'See more</a>';

    const isObjectEmpty = (url) => {
        return JSON.stringify(url) === "{}";
    }

    console.log(isObjectEmpty(url));
    console.log(url);
    opt.innerHTML = inp;
    opt.setAttribute("class", "opt link");
    cbot.append(opt);
    handleScroll();
}

function handleScroll() {
    let elm = document.getElementById('chat-box');
    elm.scrollTop = elm.scrollHeight;
}
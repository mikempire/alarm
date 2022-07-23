const timeEl = document.querySelector('.time'),
    selects = document.querySelectorAll('select'),
    btn = document.querySelector('.btn'),
    img = document.querySelector('.wrapper img');

let timeAlarm;
getTime();

btn.addEventListener('click', function () {
    setAlarm();
    if (selects[0].value !== 'Hour' && selects[1].value !== 'Minutes') {
        selects.forEach((el) => {
            el.setAttribute('disabled', 'disabled');
        });
        btn.innerHTML = `Будильник установлен <br> Очистить будильник`;
        btn.addEventListener('click', function () {
            document.location.reload();
        });
    } else {
        img.classList.add('ring');
        selects.forEach((el) => {
            el.classList.add('red');
        });
        setTimeout(function () {
            img.classList.remove('ring');
            selects.forEach((el) => {
                el.classList.remove('red');
            });
        }, 2000)
    }
})

function getTime() {
    let time = new Date();
    let timeNow = time.toLocaleString("ru", {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    timeEl.innerHTML = timeNow;
    if (timeAlarm === timeNow) {
        let audio = document.querySelector('.audio');
        audio.play();
        img.classList.add('ring');
    }
}

function setAlarm() {
    timeAlarm = `${selects[0].value}:${selects[1].value}:00`;
}

for (let i = 23; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selects[0].insertAdjacentHTML('afterbegin', option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selects[1].insertAdjacentHTML('afterbegin', option);
}

setInterval(getTime, 1000);




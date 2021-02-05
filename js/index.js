

let path = window.cdn_path;

var names = {}
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://179523.selcdn.ru/public/delivery-banner/lang.json', false);
xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText ); 
} else {
  names = xhr.responseText;
}
let json = JSON.parse(names);

let mainDocLang = 'cz'; // СЏР·С‹Рє РІС‹РІРѕРґР° С‚РµРєСЃС‚Р° РІ Р±Р°РЅРЅРµСЂРµ

$('.main-banner p').css('display', 'none');
$('body').addClass('body-banner');
if(window.language) {
    addBanner(window.language);
} else {
    addBanner(mainDocLang);
}

function addBanner(wLang) {
    var ban = document.createElement('div'),
        body = document.querySelector('body');
    ban.classList.add('main-banner');
    let bannerList = '', langLength = json.languages.length, count = 0;

    for (let i=0;i<langLength;i++) {
            if(wLang == json.languages[i].lang) {
            bannerList+="<p class='"+json.languages[i].lang+"'><b>"+json.languages[i].lang_text_b+" <span class='delete_mob'>"+json.languages[i].lang_text_del+"</span></b><span class='ban-small'>"+json.languages[i].lang_text+"</span></p>";
            count++;
        }
    }

    if (count == 0) {
        bannerList+="<p class='"+json.languages[4].lang+"'><b>"+json.languages[4].lang_text_b+" <span class='delete_mob'>"+json.languages[4].lang_text_del+"</span></b><span class='ban-small'>"+json.languages[4].lang_text+"</span></p>";
    }

    ban.innerHTML = '<div class="fixed-el" style="width: 1px; height: 1px; opacity: 0; position: fixed; top: 0; left: 0;"></div><img src="https://179523.selcdn.ru/public/delivery-banner/banner-icon-1.png" alt="icon">'+bannerList+'';
    body.appendChild(ban);
}


function addBannerStyle() {
    var cont = document.createElement('style'),
        head = document.querySelector('head');
    cont.innerHTML = '.main-banner img{max-width:61px;max-height:49px;margin:0!important}.main-banner{box-sizing:border-box;position:fixed;top:0;left:0;width:100vw;display:flex;justify-content:center;align-items:center;padding:0;background-color:#e30c0c;background-image:url(https://179523.selcdn.ru/public/delivery-banner/banner-bg.png);background-repeat:no-repeat;background-size:cover;background-position:center;z-index:97;padding:10px}.main-banner.banner-bottom{top:auto;bottom:0}.main-banner p{margin-top:0!important;margin-bottom:0!important;font-family:Roboto,sans-serif;color:#fff!important;margin-left:20px;text-align:center}.main-banner p b{color:#fff;display:block;font-size:19px;font-weight:700;margin-bottom:5px}.main-banner p .ban-small{color:#fff;display:block;font-size:17px;line-height:1.2;font-weight:400}@media screen and (max-width:1219px){.main-banner img{max-width:50px;max-height:40px}.main-banner p{max-width:920px}}@media screen and (max-width:1023px){.main-banner .delete_mob{display:none}.main-banner p{max-width:500px}.main-banner p b{font-size:16px}.main-banner p .ban-small{font-size:15px}}@media screen and (max-width:767px){.main-banner p{max-width:420px}.main-banner p b{font-size:15px}.main-banner p .ban-small{font-size:14px}}@media screen and (max-width:639px){.main-banner img{max-width:35px;max-height:30px}.main-banner p{margin-left:10px}}@media screen and (max-width:479px){.main-banner img{max-width:50px;max-height:100%}.main-banner p{max-width:250px;line-height:1.1}.main-banner p b{line-height:18px;font-size:13px;margin-bottom:2px}.main-banner p .ban-small{line-height:17px;font-size:12px}}@media screen and (max-width:370px){.main-banner img{max-width:35px}}.main-banner p span{color:#fff!important}.main-banner *{box-sizing:border-box}';
    head.appendChild(cont);
}
addBannerStyle();

let counter = 0;

$(document).on('scroll', function () {

    if (($('.fixed-el').offset().top > 100) && counter===0) {
        $('.main-banner').addClass('banner-bottom');
        counter = 1;
    } else if ($('.fixed-el').offset().top <= 100){
        $('.main-banner').removeClass('banner-bottom');
        counter = 0; 
    }  
    
});

function resizeHeight() {
    let mainHeight = $('.main-banner').css('height'),
    mTop = mainHeight + '!important',
    mBottom = mainHeight + '!important';

    $('body.body-banner').attr('style', 'margin-top: ' + mTop + '; margin-bottom: ' + mBottom);
}

$(document).ready(resizeHeight);
window.addEventListener('resize', resizeHeight);




document.addEventListener("DOMContentLoaded", function() {
    
    // Вивід дати (+ час).
    // Arguments: dateFormat (string), language (string), abbreviated (bool). Default: 'dd.mm.yyyy', 'ru', false
    postDate(/*'dateFormat', 'ru', false*/);   

});

function postDate(sa, countryName, isAbbreviated) {
    // Додаємо клас "date-N", де N - кількість "відмотаних" днів.
    // Наприклад, span class="date-0"></span> - мотає 0 днів назад (сьогодні).
    // Наприклад, span class="date-5"></span> - мотає 5 днів назад.

    // Вивід дати (+ години + хвилини), додаємо клас "time". Наприклад, <span class="date-1 time"></span>. 
    // Виводить у форматі на зразок "14.02.2018 14:22"
    // Працює як в порядку зростання, так і в порядку спадання (міняємо флажок нижче)

    var sa = sa || 'dd.mm.yyyy',
        msInDay = 86400000,
        counterLength = 90,  // Максимальна кількість вімотаних днів. Змінюємо за необхідності.
        months, 
        countryName = countryName || 'cz',  // Мова для місяців. 
        isAbbreviated = isAbbreviated || false, // Якщо потрібно скорочений варіант місяців з трьох букв, наприклад "янв", "июн", тоді ставим TRUE.
        localDate = new Date();
                                   
    switch(countryName) {
        case 'it':  // Italy
            months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            break;
        case 'es':  // Spain
            months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            break;
        case 'fr':  // France
            months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            break;
        case 'pt':  // Portugal
            months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'de':  // Germany
            months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            break;
        case 'bg':  // Bulgaria
            months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
            break;
        case 'pl':  // Poland
            months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
            break;
        case 'ro':  // Romania
            months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
            break;
        case 'hu':  // Hungary (Румунія)
            months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
            break;
        case 'gr':  // Greece
        case 'cy':  // Cyprus (Кіпр)
            months = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'];
            break;
        case 'ru':  // Russia
            months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
            break;
    }

    if (isAbbreviated) {
        for (var i = 0; i < months.length; i++) {
            months[i] = months[i].slice(0, 3).toLowerCase();  // Прибираємо ".toLowerCase()", якщо перша буква повинна бути великою.
        }
    }

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date-" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() - counter * msInDay),
            timeCounter = 0,
            timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

        timeArray = timeFormat(timeArray);

        for(var i = 0; i < nodeList.length; i++) {
            var data = nodeList[i].dataset;

            if (data.format) {
                nodeList[i].innerHTML = format(date, data.format);
                // format: особливий формать для окремої дати. Додаємo як data-format="фомарт". 
                /// Формати дивитись в switch нижче. dd - числом, day - прописом.

                // Наприклад, <span class="date-1" data-format="dd month yyyy"></span> 
                // мотає на 1 день назад і виводить цей span у вигляді "14 Лютого 2018".
            } else {
                // Загальний формат виводу дати змінювати ТУТ!
                nodeList[i].innerHTML = format(date, sa); // Default: dd.mm.yyyy 
            }
            if (/\btime\b/.test(nodeList[i].className)) {
                nodeList[i].innerHTML += " " + timeArray[timeCounter]; // Рядок для формату виводу часу.
                timeCounter++;
            } 
        }
    }

    // <span clas="date-N"></span> - мотає час назад на N днів. Наприклад, <span className="date-5"></span>
    // <span clas="dateN"></span> - мотає час вперед на N днів. Наприклад, <span className="date5"></span>

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() + counter * msInDay),
            timeCounter = 0;

        for(var i = 0; i < nodeList.length; i++) {
            var data = nodeList[i].dataset;

            if (data.format) {
                nodeList[i].innerHTML = format(date, data.format);
            } else {
                nodeList[i].innerHTML = format(date/*, "dd month yyyy"*/);
            }
        }
    }



    function time(nodeList, reverse) {
        var timeArray = [], timeStatement = false;

        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].className.match(/\btime\b/)) {
            	if (nodeList[i].className.match(/\bdate-0\b/)) {
            		timeStatement = true;
            	}
                timeArray.push(timeRandom(timeStatement));
            }
        }

        if (reverse) timeArray.sort(function(a, b) { return b - a; });
        else timeArray.sort(function(a, b) { return a - b; });

        return timeArray;
    } 

    function timeRandom(statement) {
    	if (statement) {
    		var date = new Date(),
    			timeLimit = date.getHours() * 60 + date.getMinutes();

    		return Math.round(0 + Math.random() * timeLimit);
    	}
        return Math.round(0 + Math.random() * 1440);
    }

    function timeFormat(timearray) {
        var array = [];

        for (var i = 0; i < timearray.length; i++) {
        var htemp = Math.floor(timearray[i] / 60), mtemp = timearray[i] % 60,
            hours = htemp < 10 ? "0" + htemp : htemp,
            minutes = mtemp < 10 ? "0" + mtemp : mtemp; 
        array.push(hours + ":" + minutes);  
        }
        

        return array;
    }

    function format(date, formatstring) {
        var innerDate = "",
            day = date.getDate(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            fo = formatstring || true;

        switch (fo) {
            case "mm.dd.yyyy": 
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += ".";
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "." + year;
                return innerDate;            

            case "dd month yyyy": 
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += " " + year;
                return innerDate;      

            case "dd month": 
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                return innerDate;

            case "day dd, month yyyy": 
                var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
                innerDate += days[new Date(year, month - 1, day).getDay()];
                innerDate += " ";
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += " " + year;
                return innerDate;

            case "dd/mm/yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "/";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "/" + year;
                return innerDate;

            case "dd-mm-yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "-";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "-" + year;
                return innerDate;

            case "yyyy.mm.dd":
                innerDate += year;
                innerDate += ".";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += ".";
                innerDate += (day < 10) ? ("0" + day) : day;
                return innerDate;

            case "month dd, yyyy":
                innerDate += months[month - 1];
                innerDate += " ";
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += ", ";
                innerDate += year;
                return innerDate;

            case "dd month, yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += ", ";
                innerDate += year;
                return innerDate;
            
            default: 
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += ".";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "." + year;
                return innerDate;
        }
    }
}
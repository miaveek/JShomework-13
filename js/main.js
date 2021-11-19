//Создайте приложение, в котором пользовgovатель будет отправлять запросы по адресу: ‘https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json’ 
//и получать текущий курс гривны по отношению к иностранным валютам. Отфильтруйте полученный список по уровню курса - только те элементы, у которых курс больше 25грн. 
//В случае ошибки – отобразите ее пользователю в теле документа. В случае успеха – отобразите вывод данных в виде таблицы. 

window.onload = () =>{
   
   document.querySelector("#btnGet").addEventListener('click',()=> {
        let url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
        rateLine =  document.querySelector("#output");
        getNBU(url,rateLine);
    });
    getNBU = (url,rateLine)=>{
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);  
        xhr.onreadystatechange = ()=> {
            if (xhr.readyState == 4) { // если получен ответ
                if (xhr.status == 200) { // если код ответа 200
                    let data = JSON.parse(xhr.responseText);
                        data = data.filter(el =>el.rate >25),//отбираем валюту с курсом > 25 грн
                        timeDate = data[1].exchangedate; // Получаем банковскую дату по которой фиксируется курс валют.
                        document.querySelector("#rateDate").innerHTML = "Курс валют по состоянию на :" + timeDate;
                    for(key in data){
                        rateLine.innerHTML += data[key].cc +"&nbsp;&nbsp;" + data[key].rate +"&nbsp;грн&nbsp;&nbsp;&nbsp;"+data[key].txt+ "</br>"; 
                    }
                }
                else if(xhr.status >= 400){ // вывод ошибок
                    rateLine.innerHTML +=`Данные не получены ! Код ошибки ${xhr.status}`;
                }
            }
            
        }
        xhr.send();
       
    }
}



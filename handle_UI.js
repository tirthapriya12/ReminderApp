window.addEventListener('load', function () {

    var UIObj = {
        lilist: document.getElementsByTagName("LI"),
        close: document.getElementsByClassName("close"),
        rem_text: document.getElementById('rem-text'),
        rem_date: document.getElementById('datepicker'),
        rem_time: document.getElementById('rem-time'),
        addBtn: document.getElementById('addBtn'),
        rem_list: new ReminderList(),
        list_index: 0
    };


    UIObj.addBtn.addEventListener('click', inputData);


    updateUI();//updates UI on page load

    (function () {


        var date = new Date();

        if (date.getMinutes() < 10) {

            UIObj.rem_time.value = date.getHours() + ":0" + date.getMinutes();
        }
        else {
            UIObj.rem_time.value = date.getHours() + ":" + date.getMinutes();
        }


    })();

    function inputData()// takes input on button click
    {


        if (UIObj.rem_text.value !== '' && UIObj.rem_date.value !== '' && UIObj.rem_time.value !== '' || UIObj.rem_text.value !== ' ') {
            //Setting the reminder Obj;
            var rem_obj = new Reminder(UIObj.rem_text.value, UIObj.rem_time.value, UIObj.rem_date.value, UIObj.list_index, false);

            createListElm(UIObj.rem_text.value, UIObj.rem_time.value, UIObj.rem_date.value, UIObj.list_index, false);

            console.log(rem_obj);
            addToRemList(rem_obj, UIObj.list_index);

            UIObj.list_index++;
        }

        else {
            alert('please enter all the required fields ');
        }


    }




    function addCloseBtn(x) {

        console.log('called');
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        console.log(UIObj.lilist[x]);
        UIObj.lilist[x].appendChild(span);

        attachCloseBtnIconEvent(x);
    }




    function attachCloseBtnIconEvent(i) {
        UIObj.close[i].onclick = function () {

            var bool = confirm('Are You sure you want to delete this Reminder ?');
            if (bool) {
                var li = this.parentElement;  //UIObj.close[i].parentElement UIObj.lilist[i]
                li.style.display = "none";
                UIObj.rem_list.delRem(li.getAttribute('data-id'));
                //close.splice(i,1);

            }

        }

    }


    function createListElm(rem_text1, rem_time1, rem_date1, index, elapsed1) {






        var ul = document.getElementById("myUL");
        var li = document.createElement('li');
        li.innerHTML = '<span style="font-size:10px;">' + rem_time1 + ' - ' + rem_date1 + '   </span><br/>';
        li.innerHTML += '<p>' + rem_text1 + '</p>';
        li.setAttribute('data-id',index);
        //var li_text=document.createTextNode();

        //li.appendChild(li_text);


        ul.appendChild(li);
        UIObj.lilist[index] = li;

        addCloseBtn(index); //Add close Button to this rem.





        //  console.log(rem_obj);

        



    }



    function addToRemList(rem_obj, i) {



        console.log(rem_obj);
        UIObj.rem_list.addRem(rem_obj, i);  //add reminder to reminderlist array
    }




    function updateUI()//updates UI on relaoad . fetches from DataBase(localstorage)
    {

        var fetchedList = UIObj.rem_list.fetch();
        console.log(fetchedList);

        for(i in fetchedList)
        {
            updateUiList(fetchedList[i].Rem_title,fetchedList[i].Rem_time,fetchedList[i].Rem_date,i,fetchedList[i].id,fetchedList[i].elapsed);
            
        }
        if(fetchedList)
       {
            UIObj.list_index=fetchedList.length;
       } 
        
    }


    function updateUiList(rem_text1, rem_time1, rem_date1,i, index, elapsed1)
{

     var ul = document.getElementById("myUL");
        var li = document.createElement('li');
        li.innerHTML = '<span style="font-size:10px;">' + rem_time1 + ' - ' + rem_date1 + '   </span><br/>';
        li.innerHTML += '<p>' + rem_text1 + '</p>';
        li.setAttribute('data-id',index);
        //var li_text=document.createTextNode();

        //li.appendChild(li_text);


        ul.appendChild(li);
        UIObj.lilist[i] = li;

        addCloseBtn(i); //Add close Button to this rem.






        


}




});


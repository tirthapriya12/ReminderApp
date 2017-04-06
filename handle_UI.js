window.addEventListener('load', function () {

    var UIObj = {
        lilist: document.getElementsByTagName("LI"),
        close: document.getElementsByClassName("close"),
        rem_text: document.getElementById('rem-text'),
        rem_date: document.getElementById('datepicker'),
        rem_time: document.getElementById('rem-time'),
        addBtn: document.getElementById('addBtn'),
        rem_list: new ReminderList(),
        list_index: 0,
        watcher:new Watcher(),
        timelist:[]
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

    reminderChecker();
    function inputData()// takes input on button click
    {


        if (UIObj.rem_text.value !== '' && UIObj.rem_text.value !== ' ' && UIObj.rem_date.value !== '' && UIObj.rem_time.value !== '') {
            //Setting the reminder Obj;

            if(!(checkDuplicateRem( UIObj.rem_date.value, UIObj.rem_time.value )))
           { 

            var rem_obj = new Reminder(UIObj.rem_text.value, UIObj.rem_time.value, UIObj.rem_date.value, UIObj.list_index, false);

            createListElm(UIObj.rem_text.value, UIObj.rem_time.value, UIObj.rem_date.value, UIObj.list_index, false);

            console.log(rem_obj);
            addToRemList(rem_obj, UIObj.list_index);
            fillTimeList();
            UIObj.list_index++;
        }
        else{
                alert('duplicate Reminder exists already');
            }
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
        li.setAttribute('data-id', index);
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

        for (i in fetchedList) {
            updateUiList(fetchedList[i].Rem_title, fetchedList[i].Rem_time, fetchedList[i].Rem_date, i, fetchedList[i].id, fetchedList[i].elapsed);

        }
        if (fetchedList) {
            UIObj.list_index = fetchedList.length;
        }

        fillTimeList();
    }


    function updateUiList(rem_text1, rem_time1, rem_date1, i, index, elapsed1) {

        var ul = document.getElementById("myUL");
        var li = document.createElement('li');
        li.innerHTML = '<span style="font-size:10px;">' + rem_time1 + ' - ' + rem_date1 + '   </span><br/>';
        li.innerHTML += '<p>' + rem_text1 + '</p>';
        li.setAttribute('data-id', index);
        //var li_text=document.createTextNode();

        //li.appendChild(li_text);


        ul.appendChild(li);
        UIObj.lilist[i] = li;

        addCloseBtn(i); //Add close Button to this rem.


    }

    function checkDuplicateRem(date,time)
    {   
        var flag=false;

            for(i in  UIObj.timelist)
            {
                if( UIObj.timelist[i].Rem_time==time &&  UIObj.timelist[i].Rem_date==date)
                {
                    flag=true;
                }
            }

           return flag;     
    }

    function fillTimeList() // fills timelist array on load which will be used to check duplcate reminder
    {
            var fetchedList = UIObj.rem_list.fetch();
            for(i in fetchedList)
            {
                UIObj.timelist[i]={'Rem_time': fetchedList[i].Rem_time , 'Rem_date': fetchedList[i].Rem_date};
            }
            console.log( UIObj.timelist);
    }

    function reminderChecker()
    {

        setInterval(function(){
             var fetchedList = UIObj.rem_list.fetch();

               var index= UIObj.watcher.checkRem( UIObj.timelist);

               if(index>=0)
             {

                var text=document.querySelectorAll('.w3-container p');
                
               document.getElementById('rem-modal').style.display='block';
               document.querySelector('.w3-display-topright').onclick=modalHandle;
               document.getElementsByTagName('audio')[0].play();
               
               text[0].innerHTML=fetchedList[index].Rem_title;
               text[1].innerHTML=fetchedList[index].Rem_time;
               text[2].innerHTML=fetchedList[index].Rem_date;

               notifyMe(text[0]);

             }  
               
              

        },6000);
         

    }

    
    function modalHandle()
    {
       
        document.getElementById('rem-modal').style.display='none';
        document.getElementsByTagName('audio')[0].pause();

        

    }



    function notifyMe(text) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Reminder! "+' '+text);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Reminder!  "+' '+text);
         
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

 

});


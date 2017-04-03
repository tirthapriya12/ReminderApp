window.addEventListener('load', function () {

    var UIObj = {
        lilist: document.getElementsByTagName("LI"),
        close: document.getElementsByClassName("close"),
        rem_text: document.getElementById('rem-text'),
        rem_date: document.getElementById('datepicker'),
        rem_time: document.getElementById('rem-time'),
        addBtn: document.getElementById('addBtn'),
        rem_list:new ReminderList(),
        list_index: 0
    };


    UIObj.addBtn.addEventListener('click', CreateListElm);


    updateUI();

    (function(){

        
      var date=new Date();

      if(date.getMinutes()<10)
     {

          UIObj.rem_time.value=date.getHours()+":0"+date.getMinutes();
     }
     else{
            UIObj.rem_time.value=date.getHours()+":"+date.getMinutes();
     } 


    })();


    function addCloseBtn(x) {

        console.log('called');
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        console.log(UIObj.lilist[x]);
        UIObj.lilist[x].appendChild(span);

        attachCloseBtnIcon(x);
    }




    function attachCloseBtnIcon(i) {
        UIObj.close[i].onclick = function () {
            var li = this.parentElement;  //UIObj.close[i].parentElement UIObj.lilist[i]
            li.style.display = "none";
        }

    }


    function CreateListElm() {


        if (UIObj.rem_text.value !== '' && UIObj.rem_date.value !== '' && UIObj.rem_time.value !== '') {

            //Setting the reminder Obj;
            var rem_obj = new Reminder(UIObj.rem_text.value, UIObj.rem_time.value, UIObj.rem_date.value, UIObj.list_index, false);

            var ul = document.getElementById("myUL");
            var li = document.createElement('li');
            li.innerHTML = '<span style="font-size:10px;">' + UIObj.rem_time.value + ' - ' + UIObj.rem_date.value + '   </span><br/>';
            li.innerHTML += '<p>' + UIObj.rem_text.value + '</p>';
            //var li_text=document.createTextNode();

            //li.appendChild(li_text);


            ul.appendChild(li);
            UIObj.lilist[UIObj.list_index] = li;

            addCloseBtn(UIObj.list_index); //Add close Button to this rem.




            
            console.log(rem_obj);
            addToRemList(rem_obj,UIObj.list_index);
            UIObj.list_index++;

        }
        else {
            alert('please enter all the required fields ');
        }

    }



    function addToRemList(rem_obj,i)
    {

        
        
        console.log(rem_obj);
        UIObj.rem_list.addRem(rem_obj,i);  //add reminder to reminderlist array
    }




    function updateUI()//updates UI on relaoad . fetches from DataBase(localstorage)
    {

            

    }

});
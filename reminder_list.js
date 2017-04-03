function ReminderList()
{
    var remArrList=[];
    var db_manager=new DBManager();
     this.addRem=function(obj,i){

            console.log('i='+i);
            console.log(obj);
            debugger;
            remArrList.push(obj);
            console.log( remArrList);
            console.log(remArrList[i]+"    "+i);
            db_manager.insertData(remArrList[i],i);


    };

    this.delRem=function(){



    };
    
    this.fetch=function(){



    };


}
function ReminderList()
{
    var remArrList=[];
    var db_manager=new DBManager();
     this.addRem=function(obj,i){

            console.log('i='+i);
            console.log(obj);
            
            remArrList[i]=obj;//push(obj);
            console.log( remArrList);
            console.log(remArrList[i]+"    "+i);
            db_manager.insertData(remArrList[i],i);


    };

    this.delRem=function(index){

        db_manager.remData(index);


    };
    
    this.fetch=function(){

      var remArrListfetch=db_manager.fetchData();
        
         console.log(remArrListfetch);
        return remArrListfetch;
       

    };


}
function DBManager() {

    this.insertData = function (obj, i) {
        var storage_obj = [],
         remlist = [], 
         remlist_fetch = [];

        if (localStorage) {

            console.log(obj + ' ' + i + ' remlist[' + i + ']');
            if (localStorage.getItem('remlist')) {

                remlist = JSON.parse(localStorage.getItem('remlist'));
                
                remlist.push(obj);
                console.log(remlist);
                

                localStorage.setItem('remlist', JSON.stringify(remlist));

            }
            else {


                storage_obj.push(obj);
                
                localStorage.setItem('remlist', JSON.stringify(storage_obj));

            }

        }


    };

    this.remData = function (key) {
        remlist_fetch = [];//re initialise for this scope
        remlist_fetch = JSON.parse(localStorage.getItem('remlist'));
        for (i in remlist_fetch) {
            if (remlist_fetch[i].id == key) {
                console.log(key);
                console.log(remlist_fetch[i]);
                if (remlist_fetch.length == 1) {
                    remlist_fetch.pop();
                }
                else {
                    remlist_fetch.splice(i, 1);
                }


            }


        }

        localStorage.setItem('remlist', JSON.stringify(remlist_fetch));

    };

    this.fetchData = function () {

        if (localStorage.getItem('remlist')) {
            remlist_fetch = JSON.parse(localStorage.getItem('remlist'));

            return remlist_fetch;

        }
       
    };


}
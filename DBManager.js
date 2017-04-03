function DBManager() {

    this.insertData = function (obj, i) {
        var storage_obj = [];
        var remlist = [],remlist1=[];

        if (localStorage) {

            console.log(obj + ' ' + i + ' remlist[' + i + ']');
            if (localStorage.getItem('remlist')) {
                debugger;
                remlist = JSON.parse(localStorage.getItem('remlist'));
                console.log(remlist);
                remlist.push(obj);
                 console.log(remlist);
               // storage_obj = JSON.stringify(remlist);

                localStorage.setItem('remlist', JSON.stringify(remlist));

            }
            else {


                storage_obj.push(obj);
               // console.log(storage_obj);
               // console.log(JSON.stringify(storage_obj))
                localStorage.setItem('remlist', JSON.stringify(storage_obj));

            }

        }


    };

    this.remData = function () {


    };

    this.fetchData = function () {

        // for (i in obj)
    };


}
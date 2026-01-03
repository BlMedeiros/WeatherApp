search = {
        city_name: name
}

function addHistory(name) {

    search.setItem(name)
    
    localStorage.setItem("search",JSON.stringify(search))

}

function getHistory() {
    let getSearchHistory = localStorage.getItem("search")

    let searchObject = JSON.parse(getSearchHistory)
}


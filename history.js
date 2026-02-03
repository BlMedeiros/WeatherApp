    function addHistory(name) {

        let searchHistory = JSON.parse(localStorage.getItem("search") || "[]");

        searchHistory = searchHistory.filter(item => item !== name);

        searchHistory.unshift(name)
        
        if(searchHistory.length > 5) {
            searchHistory = searchHistory.slice(0, 5);
        }

        localStorage.setItem("search",JSON.stringify(searchHistory))

    }

    function getHistory() {
        return JSON.parse(localStorage.getItem("search") || "[]");
    }


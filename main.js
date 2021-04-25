async function sendApiRequest() {
    let api_key = 'UIs9QfJgegWToKSrlAr3FjUvL3QjgDhjplaYDBJO'
    let url = 'https://api.nasa.gov/planetary/apod?api_key=' + api_key;
    let date = document.getElementById('date').value.toString()
    let count = document.getElementById('count').value.toString()
    let thumbs = document.getElementsByName('thumbs')[0].checked

let flag
let endUrl
if (count != 0) {
    flag = 'count'
    endUrl = url + '&hd=true&thumbs=' + thumbs + '&concept_tags=true&count=' + count
} else {
    flag = 'date'
    endUrl = url + '&hd=true&thumbs=' + thumbs + '&concept_tags=true&date=' + date
}
let response = await fetch(endUrl)
console.log(response)
let data = await response.json()
console.log(data)
useApiData(data, flag)
}

async function useApiData(data, flag) {
    let checkMain = document.getElementsByClassName('Main')
    if(checkMain[0]!=null){
        document.body.removeChild(checkMain[0]);
    }
     let mainDiv = document.createElement('div');
     mainDiv.className = "Main";
     document.body.appendChild(mainDiv);
    if (flag == 'date') {
        if (data.media_type == 'image' || data.media_type == 'gif') {
            let url = data.url
            let div = document.createElement('div');
            div.className = "Pictures";
            div.innerHTML = data.explanation
            var x = document.createElement("IMG");
            x.className = 'Pics';
            x.setAttribute("src", url);
            x.setAttribute("width", "480");
            x.setAttribute("height", "240");
            x.setAttribute("alt", "NASA IMG");
            mainDiv.appendChild(x);
            mainDiv.appendChild(div);

        } else {
            let url = data.url
            let div = document.createElement('div');
            div.className = "Pictures";
            div.innerHTML = data.explanation
            var x = document.createElement("iframe");
            x.className = 'Pics';
            x.setAttribute("src", url);
            x.setAttribute("frameborder", '0');
            x.setAttribute("width", "480");
            x.setAttribute("height", "240");
            mainDiv.appendChild(x);
            mainDiv.appendChild(div);
        }
    } else {
        data.forEach(function (item, i, data) {
            if (data[i].media_type == 'image' || data[i].media_type == 'gif') {
                let url = data[i].url
                let div = document.createElement('div');
                div.className = "Pictures";
                div.innerHTML = data[i].explanation
                var x = document.createElement("IMG");
                x.className = 'Pics';
                x.setAttribute("src", url);
                x.setAttribute("width", "480");
                x.setAttribute("height", "240");
                x.setAttribute("alt", "NASA IMG");
                mainDiv.appendChild(x);
                mainDiv.appendChild(div);
                mainDiv.appendChild(document.createElement("br"));
                mainDiv.appendChild(document.createElement("hr"));

            } else {
                let url = data[i].url
                let div = document.createElement('div');
                div.className = "Pictures";
                div.innerHTML = data[i].explanation
                var x = document.createElement("iframe");
                x.className = 'Pics';
                x.setAttribute("src", url);
                x.setAttribute("frameborder", '0');
                x.setAttribute("width", "480");
                x.setAttribute("height", "240");
                mainDiv.appendChild(x);
                mainDiv.appendChild(div);
            }

        })



    }
}

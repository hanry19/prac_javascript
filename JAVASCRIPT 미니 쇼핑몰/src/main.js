
// json으로 받아올거임
function loadItems() {      // 함수
    
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);

}

// loadItems() 는 data.json으로 부터 items를 json형식으로 받아 온다. 
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
    

}

// 하나의 문자열로 병합하는 것은 join => li태그 전체를 하나의 문자로 본다.

function createHTMLString (item){

    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumnail">
        <span class="item__description">${item.gender}, ${item.size}</span>

    </li>`;

}

function onButtonClick(event , items){

    const dataset= event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    console.log('dataset',dataset );
    console.log('key',key );
    console.log('value',value );


    if(key==null || value == null) {
        return;
    }

    // 배열에서 특정한 데이터만 추출해서 작은 데이터를 만드는것 = filter
    const filtered = items.filter(item => item[key] === value)
    console.log('items', items);
    console.log("filtered : ",filtered);
    console.log('value : ', value);
    displayItems(filtered);
}


function setEventListeners(items){
    // 이벤트 리스너를 하나하나 등록하는것보다 그걸 담고잇는 그릇에 이벤트를 준다
    // 이걸 이벤트 위임이라고 한다.
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event,items));
}



// main
loadItems()  //실행문
.then(items => {
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);
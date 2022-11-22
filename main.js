var themeColors = Array.from(document.querySelectorAll('[name = "theme"]'));
const storeTheme = function(theme) {
    localStorage.setItem('theme',theme);
}

const applyTheme = function() {
    const activeTheme = localStorage.getItem('theme');
    document.getElementById(activeTheme).checked = true;
}
themeColors.forEach((themeOption) => {
    themeOption.addEventListener('click',() => {
        storeTheme(themeOption.id);
    })  
})
document.onload = applyTheme();

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    var text = document.getElementById('item').value;
    var arr = JSON.parse(localStorage.getItem('itemList'));
    if(!arr) {
        arr = new Array();
        arr.push([text,Date.now()]);
    }
    else arr.push([text,Date.now()]);
    localStorage.setItem('itemList',JSON.stringify(arr));
    location.reload();
})

function loadItemList() {
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    document.getElementById('items').innerHTML = ``;
    itemList.forEach((newTaskContent) => {
        var newItem = document.createElement('li');
        newItem.textContent = newTaskContent[0];
        newItem.classList.add("list-group-item");
        var btn = document.createElement('button');
        btn.textContent = "X";
        btn.className = "btn btn-danger btn-sm float-right delete delete-btn";
        btn.id = newTaskContent[1];
        newItem.appendChild(btn);
        document.getElementById('items').appendChild(newItem);
    })
}
document.onload = loadItemList()

document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click',() => {
        let itemList = JSON.parse(localStorage.getItem('itemList'));
        for(let i = 0; i < itemList.length; i++) {
            if(itemList[i][1] == btn.id) {
                itemList.splice(i,1);
                break;
            }
        }
        localStorage.setItem('itemList',JSON.stringify(itemList));
        location.reload();
    })
})

var filter = document.getElementById('filter')
filter.addEventListener('keyup',() => {
    if(JSON.parse(localStorage.getItem('itemList')) == 0) {
        alert("NO TASKS TO SEARCH");
    }
    else {
        input = document.getElementById('filter');
        filter = input.value.toUpperCase();
        var li = document.getElementsByTagName('li');
        for (i = 0; i < li.length; i++) {
            txtValue = li[i].textContent || li[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
            } else {
              li[i].style.display = "none";
            }
          }
    }
})
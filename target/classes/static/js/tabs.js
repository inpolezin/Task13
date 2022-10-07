
let tabTable = document.getElementById('tab_table')
let tabTableInner = document.getElementById('tab_table_inner')
let tabNew = document.getElementById('tab_new')
let tabNewInner = document.getElementById('tab_new_inner')

let newForm = document.getElementById('new_form')


tabTableInner.style.display = 'block'


tabTable.addEventListener('mousedown', function () {
    activateTabTable()
})

tabNew.addEventListener('mousedown', function () {
    activateTabNew()
})

function activateTabTable() {
    tabTable.classList.add('active')
    tabNew.classList.remove('active')
    tabTableInner.style.display = 'block'
    tabNewInner.style.display = 'none'

    while (newForm.firstChild) {
        newForm.removeChild(newForm.firstChild);
    }
}

function activateTabNew() {
    tabNew.classList.add('active')
    tabTable.classList.remove('active')
    tabNewInner.style.display = 'block'
    tabTableInner.style.display = 'none'

    insertFormNewUser(newForm)
}


function insertFormNewUser (editForm) {
    let hFirstname = document.createElement('h5')
    hFirstname.classList.add('form_header')
    hFirstname.innerHTML = 'First name'
    let hLastname = document.createElement('h5')
    hLastname.classList.add('form_header')
    hLastname.innerHTML = 'Last name'
    let hAge = document.createElement('h5')
    hAge.classList.add('form_header')
    hAge.innerHTML = 'Age'
    let hEmail = document.createElement('h5')
    hEmail.classList.add('form_header')
    hEmail.innerHTML = 'Email'

    let hRoles = document.createElement('h5')
    hRoles.classList.add('form_header')
    hRoles.innerHTML = 'Roles'

    let hPassword = document.createElement('h5')
    hPassword.classList.add('form_header')
    hPassword.innerHTML = 'Password'

    let inputFirstname = document.createElement('input')
    inputFirstname.classList.add('form-control', 'w-25', 'mx-auto')
    let inputLastname = document.createElement('input')
    inputLastname.classList.add('form-control', 'w-25', 'mx-auto')
    let inputAge = document.createElement('input')
    inputAge.classList.add('form-control', 'w-25', 'mx-auto')
    let inputEmail = document.createElement('input')
    inputEmail.classList.add('form-control', 'w-25', 'mx-auto')
    let inputPassword = document.createElement('input')
    inputPassword.classList.add('form-control', 'w-25', 'mx-auto')
    let selectRoles = document.createElement('select')
    selectRoles.classList.add('form-control', 'w-25', 'mx-auto')
    selectRoles.multiple = true
    selectRoles.size = 2
    let button = document.createElement('button')
    button.classList.add('btn', 'btn-success')
    button.innerHTML = 'Add new user'

    button.onclick = function () {
        event.preventDefault()
        fetch('http://localhost:8080/admins/save', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName": inputFirstname.value,
                "lastName": inputLastname.value,
                "age": inputAge.value,
                "email": inputEmail.value,
                "password": inputPassword.value,
                "roleIds": getSelectValues(selectRoles)
            })
        })
            .then(function () {
                while (tableUsers.firstChild) {
                    tableUsers.removeChild(tableUsers.firstChild);
                }

                fetch('/admins/getAllUsers')
                    .then(response => response.json())
                    .then(data => {

                        data.forEach(element => {
                            insertTable(element)
                        })
                    })
                activateTabTable()
            })
    }

    editForm.appendChild(hFirstname)
    editForm.appendChild(inputFirstname)
    editForm.appendChild(hLastname)
    editForm.appendChild(inputLastname)
    editForm.appendChild(hAge)
    editForm.appendChild(inputAge)
    editForm.appendChild(hEmail)
    editForm.appendChild(inputEmail)
    editForm.appendChild(hPassword)
    editForm.appendChild(inputPassword)
    editForm.appendChild(hRoles)
    editForm.appendChild(selectRoles)
    editForm.appendChild(button)

    fetch('/admins/getAllRoles')
        .then(response => response.json())
        .then(dataRoles => {
            dataRoles.forEach(role => {
                let opt = document.createElement('option')
                opt.value = role['id']
                opt.innerHTML = role['name'].split('_')[1]
                selectRoles.appendChild(opt)
            })
        })
}

function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}
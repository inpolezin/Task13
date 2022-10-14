
let tableUsers = document.getElementById('table_users')
let tableUsers1 = document.getElementById('table_users1')

let dark = document.getElementById('dark')
let edit = document.getElementById('edit')
let editForm = document.getElementById('edit_form')

let sel = document.getElementById('sel')
let hEdit = document.getElementById('hEdit')

let cross = document.getElementById('cross')

fetch('/rest/getAllUsers')
    .then(response => response.json())
    .then(data => {

        data.forEach(element => {
            insertTable(element)
        })
    })

cross.onclick = function () {
    while (editForm.firstChild) {
        editForm.removeChild(editForm.firstChild);
    }
    closeEdit()
}

sel.addEventListener('mousedown', function () {

    while (tableUsers.firstChild) {
        tableUsers.removeChild(tableUsers.firstChild);
    }

    while (tableUsers1.firstChild) {
        tableUsers1.removeChild(tableUsers1.firstChild);
    }


    fetch('/rest/getAllUsers')
        .then(response => response.json())
        .then(data => {

            data.forEach(element => {
                insertTable(element)
            })
        })

    fetch('/rest/getLogUser')
        .then(response => response.json())
        .then(data => {

            insertUserInfo(data)
        })
})

function insertTable (element) {
    let tr = document.createElement('tr')

    let tdId = document.createElement('td')
    tdId.classList.add('border-0')
    tdId.style.fontWeight = '700'
    tdId.innerHTML = element['id']
    tr.appendChild(tdId)

    let tdFirstname = document.createElement('td')
    tdFirstname.classList.add('border-0')
    tdFirstname.innerHTML = element['username']
    tr.appendChild(tdFirstname)


    let tdLastname = document.createElement('td')
    tdLastname.classList.add('border-0')
    tdLastname.innerHTML = element['lastName']
    tr.appendChild(tdLastname)


    let tdAge = document.createElement('td')
    tdAge.classList.add('border-0')
    tdAge.innerHTML = element['age']
    tr.appendChild(tdAge)


    let tdEmail = document.createElement('td')
    tdEmail.classList.add('border-0')
    tdEmail.innerHTML = element['email']
    tr.appendChild(tdEmail)


    let tdRoles = document.createElement('td')
    let roles = element['roles']
    let stringRoles = ''
    tdRoles.classList.add('border-0')
    for (let i = 0; i < roles.length; i++) {
        stringRoles += roles[i]['name'].split('_')[1] + ' '
    }
    tdRoles.innerHTML = stringRoles
    tr.appendChild(tdRoles)

    let tdEdit = document.createElement('td')
    let btnEdit = document.createElement('button')
    btnEdit.classList.add('btn', 'btn-primary')
    btnEdit.innerHTML = 'Edit'
    btnEdit.id = 'edit' + element['id']


    btnEdit.onclick = function () {
        hEdit.innerHTML = 'Edit user'
        openEdit()
        insertForm(btnEdit, element['id'])
    }



    tdEdit.classList.add('border-0')
    tdEdit.appendChild(btnEdit)
    tr.appendChild(tdEdit)

    let tdDelete = document.createElement('td')
    let btnDelete = document.createElement('button')
    btnDelete.classList.add('btn', 'btn-danger')
    btnDelete.innerHTML = 'Delete'
    btnDelete.id = 'delete' + element['id']

    btnDelete.onclick = function () {
        hEdit.innerHTML = 'Delete user'
        openEdit()
        insertForm(btnDelete, element['id'])
    }

    tdDelete.classList.add('border-0')
    tdDelete.appendChild(btnDelete)
    tr.appendChild(tdDelete)

    tableUsers.appendChild(tr)
}

function insertUserInfo (element) {
    let tr = document.createElement('tr')

    let tdId = document.createElement('td')
    tdId.classList.add('border-0')
    tdId.style.fontWeight = '700'
    tdId.innerHTML = element['id']
    tr.appendChild(tdId)

    let tdFirstname = document.createElement('td')
    tdFirstname.classList.add('border-0')
    tdFirstname.innerHTML = element['username']
    tr.appendChild(tdFirstname)


    let tdLastname = document.createElement('td')
    tdLastname.classList.add('border-0')
    tdLastname.innerHTML = element['lastName']
    tr.appendChild(tdLastname)


    let tdAge = document.createElement('td')
    tdAge.classList.add('border-0')
    tdAge.innerHTML = element['age']
    tr.appendChild(tdAge)


    let tdEmail = document.createElement('td')
    tdEmail.classList.add('border-0')
    tdEmail.innerHTML = element['email']
    tr.appendChild(tdEmail)


    let tdRoles = document.createElement('td')
    let roles = element['roles']
    let stringRoles = ''
    tdRoles.classList.add('border-0')
    for (let i = 0; i < roles.length; i++) {
        stringRoles += roles[i]['name'].split('_')[1] + ' '
    }
    tdRoles.innerHTML = stringRoles
    tr.appendChild(tdRoles)

    tableUsers1.appendChild(tr)
}

function openEdit () {
    dark.style.display = 'block'
    edit.style.display = 'block'
}

function closeEdit () {
    dark.style.display = 'none'
    edit.style.display = 'none'
}

function insertForm (btn, id) {
    let hId = document.createElement('h5')
    hId.classList.add('form_header')
    hId.innerHTML = 'ID'
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

    let inputId = document.createElement('input')
    inputId.classList.add('form-control', 'w-50', 'mx-auto')
    let inputFirstname = document.createElement('input')
    inputFirstname.classList.add('form-control', 'w-50', 'mx-auto')
    let inputLastname = document.createElement('input')
    inputLastname.classList.add('form-control', 'w-50', 'mx-auto')
    let inputAge = document.createElement('input')
    inputAge.classList.add('form-control', 'w-50', 'mx-auto')
    let inputEmail = document.createElement('input')
    inputEmail.classList.add('form-control', 'w-50', 'mx-auto')
    let selectRoles = document.createElement('select')
    selectRoles.classList.add('form-control', 'w-50', 'mx-auto')
    selectRoles.multiple = true
    selectRoles.size = 2

    let divButtons = document.createElement('div')
    divButtons.classList.add('buttons', 'border-top' ,'py-3')

    let buttonExit = document.createElement('button')
    buttonExit.classList.add('btn', 'btn-secondary', 'btn-edit')
    buttonExit.innerHTML = 'Close'

    buttonExit.onclick = function () {
        while (editForm.firstChild) {
            editForm.removeChild(editForm.firstChild);
        }
        closeEdit()
    }

    let buttonConfirm = document.createElement('button')
    let inputPassword = document.createElement('input')

    fetch('/rest/getUser/' + id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            inputId.value = data['id']
            inputId.innerHTML = data['id']
            inputFirstname.value = data['firstName']
            inputFirstname.innerHTML = data['firstName']
            inputLastname.value = data['lastName']
            inputLastname.innerHTML = data['lastName']
            inputAge.value = data['age']
            inputAge.innerHTML = data['age']
            inputEmail.value = data['email']
            inputEmail.innerHTML = data['email']

            editForm.appendChild(hId)
            editForm.appendChild(inputId)
            editForm.appendChild(hFirstname)
            editForm.appendChild(inputFirstname)
            editForm.appendChild(hLastname)
            editForm.appendChild(inputLastname)
            editForm.appendChild(hAge)
            editForm.appendChild(inputAge)
            editForm.appendChild(hEmail)
            editForm.appendChild(inputEmail)
            if (btn.innerHTML === 'Edit') {
                let hPassword = document.createElement('h5')
                hPassword.classList.add('form_header')
                hPassword.innerHTML = 'Password'

                inputPassword.classList.add('form-control', 'w-50', 'mx-auto')

                buttonConfirm.classList.add('btn', 'btn-primary', 'btn-edit')
                buttonConfirm.innerHTML = 'Edit'

                editForm.appendChild(hPassword)
                editForm.appendChild(inputPassword)
            } else {
                buttonConfirm.classList.add('btn', 'btn-danger', 'btn-edit')
                buttonConfirm.innerHTML = 'Delete'

            }
            editForm.appendChild(hRoles)
            editForm.appendChild(selectRoles)
            divButtons.appendChild(buttonExit)
            divButtons.appendChild(buttonConfirm)
            editForm.appendChild(divButtons)

            fetch('/rest/getAllRoles')
                .then(response => response.json())
                .then(dataRoles => {
                    dataRoles.forEach(role => {
                        let opt = document.createElement('option')
                        opt.value = role['id']
                        opt.innerHTML = role['name'].split('_')[1]
                        selectRoles.appendChild(opt)
                        for (let i = 0; i < data['roles'].length; i++) {
                            if(data['roles'][i]['id'] === role['id']) {
                                opt.selected = true
                            }
                        }
                    })
                })
        })

    buttonConfirm.onclick = function () {
        event.preventDefault()
        if (buttonConfirm.innerHTML === 'Edit') {

            fetch('http://localhost:8080/rest/update', {

                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": inputId.value,
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

                    fetch('/rest/getAllUsers')
                        .then(response => response.json())
                        .then(data => {

                            data.forEach(element => {
                                insertTable(element)
                            })
                        })
                    while (editForm.firstChild) {
                        editForm.removeChild(editForm.firstChild);
                    }
                    closeEdit()
                })
        } else {
            fetch('http://localhost:8080/rest/' + inputId.value, {
                method: 'DELETE',
            })
                .then(function () {
                    while (tableUsers.firstChild) {
                        tableUsers.removeChild(tableUsers.firstChild);
                    }

                    fetch('/rest/getAllUsers')
                        .then(response => response.json())
                        .then(data => {

                            data.forEach(element => {
                                insertTable(element)
                            })
                        })
                    while (editForm.firstChild) {
                        editForm.removeChild(editForm.firstChild);
                    }
                    closeEdit()
                })

        }
    }
}



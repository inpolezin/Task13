
let infoEmail = document.getElementById("header_email")
let infoRoles = document.getElementById("header_roles")

fetch('/rest/getLogUser')
    .then(response => response.json())
    .then(data => {

        infoEmail.innerHTML = data["email"]
        let roles = data["roles"]
        let stringRoles = ''
        for (let i = 0; i < roles.length; i++) {
            stringRoles += roles[i]['name'].split('_')[1] + ' '
        }
        infoRoles.innerHTML = stringRoles
    })




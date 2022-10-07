
let selectAdmin = document.getElementById("select_admin")
let selectUser = document.getElementById("select_user")

let panelAdmin = document.getElementById("panel_admin")
let panelUser = document.getElementById("panel_user")

activateAdminPanel()

selectAdmin.addEventListener('mousedown', function () {
    activateAdminPanel()
})

selectUser.addEventListener('mousedown', function () {
    activateUserPanel()
})








function activateAdminPanel() {
    panelUser.style.display = 'none'
    selectUser.classList.remove('active')
    panelAdmin.style.display = 'block'
    selectAdmin.classList.add('active')
}

function activateUserPanel() {
    panelAdmin.style.display = 'none'
    selectAdmin.classList.remove('active')
    panelUser.style.display = 'block'
    selectUser.classList.add('active')
}
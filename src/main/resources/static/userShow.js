let url = ('http://localhost:8080/user/')

fetch(url)
    .then(response => response.json())
    .then(data => showUser(data))
    .catch(error => console.log(error));

function showUser(data) {
    let body =`<div class="m-4">
        <table class="table table-hover table-striped" style="background-color: white;">
            <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Roles</th>
            </thead>
            <tbody>`
    let roles = data.roles
    let stringRoles = ''
    for(let i = 0; i < roles.length; i++) {
        stringRoles += roles[i].name.substring(5) + " "
    }
    body += `<tr>
                <td>${data.id}</td>
                <td>${data.username}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${stringRoles}</td>
            </tr>`
    body += `</tbody></table></div>`
    document.getElementById('show').innerHTML = body;
}
let url = 'http://localhost:8080/admin/users'

fetch(url)
    .then(response => response.json())
    .then(data => fillingAll(data))
    .catch(error => console.log(error))
function fillingAll(data) {
    let body = `
    <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="/admin" th:method="get" style="color:black">User table</a>
    </li>

    <li class="nav-item">
        <a onclick="fillingAddForm()" class="nav-link" style="color:blue">New user</a>
    </li>
    </ul>   
    <div class="tab-content">
        <div class="tab-pane fade show active" id="user-table">
            <div class="table-container border rounded mb-2 " style="background-color: white;"> 
                <div id="home" class="tab-pane active bg-white ml-0 mr-0 p-0 border">
                    <div class="table-caption">
                        <h2>All users</h2>
                    </div>
                    <div class="m-4">
                        <table class="my-table table table-hover table-striped" style="background-color: white;">
                            <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            </thead>
                            <tbody>`

    for(let i = 0; i < data.length; i++) {
        let roles = data[i].roles
        let stringRoles = ''
        for (let y = 0; y < roles.length; y++) {
            stringRoles += roles[y].name.substring(5) + " "
        }
        let currentId = data[i].id
        body += `<tr id="tr№${currentId}"">
                    <td id="id:${currentId}">${currentId}</td>                    
                    <td id="username:${currentId}">${data[i].username}</td>                     
                    <td id="age:${currentId}">${data[i].age}</td>                   
                    <td id="evail:${currentId}">${data[i].email}</td>
                    <td id="roles:${currentId}">${stringRoles}</td>
                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#editModal"  onclick="editUserForm(${currentId})">edit</button></td>
                    <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onclick="deleteUserModal(${currentId})">delete</button></td>
                    </tr>`
    }
    body += `</tbody></table></div></div><div style="background-color: #f8f9fa; height: 40vh;"></div></div></div></div>`
    document.getElementById('hi').innerHTML = body;
}
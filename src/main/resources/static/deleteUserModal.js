function deleteUserModal(id) {

    let url = 'http://localhost:8080/admin/users/' + id
    fetch(url)
        .then(response => response.json())
        .then(data => deletingData(data))
        .catch(error => console.log(error))

    function deletingData(data) {
        let userRoles = []
        data.roles.forEach((id)=>{
            userRoles.push(id.id);
        })

        let body = `
        <form id="deleteUserModal">
          <div class="form-group">
            <label for="id" class="d-flex justify-content-center font-weight-bold">ID</label>
            <input type="text" id="id" value="${data.id}" class="form-control" readonly>
          </div>
          <div class="form-group">
            <label for="username1" class="d-flex justify-content-center font-weight-bold">firstName</label>
            <input type="text" id="username1" class="form-control" placeholder="Enter name" value="${data.username}" readonly>
          </div>
          <div class="form-group">
            <label for="age1" class="d-flex justify-content-center font-weight-bold">age</label>
            <input type="text" class="form-control" id="age1" placeholder="Enter age" value="${data.age}" readonly>
          </div>
          <div class="form-group">
            <label for="email1" class="d-flex justify-content-center font-weight-bold">Email</label>
            <input type="email" class="form-control" id="email1" placeholder="Enter email" value="${data.email}" readonly>
          </div>
          <div class="form-group">
            <label for="password1" class="d-flex justify-content-center font-weight-bold">Password</label>
            <input type="password" class="form-control" id="password1" value="${data.password}" readonly>
          </div>
          <div class="form-group text-center col-3">
            <label for="roles1" style="font-weight: bold">Role</label>
            <select multiple class="form-control p-0 m-0" id="roles" name="roles4change" disabled>
               <option value="1" ${userRoles.includes(1) ? 'selected' : ''}>USER</option>
               <option value="2" ${userRoles.includes(2) ? 'selected' : ''}>ADMIN</option>
             </select>
          </div>
        </form>`
        document.getElementById('deleting').innerHTML = body;
    }
}


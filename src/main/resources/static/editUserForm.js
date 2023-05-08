function editUserForm(id) {

    console.log('Tub edit user №' + id + ' push!');
    let url = 'http://localhost:8080/admin/users/' + id;
    let body = ''
    fetch(url)
        .then(response => response.json())
        .then(data => changingData(data))
        .catch(error => console.log(error))
    const changingData = (data) => {
        console.log(data)

        let rolesID =[]
        data.roles.forEach((id)=>{
            rolesID.push(id.id);
        })

        body += `
        <form id="addUserForm" class="needs-validation">
             <input id='id' type="hidden" value="${data.id}">
           <div class="form-group">
             <label for="username" class="d-flex justify-content-center font-weight-bold">User name</label>
             <input class="form-control mt-0" type="text" id="username" value="${data.username}"/>
           </div>       
           <div class="form-group">
             <label for="age" style="font-weight: bold" >Age</label>
             <input class="form-control mt-0" type="number" id="age" value="${data.age}"/>
           </div>
           <div class="form-group">
             <label for="email" style="font-weight: bold">Email</label>
             <input class="form-control mt-0" type="email" id="email" value="${data.email}"/>
           </div>
           <div class="form-group">
             <label for="password" style="font-weight: bold">Password</label>        
             <input class="form-control w-100 mt-0" type="number" value="${data.password}" id="pass" name="pass"/>       
           </div>
           <div class="form-group">
             <label for="roles" style="font-weight: bold">Role</label>
             <select multiple class="form-control p-0 m-0" id="roles" name="roles4change">
               <option value="1" ${rolesID.includes(1) ? 'selected' : ''}>USER</option>
               <option value="2" ${rolesID.includes(2) ? 'selected' : ''}>ADMIN</option>
             </select>
           </div>
        </form>`
        document.getElementById('edit').innerHTML = body;
    }
}
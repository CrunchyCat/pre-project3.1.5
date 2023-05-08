function fillingAddForm() {
    document.getElementById("hi").innerHTML= `
        <ui class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" onclick="redirectingToStart()" style="color:blue">User table</a>
        </li>
        <li class="nav-item">
        <a class="nav-link active" style="color:black">New user</a>
        </li>
        </ui>
    
        <div class="table-caption">
        <h2>Add new user</h2>
        </div>
    <div class="table-container border rounded mb-2 " style="background-color: white;">
        <br/>
        <br/>
        <br/>
        <form id="addUserForm" class="needs-validation">
            <div class="d-flex flex-column align-items-center">
                <div class="form-group text-center col-3 ">
                    <label for="username" style="font-weight: bold">User name</label>
                    <input type="text" name="username" class="form-control" id="username" placeholder="Enter name" required/>
                </div>

                <div class="form-group text-center col-3 ">
                    <label for="age" style="font-weight: bold" >Age</label>
                    <input type="text" name="age" class="form-control" id="age" placeholder="Enter age" required/>
                </div>

                <div class="form-group text-center col-3 ">
                    <label for="email" style="font-weight: bold">Email</label>
                    <input type="email" name="email" class="form-control" id="email" placeholder="Enter email" required/>
                </div>

                <div class="form-group text-center col-3">
                    <label for="password" style="font-weight: bold">Password</label>
                    <input type="password" name="password" class="form-control" id="password" placeholder="Enter password" required/>
                </div>

                <div class="form-group text-center col-3">
                    <label for="roles" style="font-weight: bold">Role</label>
                    <select multiple class="form-control p-0 m-0" id="roles" name="roles">
                        <option value="2">ADMIN</option>
                        <option value="1">USER</option>
                    </select>
                </div>
                <button onclick="adding(event)" type="submit" class="btn btn-success btn-lg" id="saveBtn" disabled>Add new user</button>
                <div style="background-color: #f8f9fa; height: 10vh;"></div>
            </div>
        </form>
    </div>`;

    const saveBtn = document.getElementById("saveBtn");
    const requiredFields = document.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        field.addEventListener('input', () => {
            const allFieldsFilled = Array.from(requiredFields).every(field => field.value !== '');
            saveBtn.disabled = !allFieldsFilled;
        });
    });
}
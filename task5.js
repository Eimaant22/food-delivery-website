



showLoginScreen();

function showLoginScreen() {
    hideAllScreens();
    document.getElementById('login-screen').classList.add('active');
}

function showSignUpScreen() {
    hideAllScreens();
    document.getElementById('signup-screen').classList.add('active');
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
}

function showAdminViewScreen() {
    hideAllScreens();
    document.getElementById('admin-view-screen').classList.add('active');
}

function restrauntViewScreen() {
    hideAllScreens();
    document.getElementById('restraunt-view-screen').classList.add('active');
    displayDishes(); // Ensure dishes are displayed when navigating to this screen
}

function customerViewScreen() {
    hideAllScreens();
    document.getElementById('customer-view-screen').classList.add('active');
}

function getUsersFromStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function login() {
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;
    const users = getUsersFromStorage();
    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        alert("Logged in successfully");
        if (user.role === "admin") {
            showAdminViewScreen();
        } else if (user.role === "customer") {
            customerViewScreen();
        } else if (user.role === "restraunt") {
            restrauntViewScreen();
        }
    } else {
        alert("Invalid username or password");
    }
}

function signUp() {
    const signUpUsername = document.getElementById("signup-username").value;
    const signUpPassword = document.getElementById("signup-password").value;
    const signUpRole = document.getElementById("signup-role").value;
    const users = getUsersFromStorage();
    const pendingUsers = getPendingUsersFromStorage();

    const adminExists = users.some(user => user.role === "admin");

    if (signUpRole === "admin" && adminExists) {
        alert("Admin account already exists");
        return;
    }

    if (signUpUsername && signUpPassword) {
        pendingUsers.push({ username: signUpUsername, password: signUpPassword, role: signUpRole });
        localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));
        showLoginScreen();
    }
}

function getPendingUsersFromStorage() {
    const pendingUsers = localStorage.getItem('pendingUsers');
    return pendingUsers ? JSON.parse(pendingUsers) : [];
}

function displayPendingUsers() {
    const pendingUsers = getPendingUsersFromStorage();
    const pendingUsersList = document.getElementById("pending-users-list");
    pendingUsersList.innerHTML = '';

    pendingUsers.forEach(user => {
        const pendingUserLi = document.createElement("li");
        pendingUserLi.innerHTML = `Username: ${user.username}<br>Role: ${user.role}`;

        const acceptBtn = document.createElement("button");
        acceptBtn.innerHTML = "Accept";
        acceptBtn.onclick = () => acceptUser(user.username);

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "Remove";
        removeBtn.onclick = () => removePendingUser(user.username);
        pendingUserLi.appendChild(acceptBtn);
        pendingUserLi.appendChild(removeBtn);

        pendingUsersList.appendChild(pendingUserLi);
    });
}

function acceptUser(username) {
    let pendingUsers = getPendingUsersFromStorage();
    let users = getUsersFromStorage();

    const user = pendingUsers.find(user => user.username === username);
    if (user) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        pendingUsers = pendingUsers.filter(user => user.username !== username);
        localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));

        displayPendingUsers();
    }
}

function removePendingUser(username) {
    let pendingUsers = getPendingUsersFromStorage();

    pendingUsers = pendingUsers.filter(user => user.username !== username);
    localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));

    displayPendingUsers();
}

function manageUsers() {
    const userManagement = document.getElementById('user-management');
    userManagement.classList.toggle('hidden');
    displayPendingUsers();
}

function addUserToUserList(user) {
    const usersList = document.getElementById("users-list");
    const li = document.createElement("li");
    li.innerHTML = `Username: ${user.username}<br>Role: ${user.role}`;
    usersList.appendChild(li);
}

function usersList() {
    const userdiv = document.querySelector("#user-list-div").classList.toggle('hidden');
}

function showAddDishScreen() {
    hideAllScreens();
    document.getElementById('add-dish-screen').classList.add('active');
}

function addDish() {
    const dishName = document.getElementById('dish-name').value;
    const dishPrice = document.getElementById('dish-price').value;

    if (dishName && dishPrice) {
        let dishes = getDishesFromStorage();
        dishes.push({ name: dishName, price: dishPrice });
        localStorage.setItem('dishes', JSON.stringify(dishes));
        document.getElementById('dish-name').value = '';
        document.getElementById('dish-price').value = '';
        restrauntViewScreen();
        // viewRestrauntDishes(); // Refresh the dish list
    }
}

function getDishesFromStorage() {
    const dishes = localStorage.getItem('dishes');
    return dishes ? JSON.parse(dishes) : [];
}

function displayDishes() {
    const dishes = getDishesFromStorage();
    const dishListUl = document.getElementById('dish-list');
    dishListUl.innerHTML = '';

    dishes.forEach((dish, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            Name: ${dish.name}<br>
            Price: $${dish.price}<br>
            <button onclick="removeDish(${index})">Remove</button>
        `;
        dishListUl.appendChild(li);
    });
}

// function viewRestrauntDishes() {
//     hideAllScreens();
//     document.getElementById('restraunt-view-screen').classList.add('active');
//     displayDishes();
// }
function viewRestrauntDishes(){
    const dishListDiv =document.getElementById('restraunt-view-screen');
    dishListDiv.classList.toggle('hidden');
   displayDishes();; // 5. Function to display books on the page
}
// // 5. Function to display books on the page
// function displayDishes() {
//     const dishes = getDishesFromStorage(); // 14. Function to retrieve books from localStorage
//     const dishListUl = document.querySelector("#dish-list-restraunt");
//     dishListUl.innerHTML = '';

//     dishes.forEach((dish, index) => {
//         const li = document.createElement('li');
//         li.innerHTML = `
//             Name: ${dish.name}<br>
//             Price: ${dish.price}<br>
//              <button onclick="removeBook(${index})">Remove</button> : ''}
//         `;
//        dishListUl.appendChild(li);
//     });
// }


function removeDish(index) {
    let dishes = getDishesFromStorage();
    dishes.splice(index, 1);
    localStorage.setItem('dishes', JSON.stringify(dishes));
    viewRestrauntDishes(); // Refresh the dish list after removal
}
// function removeBook(index) {
//     let books = getBooksFromStorage(); // 14. Function to retrieve books from localStorage
//     books.splice(index, 1);
//     localStorage.setItem('books', JSON.stringify(books));
//     displayBooks('admin'); // 5. Function to display books on the page
// }

import * as constants from './const.js'
import { login, auth } from './login.js';

constants.submitBtn.addEventListener('click', () => {
    login();
});

constants.btnLogout.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.reload();
    constants.loginSection.style.display = "block";
    constants.userPage.style.display = "none";
});

const userLog = localStorage.getItem('user');

if (userLog) {
    const user = JSON.parse(userLog);
    auth(user.username, user.password);
}

console.log('Hello World');
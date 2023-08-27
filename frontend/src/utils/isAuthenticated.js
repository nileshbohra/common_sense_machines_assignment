export const isAuthenticated = () => {
    if (localStorage.getItem('isAuthenticated')) {
        return true;
    } else {
        return false;
    }
}
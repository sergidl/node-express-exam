export default function user(data) {

    let _user = {}
    _user.username = data.username;
    _user.password = data.password;
    _user.timestamp = new Date;

    return _user;
}
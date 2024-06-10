const user = { id: 1, name: 'hong', addr: { city:'Seoul' } };

user.addr.city = 'pusan';

const cpUser = { ...user };
cpUser.addr = { ...user.addr };

const cpUser2 = JSON.parse(JSON.stringify(user));

console.log('cpUser', cpUser);
console.log('cpUser2', cpUser2);


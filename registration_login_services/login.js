const fetch = require('node-fetch');
const { encode } = require('base-64');
const { serialize } = require('cookie');

const realmKey = '5c179f4a-a1b9-4945-a0fb-2c3fc9534d17';

async function login(username, password, res) {
  try {
    const userApiKey = encode(`${realmKey}:${username}:${password}`);

    const apiUrlGetIdentity = 'https://api.orangepill.cloud/v1/users?populate=identity';

    const fetchOptionsGetIdentity = {
      method: 'GET',
      headers: {
        'x-api-key': userApiKey,
      },
    };

    console.log("UserApiKey: ", userApiKey);
    
    const responseGetIdentity = await fetch(apiUrlGetIdentity, fetchOptionsGetIdentity);

    if (responseGetIdentity.ok) {

      

      return {
        userApiKey: userApiKey,
        success: true,
      };

    } else {
      console.error(`Error de red: ${responseGetIdentity.status}`);
    }
  } catch (error) {
    console.error('Error en la solicitud FETCH:', error.message);
    throw new Error('Error en la solicitud FETCH:', error);
  }
}

module.exports = { login };

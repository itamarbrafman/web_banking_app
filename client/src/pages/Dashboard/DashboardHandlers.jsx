export function getAuthToken() {
  return localStorage.getItem('token');
}

export async function fetchAccountInfo(token) {
  try {
    const response = await fetch('http://localhost:3000/api/authenticate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Authentication failed:', data.error);
      throw new Error('Authentication failed');
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function makeTransaction(token, receiverEmail, amount) {
  try {
    const response = await fetch('http://localhost:3000/api/make-transaction', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ receiverEmail, amount })
    });

    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
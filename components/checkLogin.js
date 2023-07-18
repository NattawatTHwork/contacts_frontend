export const checkLogin = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(process.env.API_URL + '/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const result = await response.json();
      if (result.status === 'success') {
        // alert('authen success')
      } else {
        // alert('authen failed');
        localStorage.removeItem('token');
        window.location = '/login';
      }
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
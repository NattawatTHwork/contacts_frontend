import { useState } from 'react';
import Swal from 'sweetalert2';
import { checkLogin } from '../components/checkLogin';

const create = () => {
  useEffect(() => {
    checkLogin();
  }, []);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.API_URL + '/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Clear form data
        setFormData({
          firstname: '',
          lastname: '',
          phone: ''
        });

        // Display success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Form submitted successfully'
        });
      } else {
        // Handle form submission error
        console.error('Form submission error');
      }
    } catch (error) {
      console.error('Form submission error', error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default create
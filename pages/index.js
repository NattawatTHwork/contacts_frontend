import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { checkLogin } from '../components/checkLogin';

const Index = () => {
  useEffect(() => {
    checkLogin();
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(process.env.API_URL + '/read', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const result = await response.json();
      
      if (result.status == 'success') {
        setData(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    router.push({
      pathname: '/update',
      query: { id: id },
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');

          const response = await fetch(`${process.env.API_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          });

          const jsonData = await response.json();

          if (jsonData.status == 'success') {
            console.log('Data deleted successfully.');
            setData((prevData) => prevData.filter((item) => item.user_id !== id));
            Swal.fire('Deleted!', 'The data has been deleted.', 'success');
          } else {
            console.log('Failed to delete data.');
            Swal.fire('Error!', 'Failed to delete the data.', 'error');
          }
        } catch (error) {
          console.log(error);
          Swal.fire('Error!', 'An error occurred.', 'error');
        }
      }
    });
  };



  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.user_id} className="border-t border-gray-200 text-center">
              <td className="py-2 px-4">{item.firstname} {item.lastname}</td>
              <td className="py-2 px-4">{item.phone}</td>
              <td className="py-2 px-4 space-x-2">
                <Button variant="contained" className="text-white bg-blue-500 hover:bg-blue-600" onClick={() => handleEdit(item.user_id)}>
                  Edit
                </Button>
                <Button variant="contained" color="error" className="text-white bg-red-500 hover:bg-red-600" onClick={() => handleDelete(item.user_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Index;

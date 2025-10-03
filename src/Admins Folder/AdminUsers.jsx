 import React, { useEffect, useState} from 'react'

function Users() {
    
       let [holdUsers, setHoldUsers] = useState([]);
        let [loading, setLoading] = useState([false]);
       
         useEffect(() => {
           const fetchUsers = async () => {
             setLoading(true);
             try {
               const response = await fetch('http://localhost:3001/user');
               const data = await response.json();
               setHoldUsers(data);
             } catch (error) {
               console.error('Error fetching users:', error);
             } finally {
               setLoading(false);
             }
           };
           fetchUsers();
         }, []);
    
            // response();

            const handleDelete = async (userId) => {
                try {
                    const response = await fetch(`http://localhost:3001/user/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    });
                    const data = await response.json();
                    console.log('User deleted:', data); 
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            };
            
  return (
    <div>
      <table className=' border-collapse border border-gray-300 w-full'>
        <thead className='bg-gray-100'>
          <tr className='border-b border-gray-200'>
            <th className=' p-2 text-left'>Fullname</th>
            <th className=' p-2 text-left'>Email</th>
            <th className=' p-2 text-left'>Role</th>
            <th className=' p-2 text-left'>Delete</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {loading ? (
            <tr>
              <td colSpan="4" className='p-4 text-center'>Loading...</td>
            </tr>
          ) : (
            holdUsers.map((user,) => (
              <tr key={user.index}>
                <td className='p-2'>{user.fullname}</td>
                <td className='p-2'>{user.email}</td>
                <td className='p-2'>{user.role}</td>
                <td className='p-2'>
                    <button onClick={()=>handleDelete(user._id)} className=' bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                        🗑️
                    </button>
                </td>
              </tr>
            ))
          )}

        </tbody>
      </table>
      <div className=' flex  justify-end mt-4'>
        <button onClick={() =>handleDelete(user._id)} className=' bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600'>
            Delete
        </button>
      </div>
    </div>
  );
}

export default Users
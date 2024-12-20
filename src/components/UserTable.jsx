import React from 'react';

const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-[80%] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-blue-900 px-4 py-2">Username</th>
            <th className="border border-blue-900 px-4 py-2">Total Kudos</th>
          </tr>
        </thead>
        <tbody className=''>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-blue-900 px-4 py-2">{user.username}</td>
              <td className="border border-blue-900 px-4 py-2">{user.totalKudos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

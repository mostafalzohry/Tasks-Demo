import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/Tasks/authcontext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from './icons/LogoutIcon';
import clsx from 'clsx';

const Heading = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        localStorage.clear();
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className='py-3 text-center text-4xl font-bold text-gray-900'>
        <span className='bg-gradient-to-r from-blue-400 to-emerald-600 bg-clip-text text-transparent'>
          Tasks
        </span>
        &nbsp;
        <span>App</span>
      </h1>

      <div className='flex justify-between items-center py-3 text-center text-4xl font-bold text-gray-900'>
        <span> Welcome, {user.currentUser?.displayName} </span>
        <button
          onClick={handleLogout}
          type='button'
          className={clsx(
            'flex h-12 w-24 flex-col items-center justify-center rounded-lg bg-red-600',
            'hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300',
          )}
        >
          <div className='mb-1'>
            <LogoutIcon />
          </div>
          <span className='text-sm text-white'>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Heading;

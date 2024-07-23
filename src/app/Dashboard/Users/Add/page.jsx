import { addUser } from '@/lib/action';
import React from 'react';
import Imagecomp from '@/components/DashboardComp/ImageCom/Imagecomp';

function AddPage() {
 

  return (
    <div className='bg-[#182237] p-5 rounded-lg mt-5'>
      <form action={addUser} className='form flex flex-col gap-y-3 justify-between'>
        <div className='flex justify-between'>
          <input className='w-[45%]' type='text' name='username' placeholder='username' />
          <input className='w-[45%]' type='email' name='email' placeholder='example@gmail.com' />
        </div>
        <div className='flex justify-between'>
          <input className='w-[45%]' name='password' type='password' placeholder='password' />
          <select className='w-[45%]' name='isAdmin'>
            <option value={true} selected>isAdmin ?</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <textarea name='comment' placeholder='Comment...' rows="11"></textarea>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AddPage;

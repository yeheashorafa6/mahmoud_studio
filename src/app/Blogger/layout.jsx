import React from 'react'



export const metadata = {

  title: 'All Blogger',
  description: 'مرحبًا بكم في مدونتي! هنا أشارككم أفكاري ورؤيتي حول عالم التصميم الجرافيكي. ستجدون مقالات حول أحدث الاتجاهات في التصميم، نصائح وإرشادات، ودروس ملهمة لتحسين مهاراتكم. تابعوا مدونتي للحصول على رؤى قيمة ومحتوى غني يساعدكم على تطوير إبداعاتكم'

};

function layout({children}) {
  return (
    <div>
        <main className='flex-1'>
         {children}      
        </main>
    </div>
  )
}

export default layout

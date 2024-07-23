import React from 'react';
import { fetchAudio} from '@/lib/data'; // تأكد من تحديث المسارات وفقاً لمشروعك
import EditPage from './EditPage/EditPage';

async function EditAudioPage({ params }) {
    const { id } = params;
    const initialData = await fetchAudio(id);
  
    const AudioData = JSON.parse(JSON.stringify(initialData));
    if (!initialData) {
      return <div>Error in page</div>;
    }
  return (
    <div>
        <EditPage id={id} audioData={AudioData}/>
    </div>
  )
}

export default EditAudioPage;

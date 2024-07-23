import { fetchBlogger } from '@/lib/data';
import EditBlogPost from './EditPage/EditPage';

async function SingleBloggerPage({params}) {

  const { id } = params;
  const initData = await fetchBlogger(id);
  const blogger = JSON.parse(JSON.stringify(initData));

  if (!blogger) {
    return <div>error in page</div>;
  }

  return (
    <EditBlogPost id={id} post={blogger} />
  )
}

export default SingleBloggerPage

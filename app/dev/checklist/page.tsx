import ProjectChecklist from '@/components/ProjectChecklist';
import Link from 'next/link';

export default function CheckList() {
  return (
    <>
      <div>
        <ProjectChecklist />

        <Link href='/'>Home</Link>
      </div>
    </>
  )
}
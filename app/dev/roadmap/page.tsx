import ProjectRoadmap from '@/components/ProjectRoadmap';
import Link from 'next/link';

export default function RoadMap() {
  return (
    <>
    <div>
      <ProjectRoadmap />

      <Link href='/'>Home</Link>

    </div>
    </>
  )
}
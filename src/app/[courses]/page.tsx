import Button from '@/components/button'
import Hero from '@/components/hero'
import Lists from '@/components/lists'
import { getAllCourses, getOneCourse } from '@/services/courses'

export async function generateStaticParams() {
  const courses = await getAllCourses()
  return courses.map((course) => ({ course: course.slug }))
}

interface CourseDetailsPageProps {
  params: {
    courses: string
  }
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const course = await getOneCourse(params.courses)

  if (!course) {
    return <p className="text-center mt-10">Course not found</p>
  }

  return (
    <>
      <Hero title={['Course', 'Directory']} description={course.title} />

      <main className="max-w-4xl mx-auto p-6">
        <article>
          <p className="text-lg text-gray-700 mb-4">
            {course.shortDescription}
          </p>

          {/* Course Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span>{course.category}</span>
            <span>{course.publishDate}</span>
            <span>{course.duration}</span>
          </div>
        </article>

        {/* Course Features */}
        <section>
          <Lists title="Course Features" items={course.features} />
        </section>

        {/* Enroll Button */}
        <footer className="mt-10">
          <Button>Enroll Now!</Button>
        </footer>
      </main>
    </>
  )
}

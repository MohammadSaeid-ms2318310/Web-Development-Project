import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CourseRepo {
    async getAllCourses() {
        const courses = await prisma.course.findMany();
        return courses;
    }

    async getAllCoursesWithInstructorNames() {
        return await prisma.course.findMany({
            include: {
                instructor: true
            }
        });
    }

    async findCourseInstructorByCourseId(id) {
        const instructor = await prisma.course.findUnique({
            where: { id },
            select: {
                instructor: true
            }
        });

        return instructor;
    }

    async findCoursesStudentsByCourseId(id) {
        const students = await prisma.course.findMany({
            where: { id },
            select: {
                students: true
            }
        });
        return students;
    }

    async findCoursesPrerequisitesByCourseId(id) {
        const prerequisites = await prisma.course.findMany({
            where: { id }, 
            select: {
                prerequisites: true
            }
        });
        return prerequisites;
    }

    

    async findCourseById(id) {
        const course = await prisma.course.findUnique({
            where:{ id }
        });
        return course;
    }

    async filterCoursesByCategory(category) {
        const course = await prisma.course.findMany({
            where: { category }
        });
        return course;
    }

    async filterCoursesByTitle(title) {
        const courses = await prisma.course.findMany({
            where: { title }
        });
        return courses;
    }

    async studentCoursesById(studentId) {
        const courses = await prisma.course.findMany({
            where: {
                students: {
                    some: {
                        id: studentId
                    }
                }
            }
        });
        return courses;
    }

    async getTopFiveRegisteredCourses() {
        const courses = await prisma.course.findMany({
            orderBy: {
              students: {
                _count: 'desc',
              },
            },
            take: 5,
            select: {
              title: true,
              _count: { select: { students: true } },
            },
          });

          return courses;
    }

    async numberOfCoursesTaughtPerFaculty() {
        const courses = await prisma.course.groupBy({
            by: ['facultyId'],
            _count: { facultyId: true },
          });
        return courses;
    }

    async commonPrerequisites() {
        const courses = await prisma.course.groupBy({
            by: ['prerequisiteId'],
            _count: { prerequisiteId: true },
          });
          return courses;
    }

    async getGradesById(studentId) {
        console.log("Fetching grades for studentId:", studentId);
        const grades = await prisma.grade.findMany({
            where: { studentId },
            include: {
                course: {
                    select: {
                        title: true
                    }
                }
            }
        });
        return grades;
    }

    async getStudentNumbersPerFaculty(facultyId) {
        const courses = await prisma.course.findMany({
          where: { instructorId: facultyId },
          include: {
            _count: {
              select: {
                students: true,
              },
            },
          },
        });
        return courses;
      }

      async createNewCourse(course) {
        const curs = await prisma.course.create({
            data: course
        });
        return curs;
      }

      async updateTheCourse(id, course) {
        const curs = await prisma.course.update({
            where: { id },
            data: course
        });
        return curs;
      }

      async deleteTheCourseById(id) {
        const curs = await prisma.course.delete({
            where: { id }
        });
        return curs;
      }
}

export default new CourseRepo();
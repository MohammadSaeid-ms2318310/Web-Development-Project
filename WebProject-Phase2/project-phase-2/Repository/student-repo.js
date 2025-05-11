import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StudentRepo {

    async findStudentById(id) {
        const course = await prisma.student.findUnique({
            where: { id },
            include: {
                grades: true,
                passedCourses: true
            }
        });
        return course;
    }

    async findStudentByEmail(email) {
        const student = await prisma.student.findUnique({
          where: { email },
        });
        return student;
      }

    async getStudentGradesById(id) {
        const grades = await prisma.student.findMany({
            where: { id },
            select: {
                grades: true
            }
        });
        return grades;
    }

    async getTotalNumberOfStudentsPerMajor() {
        const totals = await prisma.student.groupBy({
            by: ['major'],
            _count: { major: true }
        });
        return totals;
    }

    async getAvgGPAofStudentsPerMajor() {
        const avgs = await prisma.student.groupBy({
            by: ['major'],
            _avg: { gpa: true },
          });
          return avgs;
    }

    async getTopTenGPAStudents(){
        const topTen = await prisma.student.findMany({
            orderBy: { gpa: 'desc' },
            take: 10,
        });
        return topTen;
    }

    async getStudentById(id) {
        const student = await prisma.student.findUnique({
            where: { id }
        });
        return student;
    }

}

//PRISMA CODE

// // 1. Total number of students per major
// await prisma.student.groupBy({
//     by: ['major'],
//     _count: { major: true },
//   });
  
//   // 2. Average GPA per major
//   await prisma.student.groupBy({
//     by: ['major'],
//     _avg: { gpa: true },
//   });
  
//   // 3. Number of students per course
//   await prisma.course.findMany({
//     select: {
//       title: true,
//       _count: {
//         select: { students: true },
//       },
//     },
//   });
  
//   // 4. Students with the highest GPA
//   await prisma.student.findMany({
//     orderBy: { gpa: 'desc' },
//     take: 5,
//   });
  
//   // 5. Top 3 most enrolled courses
//   await prisma.course.findMany({
//     orderBy: {
//       students: {
//         _count: 'desc',
//       },
//     },
//     take: 3,
//     select: {
//       title: true,
//       _count: { select: { students: true } },
//     },
//   });
  
//   // 6. Failure rate per course (assuming a separate Grade model)
//   await prisma.grade.groupBy({
//     by: ['courseId'],
//     _count: {
//       _all: true,
//     },
//     where: {
//       score: {
//         lt: 60,
//       },
//     },
//   });
  
//   // 7. Courses by category
//   await prisma.course.groupBy({
//     by: ['category'],
//     _count: { category: true },
//   });
  
//   // 8. Course status overview
//   await prisma.course.groupBy({
//     by: ['courseStatus'],
//     _count: { courseStatus: true },
//   });
  
//   // 9. Number of courses taught per faculty
//   await prisma.course.groupBy({
//     by: ['facultyId'],
//     _count: { facultyId: true },
//   });
  
//   // 10. Average student performance per instructor
//   await prisma.grade.groupBy({
//     by: ['courseId'],
//     _avg: { score: true },
//   });
  
//   // 11. Registered vs non-registered courses
//   await prisma.course.groupBy({
//     by: ['registrationStatus'],
//     _count: { registrationStatus: true },
//   });
  
//   // 12. Student registration growth over time
//   await prisma.student.groupBy({
//     by: ['createdAt'], // or use a custom transformation if needed
//     _count: { _all: true },
//   });
  
//   // 13. Top 5 students in a specific course (courseId required)
//   await prisma.grade.findMany({
//     where: { courseId: 'COURSE_ID' },
//     orderBy: { score: 'desc' },
//     take: 5,
//     include: { student: true },
//   });
  
//   // 14. Most failed course (highest number of failing grades)
//   await prisma.grade.groupBy({
//     by: ['courseId'],
//     where: { score: { lt: 60 } },
//     _count: { _all: true },
//     orderBy: { _count: { _all: 'desc' } },
//     take: 1,
//   });
  
//   // 15. Most common prerequisites
//   await prisma.course.groupBy({
//     by: ['prerequisiteId'],
//     _count: { prerequisiteId: true },
//   });
  

export default new StudentRepo();
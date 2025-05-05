import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CourseRepo {
    async getAllCourses() {
        const courses = await prisma.course.findMany();
        return courses;
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
}

export default new CourseRepo();
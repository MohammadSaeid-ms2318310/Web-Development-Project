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
}

export default new StudentRepo();
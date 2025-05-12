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

    async getAllStudentsInfo() {
        return await prisma.student.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                gpa: true,
                major: true
            }
        });
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

    async createStudent(student) {
        const newStudent = await prisma.student.create({
            data: student
        });
        return newStudent;
    }

    async deleteStudentById(id) {
        const deleted = await prisma.student.delete({
            where: { id }
        });
        return deleted;
    }

    async updateStudent(id, student) {
        const newStudent = await prisma.student.update({
            where: { id },
            data: student
        });
        return newStudent;
    }
}

export default new StudentRepo();
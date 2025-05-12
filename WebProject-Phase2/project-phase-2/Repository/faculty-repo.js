import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class FacultyRepo {
    async findFacultyById(id) {
        const faculty = prisma.faculty.findUnique({
            where: { id }
        });
        return faculty;
    }

    async findFacultyByEmail(email) {
        const faculty = await prisma.faculty.findUnique({
            where: { email }
        });
        return faculty;
    }

    async createFaculty(faculty) {
        return await prisma.faculty.create({
            data: faculty
        });
    }

    async updateFaculty(id, faculty) {
        return await prisma.faculty.update({
            where: { id },
            data: faculty
        });
    }

    async deleteFacultyById(id) {
        return await prisma.faculty.delete({
            where: { id }
        });
    }

    async getAllFacultiesInfo() {
        return await prisma.faculty.findMany({
            select:{
                id: true,
                name: true,
                email: true,
                specialization: true,
            }
        });
    }

    async getFacultySpecializationsCount() {
        return await prisma.faculty.groupBy({
          by: ['specialization'],
          _count: {
            id: true,
          },
        });
      }
}

export default new FacultyRepo();


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
}

export default new FacultyRepo();


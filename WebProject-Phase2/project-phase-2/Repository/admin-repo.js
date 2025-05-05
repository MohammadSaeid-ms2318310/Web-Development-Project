import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AminRepo {
    async findAdminById(id) {
        const admin = prisma.admin.findUnique({
            where: { id }
        });
        return admin;
    }

    async findAdminByEmail(email) {
        const admin = await prisma.admin.findUnique({
            where: { email }
        });
        return admin;
    }
}

export default new AminRepo();
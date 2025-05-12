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

    async createAdmin(admin) {
        return await prisma.admin.create({
            data: admin
        });
    }

    async updateAdmin(id, admin) {
        return await prisma.admin.update({
            where: { id },
            data: admin
        });
    }

    async deleteAdminById(id) {
        return await prisma.admin.delete({
            where: { id }
        });
    }
}

export default new AminRepo();
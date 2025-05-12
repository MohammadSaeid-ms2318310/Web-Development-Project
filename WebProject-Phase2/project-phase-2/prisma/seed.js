// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, 'exported-data.json');
  const rawData = fs.readFileSync(dataPath);
  const { students, faculty, admins, courses, grades } = JSON.parse(rawData);

  // First insert admins, faculty, and students
  for (const admin of admins) {
    await prisma.admin.create({ data: admin });
  }

  for (const fac of faculty) {
    await prisma.faculty.create({ data: fac });
  }

  for (const student of students) {
    await prisma.student.create({ data: student });
  }

  // Then insert courses (must reference existing faculty & students)
  for (const course of courses) {
    const { students, prerequisites, grades, ...courseData } = course;

    await prisma.course.create({
      data: {
        ...courseData,
        // You can connect related entities later if needed
      },
    });
  }

  // Finally insert grades
  for (const grade of grades) {
    await prisma.grade.create({ data: grade });
  }

  console.log('✅ Database seeded from exported-data.json');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

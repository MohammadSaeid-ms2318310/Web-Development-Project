// export-data.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const students = await prisma.student.findMany({
    include: { passedCourses: true, grades: true },
  });

  const faculty = await prisma.faculty.findMany({
    include: { courses: true },
  });

  const admins = await prisma.admin.findMany();

  const courses = await prisma.course.findMany({
    include: { students: true, prerequisites: true, grades: true },
  });

  const grades = await prisma.grade.findMany();

  const allData = {
    students,
    faculty,
    admins,
    courses,
    grades,
  };

  fs.writeFileSync('exported-data.json', JSON.stringify(allData, null, 2));
  console.log('✅ Data exported to prisma/exported-data.json');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

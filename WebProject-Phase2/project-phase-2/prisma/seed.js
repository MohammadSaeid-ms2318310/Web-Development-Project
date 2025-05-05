const { PrismaClient, UserType, CourseStatus } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Create Admins
  const admins = [];
  for (let i = 0; i < 5; i++) {
    admins.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'admin123',
      userType: 'Admin'
    });
  }
  await prisma.admin.createMany({ data: admins });

  // Create Faculties
  const facultyList = [];
  for (let i = 0; i < 7; i++) {
    facultyList.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'faculty123',
      userType: 'Faculty',
      specialization: faker.person.jobType()
    });
  }
  await prisma.faculty.createMany({ data: facultyList });

  const faculties = await prisma.faculty.findMany();

  // Create Students
  const studentList = [];
  for (let i = 0; i < 200; i++) {
    studentList.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'student123',
      userType: 'Student',
      gpa: parseFloat((Math.random() * 4).toFixed(2)),
      major: faker.word.words(2)
    });
  }
  await prisma.student.createMany({ data: studentList });

  const students = await prisma.student.findMany();

  // Create Courses
  const courseList = [];
  for (let i = 0; i < 50; i++) {
    const faculty = faculties[Math.floor(Math.random() * faculties.length)];
    courseList.push({
      title: faker.lorem.words(3),
      location: `Room ${faker.number.int({ min: 100, max: 400 })}`,
      category: faker.helpers.arrayElement(['Math', 'Science', 'Computer', 'Engineering']),
      registrationStatus: faker.datatype.boolean(),
      courseStatus: faker.helpers.arrayElement(['offering', 'finished']),
      instructorId: faculty.id
    });
  }

  await prisma.course.createMany({ data: courseList });
  const courses = await prisma.course.findMany();

  // Assign students to courses
  for (const course of courses) {
    const enrolledStudents = faker.helpers.shuffle(students).slice(0, 10);
    for (const student of enrolledStudents) {
      await prisma.student.update({
        where: { id: student.id },
        data: {
          passedCourses: {
            connect: { id: course.id }
          }
        }
      });

      await prisma.course.update({
        where: { id: course.id },
        data: {
          students: {
            connect: { id: student.id }
          }
        }
      });

      // Add grade
      await prisma.grade.create({
        data: {
          title: `${course.title} Final Exam`,
          grade: parseFloat((Math.random() * 100).toFixed(2)),
          studentId: student.id,
          courseId: course.id
        }
      });
    }
  }

  console.log('🌱 Seeding completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

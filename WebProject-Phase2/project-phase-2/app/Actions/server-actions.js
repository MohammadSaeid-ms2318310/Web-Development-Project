'use server';
import courseRepo from "@/Repository/course-repo";
import studentRepo from "@/Repository/student-repo";
import adminRepo from "@/Repository/admin-repo";
import facultyRepo from "@/Repository/faculty-repo";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function signJwt(user, expiresIn = "1d") {
    // expiresIn is a string like "1h", "10h", "7d"
    const secretKey = process.env.JWT_SECRET_KEY;
    const idToken = jwt.sign(user, secretKey, { expiresIn });
    return idToken;
}

export async function verifyJwt(idToken) {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const user = jwt.verify(idToken, secretKey);
        return user;
    } catch(error) {
        console.log(error);
        return null;
    }
}


export async function getAverageGradePerCourse() {
    return await courseRepo.getAverageGradePerCourse();
}

export async function filterCoursesByInstructorId(instructorId) {
    return await courseRepo.filterCoursesByInstructorId(instructorId);
}


export async function filterCoursesByStudentId(studentId) {
    return await courseRepo.filterCoursesByStudentId(studentId);
}


export async function getCourseStatusCount() {
    return await courseRepo.getCourseStatusCount();
}

export async function getStudentsByInstructorId(instructorId) {
    return await studentRepo.getStudentsByInstructorId(instructorId);
}

export async function getAllCoursesWithInstructorNames() {
    return await courseRepo.getAllCoursesWithInstructorNames();
}

export async function getAllFacultiesInfo() {
    return await facultyRepo.getAllFacultiesInfo();
}

export async function getAllStudentsInfo() {
    return await studentRepo.getAllStudentsInfo();
}

export async function getFacultySpecializationsCount() {
    return await facultyRepo.getFacultySpecializationsCount();
}

export async function getAllCourses() {
    return await courseRepo.getAllCourses();
}

export async function getAminById(id) {
    return await adminRepo.findAdminById(id);
}

export async function getTotalNumberOfStudentsPerMajor() {
    return await studentRepo.getTotalNumberOfStudentsPerMajor();
}

export async function getAvgGPAofStudentsPerMajor() {
    return await studentRepo.getAvgGPAofStudentsPerMajor();
}

export async function getTopTenGPAStudents() {
    return await studentRepo.getTopTenGPAStudents();
}

export async function getTopFiveRegisteredCourses() {
    return await courseRepo.getTopFiveRegisteredCourses();
}

export async function numberOfCoursesTaughtPerFaculty() {
    return await courseRepo.numberOfCoursesTaughtPerFaculty();
}

export async function commonPrerequisites() {
    return await courseRepo.commonPrerequisites();
}

export async function getGradesById(studentId) {
    return await courseRepo.getGradesById(studentId);
}

export async function getStudentById(studentId) {
    return await studentRepo.getStudentById(studentId);
}

export async function getStudentNumbersPeeFaculty(facultyId) {
    return await courseRepo.getStudentNumbersPerFaculty(facultyId);
}

export async function loginByEmail(email,password,userType) {
    return await secureLogin(email,password,userType);
}

async function secureLogin(email, password, userType) {
    let user = null;
    
    if (userType === "student") {
        user = await studentRepo.findStudentByEmail(email);

    } else if (userType === "instructor") {
        user = await facultyRepo.findFacultyByEmail(email);

    } else if (userType === "admin") {
        user = await adminRepo.findAdminByEmail(email);

    } else {
        console.log("Unknown user type error: " + userType);
        throw new Error("Unknown user type");
    }

    if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
    }

    // Authentication successful, set cookie
    const maxAge = 60 * 60 * 24;  // One day
    const tokenPayload = { id: user.id, email: user.email, userType };
      const idToken = await signJwt(tokenPayload);
    cookies().set("id_token", idToken || String(user.id), {
        path: "/",
        maxAge,
    });
    

    // Redirect to home
    // redirect("/admin/dashboard/"+user.id);
    return user;
}


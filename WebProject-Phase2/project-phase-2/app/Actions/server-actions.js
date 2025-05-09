'use server';
import courseRepo from "@/Repository/course-repo";
import studentRepo from "@/Repository/student-repo";
import adminRepo from "@/Repository/admin-repo";
import facultyRepo from "@/Repository/faculty-repo";

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

export async function loginByEmail(email,password,userType) {
    if(userType === "student") {
        const student = await studentRepo.findStudentByEmail(email);
        if(student && student.password === password) 
            return student;
    } 

    else if(userType === "instructor") {
        const instructor = await facultyRepo.findFacultyByEmail(email);
        if(instructor && instructor.password === password) 
            return instructor;
    } 

    else if(userType === "admin") {
        const admin = await adminRepo.findAdminByEmail(email);
        if(admin && admin.password === password) 
            return admin;
    } 
    
    else {
        console.log("Unknown user type error, " + userType);
        return false;
    }
}
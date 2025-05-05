'use server';
import courseRepo from "@/Repository/course-repo";
import studentRepo from "@/Repository/student-repo";
import adminRepo from "@/Repository/admin-repo";
import facultyRepo from "@/Repository/faculty-repo";

export async function getAllCourses() {
    return await courseRepo.getAllCourses();
}

export async function loginByForm(e) {
    const form = e.target;
    const data = Object.fromEntries(form);
    console.log("CODE: ")
    console.log("TESTINGGGG: ",data);
    const user = await loginByEmail(data.email,data.password,data.userType);
    // console.log(user);
}

export async function loginByEmail(email,password,userType) {
    if(userType === "student") {
        const student = studentRepo.findStudentByEmail(email);
        if(student && student.password === password) 
            return student;
    } 

    else if(userType === "instructor") {
        const instructor = facultyRepo.findFacultyByEmail(email);
        if(instructor && instructor.password === password) 
            return instructor;
    } 

    else if(userType === "admin") {
        const admin = adminRepo.findAdminByEmail(email);
        if(admin && admin.password === password) 
            return admin;
    } 
    
    else {
        console.log("Unknown user type error, " + userType);
    }
}
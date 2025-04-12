const userDataUrl = 'http://127.0.0.1:3000/Repository/users.json';
const coursesDataUrl = 'http://127.0.0.1:3000/Repository/courses.json';
const studentsDataUrl = 'http://127.0.0.1:3000/Repository/students.json';
const adminsDataUrl = 'http://127.0.0.1:3000/Repository/admins.json';
const facultiesDataUrl = 'http://127.0.0.1:3000/Repository/faculties.json';
const learningPathsDataUrl = 'http://127.0.0.1:3000/Repository/learningPaths.json';

let students = [];
let facaulties = [];
let admins = [];
let learningPaths = [];
let courses = [];
let users = [];

// localStorage.clear();
async function startLoadingLocalData() {
    courses = localStorage.getItem('courses') ? JSON.parse(localStorage.getItem('courses')) : await loadCoursesLocalData();
    students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : await loadStudentLocalData();
    facaulties = localStorage.getItem('faculties')? JSON.parse(localStorage.getItem('faculties')): await loadFacultyLocalData();
    admins = localStorage.getItem('admins')? JSON.parse(localStorage.getItem('admins')): await loadAdminLocalData();
    learningPaths = localStorage.getItem('learningPaths')? JSON.parse(localStorage.getItem('learningPaths')): await loadLearningPathsLocalData();
    users = localStorage.getItem('users')? JSON.parse(localStorage.getItem('users')): await loadUsersLocalData();

    console.log(courses);
    console.log(students);
    console.log(facaulties);
    console.log(admins);
    console.log(learningPaths);
    console.log(users);
}

startLoadingLocalData();



async function fetchData(UrlAddress) {
    const response = await fetch(UrlAddress);
    return await response.json();      
  }
  

async function loadCoursesLocalData() {
    const data = await fetchData(coursesDataUrl);
    localStorage.setItem('courses', JSON.stringify(data));
    courses = data;
}

function saveDataToLocalStorage(newData, DB) {
    localStorage.setItem(DB, JSON.stringify(newData));
}

function getDataFromLocalStorage(DB) {
    return localStorage.getItem(DB);
}


async function loadUsersLocalData() {
    const data = await fetchData(userDataUrl);
    localStorage.setItem('users', JSON.stringify(data));
    users = data;
}

async function loadStudentLocalData() {
    const data = await fetchData(studentsDataUrl);
    localStorage.setItem('students', JSON.stringify(data));
    students = data;
}

async function loadFacultyLocalData() {
    const data = await fetchData(facultiesDataUrl);
    localStorage.setItem('faculties', JSON.stringify(data));
    facaulties = data;
}

async function loadAdminLocalData() {
    const data = await fetchData(adminsDataUrl);
    localStorage.setItem('admins', JSON.stringify(data));
    admins = data;
}

async function loadLearningPathsLocalData() {
    const data = await fetchData(learningPathsDataUrl);
    localStorage.setItem('learningPaths', JSON.stringify(data));
    learningPaths = data;
}


let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

let student = userTypeDefining(user,'student');

let facaulty = userTypeDefining(user,'faculty');

let admin = userTypeDefining(user,'admin');

let learningPath = learningPaths.find(item => item.major === student.major);


let myCourses = localStorage.getItem('user') ? (JSON.parse(localStorage.getItem('user')).userType === 'student' ? 
courses.filter(item => item.students.find(stu => stu.id === JSON.parse(localStorage.getItem('user')).id))
: courses.filter(item => item.instructor.id === JSON.parse(localStorage.getItem('user')).id)) : [];
let selectedCourse = {};
console.log('myCourses',myCourses);
// console.log(assignMyCourses());
function assignMyCourses() {
    console.log('getType',user.userType)
    switch(user.userType) {
        case 'student':
            alert()
            return courses.filter(item => item.students.find(stu => stu.id === user.id));
        case 'faculty':
            return courses.filter(item => item.instructor.id === user.id);
        case 'admin':
            return courses;
        default:
            return [];
    }
}
function userTypeDefining(TheUser,objectName) {
    switch(TheUser.userType) {
        case 'student':
            return students.find(stu => stu.id === TheUser.id);
        case 'faculty':
            return facaulties.find(stu => stu.id === TheUser.id);
        case 'admin':
            return admins.find(stu => stu.id === TheUser.id);
        default:
            return {};
    }
}

function handleLoginForm(e){  
    e.preventDefault();
    console.log(users);
    console.log(courses);
    let user;
    const formData = new FormData(e.target);
    let formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    console.log(formObject);
    switch(formObject.userType) {
        case 'student':
            user = studentLogin(formObject);
            break;

        case 'instructor':
            user = instructorLogin(formObject);
            break;

        case 'admin':
            user = adminLogin(formObject);
            break;
    }
    
}

async function loadPage(pageUrl, selector) {
    const mainContent = document.querySelector(selector);
    const page = await fetch(pageUrl);
    const pageHTMLContent = await page.text();
    mainContent.innerHTML = pageHTMLContent;
}

//Under process
function newLogin(userInfo) {
    const user = users.find(item => item.email === userInfo.email);
    if(user) {

    } 
}


async function studentLogin(userInfo) {
    // console.log(userInfo.password);
    const tmp = users.find(item => item.email == userInfo.email);
    if(tmp == undefined) {
        const errorMessage = document.querySelector('#loginErrorMessage');
        errorMessage.innerHTML = 'The account \"'+userInfo.email+'\" does not exist!';
        return;
    }
    if(tmp.password === userInfo.password) {
        user = tmp;
        student = students.find(item => item.id === tmp.id);
        // myCourses = courses.filter(course => course.students.find(stu => stu.id == student.id));
        localStorage.setItem('user', JSON.stringify(student));
        open('/StudentPages/StudentHomePage.html');
        console.log(student);
        console.log(myCourses);
        return student;
    }
    else {
        const errorMessage = document.querySelector('#loginErrorMessage');
        errorMessage.innerHTML = 'Your email or password is wrong';
    }
}

async function instructorLogin(userInfo) {
    const tmp = facaulties.find(item => item.email == userInfo.email);
    if(tmp == undefined) {
        const errorMessage = document.querySelector('#loginErrorMessage');
        errorMessage.innerHTML = 'The account \"'+userInfo.email+'\" does not exist!';
        return;
    }
    if(tmp.password === userInfo.password) {
        facaulty = facaulties.find(item => item.id === tmp.id);
        courses = localStorage.getItem('courses')? JSON.parse(localStorage.getItem('courses')): [];
        localStorage.setItem('user', JSON.stringify(facaulty));
        // myCourses = courses.filter(course => course.instructor.id === tmp.id);
        open('/InstructorPages/InstructorHomePage.html');
        return tmp;
    }
    else {
        const errorMessage = document.querySelector('#loginErrorMessage');
        errorMessage.innerHTML = 'Your email or password is wrong';
    }
}   

async function adminLogin(userInfo) {
    const tmp = admins.find(item => item.email == userInfo.email);
    if(tmp == undefined) {
        const errorMessage = document.querySelector('#loginErrorMessage');
        errorMessage.innerHTML = 'The account \"'+userInfo.email+'\" does not exist!';
        return;
    }
    if(tmp.password === userInfo.password) {
        admin = tmp;
        courses = localStorage.getItem('courses')? JSON.parse(localStorage.getItem('courses')): [];
        localStorage.setItem('user', JSON.stringify(admin));
        // myCourses = courses;
        open('/AdminstratorPages/AdminHomePage.html');
        return tmp;
    }
    else {
        const errorMessage = document.querySelector('#loginErrorMessage');
        errorMessage.innerHTML = 'Your email or password is wrong';
    }
}


function openSearchModal() {
    document.getElementById("SearchBarContainer").style.display = 'flex';
    document.getElementById("searchModalButton").style.display = 'none';
    document.getElementById("collapseButton").style.display = 'flex';
}

function closeSearchModal() {
    document.getElementById("SearchBarContainer").style.display = 'none';
    document.getElementById("searchModalButton").style.display = 'flex';
    document.getElementById("collapseButton").style.display = 'none';
}

function searchForCourseToRegister() {
    const keyword= document.getElementById("searchForCourse").value;
    alert("Searching for \""+keyword+"\"...");
}

function registerForCourse(courseId) {
    const course = courses.find(item => item.id === courseId);
    if(!myCourses.find(item => item.id === course.id)) {
        if(course.registrationStatus) {
            if(course.prerequisites.length ? course.prerequisites.find(item => student.passedCourses.find(curs => curs.id === item.id)): true) {
                course.students.push(student);
                saveDataToLocalStorage(courses,'courses');
                alert(`You have registered ${course.title}`);
            }
            else {
                alert('You cannot register this course because you did not pass all the prequesties');
            }
        }
        else 
            alert(`${course.title} is currently not available!`);
    }
    else
        alert(`You have already registered for ${course.name}`);
}

async function openCourseDetailPage(courseId) {
    const pageContent = document.querySelector('#coursesPageBody');
    const response = await fetch('http://127.0.0.1:3000/InstructorPages/InstructorCourseDetails.html');
    pageContent.innerHTML = await response.text();
    const courseName = document.getElementById('CourseName');
    const courseCategory = document.getElementById('CourseCategory');
    const course = courses.find(item => item.id === courseId);
    courseName.innerHTML = course.title;
    courseCategory.innerHTML = course.category;
    displayMyCourseDetails(course);
}


function displayMyCourses() {
    console.log('user',user);
    console.log('Student: ',student);
    console.log('Faculty: ',facaulty);
    if(user.userType === 'student')
        createCourseCard(myCourses,'myCoursesBoxStudent','Availabel','closed','Details','openStudentCourseDetailPage');
    else if(user.userType === 'faculty')
        createCourseCard(myCourses,'myCoursesBoxFaculty','Availabel','closed','Details','openCourseDetailPage');
}


async function openStudentCourseDetailPage(courseId) {
    const pageContent = document.querySelector('#studentCoursesPageMainBody');
    const response = await fetch('http://127.0.0.1:3000/StudentPages/StudentGradesPage.html');
    pageContent.innerHTML = await response.text();
    const courseName = document.getElementById('StudentGradesCourseTitle');
    const courseCategory = document.getElementById('StudentGradesCourseCategory');
    const course = courses.find(item => item.id === courseId);
    courseName.innerHTML = course.title;
    courseCategory.innerHTML = course.category;
    displayStudentGradesInTable(student,course);
}

function displayStudentGradesInTable(student,course) {
    const tableRows = getStudentGradesInTable(student,course);
    const page = document.getElementById('StudentGradesTable');
    page.innerHTML = tableRows;
}

function getStudentGradesInTable(student,course) {
    let table = [];
    const header = `
        <tr>
            <th>Course Name</th>
            <th>Subject</th>
            <th>Grade</th>
        </tr>
    `;
    table.push(header);
    const content = getStudentGrades(student).map(item => {
        if(item.course.id === course.id) {
            `<tr>
                <td>${item.course.title}</td>
                <td>${item.title}</td>
                <td>${item.grade}</td>
            </tr>
        `}});
    table.push(content);
    table.flat();
    table.join(' ');
    console.log(table);
    return table;
}

function getStudentGrades(student) {
    return student.grades;
}

function displayInstructorOfferedCourses() {
    const coursesToShow = courses.filter(item => item.instructor.id === user.id);
    createCourseCard(coursesToShow,'InstructorRegistartionCourseBox','Offering','Expired');
}

function displayStudentOfferedCourses() {
    createCourseCard(courses,'StudentRegistartionCourseBox','Offering','Expired','Register','registerForCourse');
}


function displayStudentLearningPath() {
    console.log('LP',learningPath);
    for(let i = 0; i < learningPath.courses.length; i++) {
        const column = learningPath.courses[i].map(item => `
            <div id="LP${item.id}" class="smallCourseContainer">
                 <p>${item.title}</p> 
                 <p style="${item.prerequisites.length ? 
                    item.prerequisites.find(curs => student.passedCourses.find(itm => itm.name === curs.name)) ? 'color: lightgreen;':'color: red;'
                    :'color: yellow;'}
                 ">prerequisites: ${item.prerequisites.length ? item.prerequisites.map(curs => curs.title): 'none'}</p> 
                 <p>${student.passedCourses.length ? '' : student.passedCourses.find(curs => curs.id === item.id)? 
                     'Passed':'Requered'}</p> 
             </div>
         `);
         console.log('Column',column);
         const mainPage = document.getElementById(`column${i+1}`);
         console.log(`column${i+1}`);
         if(mainPage)
             mainPage.innerHTML += column.join(' ');
         else
            console.log(mainPage);
    }
}

function searchCoursesByTitle(courseTitle, selectedCourses) {
    return selectedCourses.filter(item => item.title === courseTitle);
}

function searchCoursesByCategory(courseCategory, selectedCourses) {
    return selectedCourses.filter(item => item.category === courseCategory);
}


function saveData() {
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('facaulties', JSON.stringify(facaulties));
    localStorage.setItem('admins', JSON.stringify(admins));
}

function searchMyCoursesByCategory() {
    if(getUserType() === 'Student')
        SearchFunction('searchMyCoursesByCategoryField',myCourses,'Category','myCoursesBoxStudent','Availabel','Not Available');
    else if(getUserType() === 'Facaulty')
        SearchFunction('searchMyCoursesByCategoryField',myCourses,'Category','myCoursesBoxFaculty','Availabel','Not Available');
}

function searchMyCoursesByTitle() {
    SearchFunction('searchMyCoursesByTitleField',myCourses,'Title','myCoursesBox','Availabel','Not Available');
}


function searchAllCoursesByCategory() {
    SearchFunction('searchAllCoursesByCategoryField',courses,'Category','RegistartionCourseBox','Offering','Expired','Register','registerForCourse');
}

function searchAllCoursesByTitle() {
    SearchFunction('searchAllCoursesByTitleField',courses,'Title','RegistartionCourseBox','Offering','Expired','Register','registerForCourse');
}

function SearchFunction(textFieldHtmlId,selectedCourses,ByWhat,HtmlElementId,FirstIcon,SecondIcon) {
    const textField = document.getElementById(textFieldHtmlId);
    const keyWord = textField.value;
    let output;
    if(ByWhat === 'Title')
        output = searchCoursesByTitle(keyWord,selectedCourses);
    else if(ByWhat === 'Category')
        output = searchCoursesByCategory(keyWord,selectedCourses);
    if(output)
        createCourseCard(output,HtmlElementId,FirstIcon,SecondIcon);
}


function createCourseCard(courseList,HtmlElementId,FirstIcon,SecondIcon,RegisterButtonText,EventHandlerFunction) {
    let data;
    const mainPage = document.getElementById(HtmlElementId);
    if(courseList.length !== 0) {
        data = courseList.map(item => `
            <article> 
                    <div class="courseContainer">
                            <p>${item.title}</p>
                            <p><i>Instructor: </i>${item.instructor.name}</p>
                            <p><i>Location: </i>${item.location}</p>
                            ${item.registrationStatus ? 
                                `<h6 class="icon-check">${FirstIcon}</h6>`:
                                `<h6 class="icon-uncheck">${SecondIcon}</h6>`}
                            ${RegisterButtonText? `<button onclick="${EventHandlerFunction}(${item.id})">${RegisterButtonText}</button>`: ''}
                    </div>       
            </article>
        `); 
        if(mainPage)
            mainPage.innerHTML = data.join(' ');
    }
    else {
        data = `<div class="topic">Nothing Found!</div>`;
        if(mainPage)
            mainPage.innerHTML = data;
    }
}

function displayMyCourseDetails(course) {
    // const course = courses.find(item => item.id === courseId);
    selectedCourse = course;
    createCourseDetailTable(course);
}

function createCourseDetailTable(course) {
    let newTable = [];
    newTable.push(`
        <tr>
            <th>No.</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>GPA</th>
            <th>status</th>
        </tr>
    `);
    newTable.push(course.students.map((item,a) =>`
        <tr>
            <td>${a}</td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.gpa}</td>
            <td>status</td>
        </tr>
    `));
    newTable.flat();
    const content = document.getElementById('studentTableContent1');
    content.innerHTML = newTable.join('\n');
}

async function openGradeSubmissionModal() {
    const response = await fetch('http://127.0.0.1:3000/InstructorPages/InstructorGradeSubmission.html');
    const content = await response.text();
    const page = document.getElementById('coursesPageBody');
    page.innerHTML = content;
    const courseName = selectedCourse.title;
    const courseCategory = selectedCourse.category;
    document.getElementById('gradeSubmissionCourseTitle').innerHTML = courseName;
    document.getElementById('mainTopicGradeSubmissionCourseTitle').innerHTML = courseName;
    document.getElementById('gradeSubmissionCourseCategory').innerHTML = courseCategory;
    displayMyCoursesStudentTableGradeSubmission(selectedCourse);
}

function displayMyCoursesStudentTableGradeSubmission(course) {
    const newContent = createMyCourseStudentTableRows(course);
    const page = document.getElementById('GradeSubmissionStudentTable');
    page.innerHTML = newContent;
}

function submitNewGradeForStudentById(studentId) {
    const stu = selectedCourse.students.find(item => item.id === studentId);
    const titleInput = document.getElementById('gradingTitleInput').value;
    const assignedGrade = document.getElementById(`submitNewGradeTextField${studentId}`).value;
    const newGrade = {
        course: selectedCourse,
        title: titleInput,
        grade: assignedGrade
    };
    console.log(newGrade);
    stu.grades.push(newGrade);
}

function createMyCourseStudentTableRows(course,admin) {
    let newRows = [];
    newRows.push(`
        <tr>
            <th>No.</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>GPA</th>
            ${admin? ' ': '<th>Status</th>'} 
           ${admin? ' ': '<th>New Grade</th>'} 
        </tr>
        `);
    newRows.push(course.students.map(stu => students.find(stuD => stu.id === stuD.id)).map((item,a) =>`
        <tr>
            <td>${a}</td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.gpa}</td>
            ${admin? ' ': '<td>STATUS</td>'} 
            <td ${admin ? 'style="display: none"' :' '}>
                <div class="gradeSubmissionInputFlexBox">
                    <input id="submitNewGradeTextField${item.id}" class="gradeSubmissionInput" type="text">
                    <button onclick="submitNewGradeForStudentById(${item.id})" class="addButton">
                        <img src="../Media/plus.png" width="40" alt="search icon" class="search-icon">
                    </button>
                </div>
            </td>
        </tr>
    `));
    return newRows;
}

function createCoursesGeneralDataTableRows(courses) {
    let rows = [];
    rows.push(`
        <tr>
            <th>Course Title</th>
            <th>Instructor</th>
            <th>Class Hall</th>
        </tr>
    `);
    rows.push(courses.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${item.instructor.name}</td>
                <td>${item.location}</td>
            </tr>
    `)); 
    rows.flat();
    return rows;
}

function loadStudentMyInfoPage(selectedStudent) {
    const page = document.getElementById('mainContainerStudentMyInfoPage');
    let studentGrades = [];
    studentGrades.push(`
        <tr>
            <th>Grading Subject</th>
            <th>Title</th>
            <th>Grade</th>
        </tr>
        `);
    studentGrades.push(selectedStudent.grades.map(item => `
            <tr>
                <td>${item.course.title}</td>
                <td>${item.title}</td>
                <td>${item.grade}%</td>
            </tr>
        `));
    studentGrades.flat();
    
    const personalInfo = `
       <div class="mainTopic"><h2>Student Information</h2></div>
       <div class="myInfoItemStyle">Name: <i>${selectedStudent.name}</i></div>
       <div class="myInfoItemStyle">ID: <i>${selectedStudent.id}</i></div>
       <div class="myInfoItemStyle">Email: <i>${selectedStudent.email}</i></div>
       <div class="myInfoItemStyle">GPA: <i>${selectedStudent.gpa}</i></div>
       <div class="myInfoItemStyle">Major: <i>${selectedStudent.major}</i></div><br>
       <div class="myInfoItemStyle"><i>List of Grades: </i></div>
       <div class="myInfoItemStyle">
        <table id="gradesListTable">
            
        </table>
        </div>
        <div class="myInfoItemStyle"><i>List of Current Courses: </i></div>
       <div class="myInfoItemStyle">
            <table id="currentCoursesListTable">
                
            </table>
        </div>
       <div class="myInfoItemStyle"><i>List of Passed Courses: </i></div>
       <div class="myInfoItemStyle">
            <table id="passedCoursesListTable">
                
            </table>
        </div>
    `;
    const newPage = personalInfo;
    page.innerHTML = newPage;
    document.getElementById('gradesListTable').innerHTML = studentGrades.join('\n');
    document.getElementById('currentCoursesListTable').innerHTML = createCoursesGeneralDataTableRows(courses.filter(course => course.students.find(stu => stu.id === selectedStudent.id))).join('\n');
    document.getElementById('passedCoursesListTable').innerHTML = createCoursesGeneralDataTableRows(selectedStudent.passedCourses).join('\n');
}

function loadFacultyMyInfoPage(selectedFaculty) {
    const page = document.getElementById('mainContainerFaculyMyInfoPage');
    const personalInfo = `
       <div class="mainTopic"><h2>Faculty Information</h2></div>
       <div class="myInfoItemStyle">Name: <i>${selectedFaculty.name}</i></div>
       <div class="myInfoItemStyle">ID: <i>${selectedFaculty.id}</i></div>
       <div class="myInfoItemStyle">Email: <i>${selectedFaculty.email}</i></div>
       <div class="myInfoItemStyle">specialization: <i>${selectedFaculty.specialization}</i></div><br>
       <div class="myInfoItemStyle"><i>List of Current Courses: </i></div>
       <div class="myInfoItemStyle">
            <table id="FacultyCurrentCoursesListTable">
                
            </table>
        </div>
       <div class="myInfoItemStyle"><i>List of Past Courses: </i></div>
       <div class="myInfoItemStyle">
            <table id="facultyPastCoursesListTable">
                 
            </table>
        </div>
    `;
    page.innerHTML = personalInfo;
    document.getElementById('FacultyCurrentCoursesListTable').innerHTML = 
    createCoursesGeneralDataTableRows(courses.filter(course => course.instructor.id === selectedFaculty.id)
    .filter(course => course.courseStatus === 'offering')).join('\n');
    document.getElementById('facultyPastCoursesListTable').innerHTML = 
    createCoursesGeneralDataTableRows(courses.filter(course => course.instructor.id === selectedFaculty.id)
    .filter(course => course.courseStatus === 'finished')).join('\n');
}

function loadAminMyInfoPage() {
    const page = document.getElementById('mainContainerAdminMyInfoPage');
    const personalInfo = `
       <div class="mainTopic"><h2>Admin Information</h2></div>
       <div class="myInfoItemStyle">Name: <i>${admin.name}</i></div>
       <div class="myInfoItemStyle">ID: <i>${admin.id}</i></div>
       <div class="myInfoItemStyle">Email: <i>${admin.email}</i></div>
    `;
    page.innerHTML = personalInfo;
    // document.getElementById('FacultyCurrentCoursesListTable').innerHTML = 
    // createCoursesGeneralDataTableRows(courses.filter(course => course.instructor.id === selectedFaculty.id)
    // .filter(course => course.courseStatus === 'offering')).join('\n');
    // document.getElementById('facultyPastCoursesListTable').innerHTML = 
    // createCoursesGeneralDataTableRows(courses.filter(course => course.instructor.id === selectedFaculty.id)
    // .filter(course => course.courseStatus === 'finished')).join('\n');
}

async function showRegistrationDetails(courseId) {
    const course = courses.find(course => course.id === courseId);
    const studentDataRows = createMyCourseStudentTableRows(course,'Yes');
    const page = document.getElementById('adminCourseManagementMainContainer');
    const response = await fetch('http://127.0.0.1:3000/AdminstratorPages/AdminCourseDetails.html');
    page.innerHTML = await response.text();
    const table = document.getElementById('registeredStudentsTable');
    document.getElementById('numberOfRegisteredStudents').innerHTML = course.students.length;
    document.getElementById('registrationStatusCourseManagement').innerHTML = 
    course.registrationStatus ? 'Registering':'Closed';
    document.getElementById('courseNameCourseManagement').innerHTML = course.title;
    table.innerHTML = studentDataRows;
    document.getElementById('instructorNameCourseManagement').innerHTML = course.instructor.name;
    selectedCourse = courses.find(item => item.id === courseId);
    course.registrationStatus ? '':document.getElementById('endTheRegistrationButtonAdmin').style.display = 'none';
    course.registrationStatus ? '':document.getElementById('editRegistrationButtonAdmin').style.display = 'none';
    course.courseStatus === 'finished' ? document.getElementById('endTheCourseButtonAdmin').style.display = 'none' : '';
    course.courseStatus === 'finished' ? document.getElementById('addNewStudentByAdminButton').style.display = 'none' : '';
}


function openAddNewStudentForRegistrationModal() {
    const frame = document.getElementById('AddNewStudentForRegisterationByAdmin');
    frame.style.display = 'inherit';
}

function editTheCourseAdminModal() {
    const data = document.getElementById('editTheCourseAdminForm');
    data.style.display = 'grid';
    document.getElementById('CourseNameForEditingForAdmin').value = selectedCourse.title;
    document.getElementById('CourseLocationForEditingForAdmin').value = selectedCourse.location;
    document.getElementById('CourseCategoryForEditingForAdmin').value = selectedCourse.category;
}

function closeUpdateCourseForAdminModal() {
    document.getElementById('editTheCourseAdminForm').style.display = 'none';
}

function UpdateCourseByAdminAction() {
    const title = document.getElementById('CourseNameForEditingForAdmin').value;
    const location = document.getElementById('CourseLocationForEditingForAdmin').value;
    const category = document.getElementById('CourseCategoryForEditingForAdmin').value;
    const course = courses.find(item => item.id === selectedCourse.id);
    course.title = title;
    course.location = location;
    course.category = category;
    saveDataToLocalStorage(courses,'courses');
    alert('The course updated.');
}

function finishTheCourseModal() {
    let isSure = confirm("Are you sure you want to finish this course?");
    if (isSure) {
        const courseIndex = courses.findIndex(item => item.id === selectedCourse.id);
        courses[courseIndex].courseStatus = 'finished';
 
        const studentAverages = courses[courseIndex].students.map(student => {
            const grades = (student.grades || [])
            .filter(item => item.course.id === courses[courseIndex].id)
            .map(item => item.grade);
        
            const sum = grades.reduce((acc, grade) => acc + grade, 0);
            const average = grades.length > 0 ? sum / grades.length : 0;
        
            return {
                id: student.id,
                averageGrade: average
            };
          });
          console.log(studentAverages)
          studentAverages.forEach(item => item.averageGrade = turnToGPA(item.averageGrade));
          console.log(studentAverages);
          studentAverages.forEach(item => {
            if(item.averageGrade !== 'fail') {
                const stu = students.find(itm => itm.id === item.id);
                stu.passedCourses.push(courses[courseIndex]);
                const NoGPAs = stu.passedCourses.length;
                const newGPA = (item.averageGrade+stu.gpa) / NoGPAs;
                console.log(stu.id,'----',stu.gpa);
                stu.gpa = newGPA;
                console.log(stu.id,'----',newGPA);
                console.log(stu.id,'----',stu.gpa);
            }
          });
        courses[courseIndex].registrationStatus = false;
        console.log(courses[courseIndex]);
        saveDataToLocalStorage(courses,'courses');
        alert("Course ended.");
    } else {
        alert("Canceled.");
    }
}


function turnToGPA(percent) {
        if (percent >= 90)
            return 4;
        else if(percent >=85)
            return 3.5;
        else if(percent >=80)
            return 3;
        else if(percent >=75)
            return 2.5;
        else if(percent >=70)
            return 2;
        else if(percent >=65)
            return 1.5;
        else if(percent >=60)
            return 1;
       else
            return 'fail';
}

function AddNewStudentForRegisterationByAdminButton() {
    const studentId = Number(document.getElementById('studentIdForAddingStudentTextField').value);
    const isThere = selectedCourse.students.find(item => item.id === studentId);
    const student = students.find(item => item.id === studentId);
    if(student) {
        isThere ? alert(isThere.name,' has already registered for this course!') : 
        selectedCourse.students.push(student);
        courses[courses.findIndex(item => item.id === selectedCourse.id)] = selectedCourse;
        saveDataToLocalStorage(courses,'courses');
    }
    else
        alert('The student id is invalid.');
}

function loadAminCourseManagementPage() {
    createCourseCard(courses,'AdminCoursesBox','open','closed','Details','showRegistrationDetails');
}

function displayListOfFacultiesForAdmin() {
    displayFacultyFullDataTable(facaulties,'facultyMembersDataTableForAdmin');
}

function displayFacultyFullDataTable(facultiesInput,HtmlElementId) {
    const data = generateFacultyFullDataTableRows(facultiesInput);
    const page = document.getElementById(HtmlElementId);
    page.innerHTML += data;
}

function displayStudentFullDataTable(studentsInput,HtmlElementId) {
    const data = generateFullDataStudentTableRows(studentsInput);
    const page = document.getElementById(HtmlElementId);
    page.innerHTML += data;
}

function generateFullDataStudentTableRows(studentsInput) {
    let data = [];
    if(studentsInput) {
        data = studentsInput.map(item =>`
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.major}</td>
                <td>${item.gpa}</td>
            </tr>
            `);
    }
    return data.join('\n');
}

function generateFacultyFullDataTableRows(facultiesInput) {
    let data = [];
    if(facultiesInput) {
        data = facultiesInput.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.specialization}</td>
            </tr>
            `);
    }
    return data.join('\n');
}

function displayListOfStudentsForAdmin() {
    displayStudentFullDataTable(students,'StudentMembersDataTableForAdmin');
}

function searchCoursesInCourseManagementForAdminByCategory() {
    const category = document.getElementById('searchCourseManagementByCategoryAdminField').value;
    const newCourses = courses.filter(item => item.category === category);
    createCourseCard(newCourses,'AdminCoursesBox','open','closed','Details','showRegistrationDetails');
}

function searchCoursesInCourseManagementForAdminByTitle() {
    const title = document.getElementById('searchCourseManagementByTitleAdminField').value;
    const newCourses = courses.filter(item => item.title === title);
    createCourseCard(newCourses,'AdminCoursesBox','open','closed','Details','showRegistrationDetails');
}

function searchMyCoursesByCategoryForInstructor() {
    const category = document.getElementById('searchMyCoursesByCategoryForInstructorField').value;
    const newCourses = myCourses.filter(item => item.category === category);
    createCourseCard(newCourses,'myCoursesBoxFaculty','Availabel','closed','Details','openCourseDetailPage');
}

function searchMyCoursesByTitleForInstructor() {
    const title = document.getElementById('searchMyCoursesByTitleForInstructorField').value;
    const newCourses = myCourses.filter(item => item.title === title);
    createCourseCard(newCourses,'myCoursesBoxFaculty','Availabel','closed','Details','openCourseDetailPage');
}

function searchAllCoursesByCategoryForInstructor() {
    const category = document.getElementById('searchAllCoursesByCategoryForInstructorField').value;
    const newCourses = myCourses.filter(item => item.category === category);
    createCourseCard(newCourses,'InstructorRegistartionCourseBox','Availabel','closed');
}

function searchAllCoursesByTitleForInstructor() {
    const title = document.getElementById('searchAllCoursesByTitleForInstructorField').value;
    const newCourses = myCourses.filter(item => item.title === title);
    createCourseCard(newCourses,'InstructorRegistartionCourseBox','Availabel','closed');
}

function searchMyCoursesByCategoryForStudent() {
    const category = document.getElementById('searchMyCoursesByCategoryForStudentField').value;
    const newCourses = myCourses.filter(item => item.category === category);
    createCourseCard(newCourses,'myCoursesBoxStudent','Availabel','closed','Details','openStudentCourseDetailPage');
}

function searchMyCoursesByTitleForStudent() {
    const title = document.getElementById('searchMyCoursesByTitleForStudentField').value;
    const newCourses = myCourses.filter(item => item.title === title);
    createCourseCard(newCourses,'myCoursesBoxStudent','Availabel','closed','Details','openStudentCourseDetailPage');
}

function searchAllCoursesByCategoryForStudent() {
    const category = document.getElementById('searchAllCoursesByCategoryForStudentField').value;
    const newCourses = courses.filter(item => item.category === category);
    createCourseCard(newCourses,'StudentRegistartionCourseBox','Offering','Expired','Register','registerForCourse');
}

function searchAllCoursesByTitleForStudent() {
    const title = document.getElementById('searchAllCoursesByTitleForStudentField').value;
    const newCourses = courses.filter(item => item.title === title);
    createCourseCard(newCourses,'StudentRegistartionCourseBox','Offering','Expired','Register','registerForCourse');
}

function endCourseRegistrationByAdmin() {
    const isSure = confirm('Are you sure to end the course registartion?');
    if(isSure) {
        const course = courses.find(item => item.id === selectedCourse.id);
        course.registrationStatus = false;
        saveDataToLocalStorage(courses,'courses');
        alert('The course registration closed.');
    }
    else
        alert('Action canceled.');
}

function handleCreatingNewCourse(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const courseData = {};
  
    for (let [key, value] of formData.entries()) {
      courseData[key] = value;
    }

    const newId = 1 + users[users.length-1].id
    const newCourse = {
        id: newId, 
        title: courseData.title, 
        instructor: facaulties.find(item => item.id === Number(courseData.instructorId)),
        students: [],
        location: courseData.location,
        category: courseData.category,
        prerequisites: [],
        registrationStatus: true,
        courseStatus: "offering"
    }
    courses.push(newCourse);
    saveDataToLocalStorage(courses,'courses');
}


function openAddingNewCourseModal() {
    document.getElementById('addCourseModalForAdmin').style.display = 'grid';
}

function closeAddingNewCourseModal() {
    document.getElementById('addCourseModalForAdmin').style.display = 'none';
}

window.onload = () => {

    // Event listener for loading myCourses page
    if (window.location.pathname === '/StudentPages/StudentCoursesPage.html') {
        displayMyCourses();
    }

    if (window.location.pathname === '/StudentPages/StudentRegisterationPage.html') {
        displayStudentOfferedCourses();
    }

    if (window.location.pathname === '/StudentPages/StudentLearningPathPage.html') {
        displayStudentLearningPath();
    }

    if (window.location.pathname === '/InstructorPages/InstructorCoursesPage.html') {
        displayMyCourses();
    }

    if (window.location.pathname === '/InstructorPages/InstructorRegisterationPage.html') {
        displayInstructorOfferedCourses();
    }
    

    if (window.location.pathname === '/InstructorPages/InstructorCourseDetails.html') {
        displayMyCourseDetails();
    }

    if(window.location.pathname === '/StudentPages/MyInfoPage.html') {
        loadStudentMyInfoPage(student);
    }

    if(window.location.pathname === '/InstructorPages/MyInfoPage.html') {
        loadFacultyMyInfoPage(facaulty);
    }  
    
    if(window.location.pathname === '/AdminstratorPages/MyInfoPage.html') {
        loadAminMyInfoPage();
    }

    if(window.location.pathname === '/AdminstratorPages/AdminCourseManagement.html') {
        loadAminCourseManagementPage();
    }
    
    if(window.location.pathname === '/AdminstratorPages/AdminFaculties.html') {
        displayListOfFacultiesForAdmin();
    }

    if(window.location.pathname === '/AdminstratorPages/AdminStudents.html') {
        displayListOfStudentsForAdmin();
    }

    // Event listener for login form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit",handleLoginForm);
    }

    const formToCreateNewCourse = document.getElementById('formToCreateNewCourse');
    if(formToCreateNewCourse) {
        formToCreateNewCourse.addEventListener('submit',handleCreatingNewCourse)
    }

    const addNewCourseForTheAdmin = document.getElementById('addNewCourseForTheAdmin');
    if(addNewCourseForTheAdmin) {
        addNewCourseForTheAdmin.addEventListener('click', openAddingNewCourseModal)
    }

    // Event listener for search modal button
    const searchModalButton = document.getElementById("searchModalButton");
    if (searchModalButton) {
        searchModalButton.addEventListener("click", openSearchModal);
    }

    // Event listener for collapse button
    const collapseButton = document.getElementById("collapseButton");
    if (collapseButton) {
        collapseButton.addEventListener("click", closeSearchModal);
    }

    // Event listeners for search button
    const searchMyCoursesByCategoryButton = document.getElementById("searchMyCoursesByCategoryButton");
    if (searchMyCoursesByCategoryButton) {
        searchMyCoursesByCategoryButton.addEventListener("click", searchMyCoursesByCategory);
    }

    const searchMyCoursesByTitleButton = document.getElementById("searchMyCoursesByTitleButton");
    if (searchMyCoursesByTitleButton) {
        searchMyCoursesByTitleButton.addEventListener("click", searchMyCoursesByTitle);
    }

    const searchAllCoursesByCategoryButton = document.getElementById("searchAllCoursesByCategoryButton");
    if (searchAllCoursesByCategoryButton) {
        searchAllCoursesByCategoryButton.addEventListener("click", searchAllCoursesByCategory);
    }

    const UpdateCourseByAdminButton = document.getElementById("UpdateCourseByAdminButton");
    if (UpdateCourseByAdminButton) {
        UpdateCourseByAdminButton.addEventListener("click", UpdateCourseByAdminAction);
    }
    
    //Event listener for submit a new grade
    const gradeSubmissionButton = document.getElementById("submitNewGrade");
    if(gradeSubmissionButton) {
        gradeSubmissionButton.addEventListener("click",() => alert("submiting grade for ...."));
    }

};




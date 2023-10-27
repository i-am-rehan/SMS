#!/usr/bin/node
import inquirer from 'inquirer';
class Student {
    constructor(name) {
        this.courses = [];
        this.balance = 0;
        this.studentID = Student.uniqueID++;
        this.name = name;
    }
    enroll(course, cost) {
        this.courses.push(course);
        this.balance += cost;
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`Payment of $${amount} received from ${this.name}.`);
    }
    showStatus() {
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Name: ${this.name}`);
        console.log('Courses Enrolled:');
        for (const course of this.courses) {
            console.log(`- ${course}`);
        }
        console.log(`Balance: $${this.balance}`);
    }
}
Student.uniqueID = 1;
const students = [];
async function addStudent() {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter student name:',
    });
    const student = new Student(name);
    students.push(student);
    console.log(`${name} has been added. Student ID: ${student['studentID']}`);
}
async function enrollStudent() {
    const { studentID } = await inquirer.prompt({
        type: 'input',
        name: 'studentID',
        message: 'Enter student ID:',
    });
    const student = students.find(s => s['studentID'] === parseInt(studentID, 10));
    if (student) {
        const { course, cost } = await inquirer.prompt([
            {
                type: 'input',
                name: 'course',
                message: 'Enter course name:',
            },
            {
                type: 'input',
                name: 'cost',
                message: 'Enter course cost:',
            },
        ]);
        student.enroll(course, parseFloat(cost));
        console.log(`${student['name']} has been enrolled in ${course}.`);
    }
    else {
        console.log('Student not found.');
    }
}
async function viewBalance() {
    const { studentID } = await inquirer.prompt({
        type: 'input',
        name: 'studentID',
        message: 'Enter student ID:',
    });
    const student = students.find(s => s['studentID'] === parseInt(studentID, 10));
    if (student) {
        student.viewBalance();
    }
    else {
        console.log('Student not found.');
    }
}
async function payTuition() {
    const { studentID, amount } = await inquirer.prompt([
        {
            type: 'input',
            name: 'studentID',
            message: 'Enter student ID:',
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter payment amount:',
        },
    ]);
    const student = students.find(s => s['studentID'] === parseInt(studentID, 10));
    if (student) {
        student.payTuition(parseFloat(amount));
    }
    else {
        console.log('Student not found.');
    }
}
async function showStatus() {
    const { studentID } = await inquirer.prompt({
        type: 'input',
        name: 'studentID',
        message: 'Enter student ID:',
    });
    const student = students.find(s => s['studentID'] === parseInt(studentID, 10));
    if (student) {
        student.showStatus();
    }
    else {
        console.log('Student not found.');
    }
}
async function mainMenu() {
    while (true) {
        const { choice } = await inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: 'Select an action:',
            choices: [
                'Add Student',
                'Enroll Student',
                'View Balance',
                'Pay Tuition',
                'Show Status',
                'Exit',
            ],
        });
        switch (choice) {
            case 'Add Student':
                await addStudent();
                break;
            case 'Enroll Student':
                await enrollStudent();
                break;
            case 'View Balance':
                await viewBalance();
                break;
            case 'Pay Tuition':
                await payTuition();
                break;
            case 'Show Status':
                await showStatus();
                break;
            case 'Exit':
                return;
        }
    }
}
mainMenu();

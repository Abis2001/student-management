
const API_URL = "http://localhost:5000/api/students";


// Get students when page loads
window.onload = function () {
    getStudents();
};


// Get all students
function getStudents() {

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            const table = document.getElementById("studentTable");

            table.innerHTML = "";

            data.forEach(student => {

                const row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.course}</td>
                        <td>
                            <button
                                class="delete-btn"
                                onclick="deleteStudent(${student.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

                table.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}


// Add student
function addStudent() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;

    if (name === "" || email === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            email: email,
            course: course
        })

    })
    .then(response => response.json())
    .then(data => {

        alert("Student added successfully!");

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("course").value = "";

        getStudents();
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


// Delete student
function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    })
    .then(response => response.json())
    .then(data => {

        alert("Student deleted!");

        getStudents();
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

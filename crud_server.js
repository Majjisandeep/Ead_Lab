const express = require("express");
const app = express();

app.use(express.json()); // parse JSON request body

// In-memory student data
let students = [
  { id: 1, name: "Sandeep", age: 21, course: "IT" },
  { id: 2, name: "Ravi", age: 22, course: "CSE" }
];

// ✅ CREATE - Add a new student
app.post("/students", (req, res) => {
  const { name, age, course } = req.body;
  const newStudent = { id: students.length + 1, name, age, course };
  students.push(newStudent);
  res.status(201).json({ message: "Student added", data: newStudent });
});

// ✅ READ - Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ✅ READ - Get student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// ✅ UPDATE - Update student by ID
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  student.name = req.body.name || student.name;
  student.age = req.body.age || student.age;
  student.course = req.body.course || student.course;

  res.json({ message: "Student updated", data: student });
});

// ✅ DELETE - Remove student by ID
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

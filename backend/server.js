const express = require("express");

const app = express();

app.use(express.json());

const PORT = 5000;

let patients = [];

app.get("/", (req, res) => {
    res.send("Hospital Appointment Management System API");
});

app.get("/doctors", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Dr. Ravi",
            specialization: "Cardiologist"
        },
        {
            id: 2,
            name: "Dr. Anjali",
            specialization: "Dermatologist"
        }
    ]);
});

app.post("/patients", (req, res) => {
    const patient = {
        id: patients.length + 1,
        ...req.body
    };

    patients.push(patient);

    res.json({
        message: "Patient registered successfully",
        patient: patient
    });
});

app.get("/patients", (req, res) => {
    res.json(patients);
});

app.put("/patients/:id", (req, res) => {
    const id = Number(req.params.id);

    const patient = patients.find(p => p.id === id);

    if (!patient) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }

    Object.assign(patient, req.body);

    res.json({
        message: "Patient updated successfully",
        patient: patient
    });
});

app.delete("/patients/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = patients.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }

    patients.splice(index, 1);

    res.json({
        message: "Patient deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
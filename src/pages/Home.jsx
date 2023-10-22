import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import useGoogleSheets from "use-google-sheets";

const Home = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
  });

  const [students, setStudents] = useState([]);
  const [timeTable, setTimeTable] = useState([]);
  const [rollno, setRollNo] = useState("");

  const IsLoading = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error!</div>;
    }
  };

  const getData = (e) => {
    e.preventDefault();
    console.log(students);
    console.log(timeTable);
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      const studentsData = data.filter((d) => d.id === "Students");
      const timeTableData = data.filter((d) => d.id === "Time Table");
      setStudents(studentsData);
      setTimeTable(timeTableData);
    }
  }, [data]);

  console.log(data);
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Form onSubmit={getData}>
        <Card className="px-5 pt-5 bg-secondary text-white shadow">
          <IsLoading />
          <Card.Body>
            <div className="d-flex ">
              <Form.Group className="d-flex align-items-center me-md-3 mb-md-0 mb-3">
                <Form.Label className="me-2">Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="your rollno"
                  value={rollno}
                  onChange={(e) => {
                    if (/^[0-9]+$/.test(e.target.value)) {
                      setRollNo(e.target.value);
                    }
                  }}
                />
              </Form.Group>
            </div>
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
};

export default Home;

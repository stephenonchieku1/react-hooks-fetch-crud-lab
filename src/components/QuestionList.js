import React,{useEffect,useState} from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((x) => setQuestion(x));
  });

  function handdlDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        setQuestion(question.filter((el) => el.id !== id));
      });
  }

  function change(id, num) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: num }),
    }).then((r) => r.json());
  }

  let data = question.map((el) => (
    <QuestionItem
      key={el.id}
      question={el}
      handdlDelete={handdlDelete}
      change={change}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{data}</ul>
    </section>
  );
}

export default QuestionList;

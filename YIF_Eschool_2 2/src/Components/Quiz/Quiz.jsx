import React, { useState, useEffect } from "react";
import "./quiz.css";

function Quiz() {
  const [quiz, setQuiz] = useState({});
  const [quizName, setQuizName] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [tempQuestion, setTempQuestion] = useState({});
  const [showQuesContainer, setShowQuesContainer] = useState(false);

  const addQuestion = () => {
    setShowQuesContainer(true);
  };
  const addQuestionSubmitHandle = (e) => {
    e.preventDefault();
    setQuestionList((state) => [...state, tempQuestion]);
    setTempQuestion({});
    setShowQuesContainer(false);
  };
  const quesInpHandle = (e) => {
    setTempQuestion((state) => ({ ...state, [e.target.id]: e.target.value }));
  };

  const createQuizFunc = () => {
    const _quiz = {
      quiz_name: quizName,
      quiz_questions: questionList,
    };
    setQuiz(_quiz);
    // console.log(_quiz);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-container-main">
        <div className="quiz-input">
          <div className="quiz-inp-field">
            <label htmlFor="quiz-name">Enter name of quiz</label>
            <input
              type="text"
              id="quiz-name"
              onChange={(e) => {
                setQuizName(e.target.value);
              }}
            />
          </div>
          {!showQuesContainer && (
            <div className="quiz-inp-field">
              <button
                onClick={() => {
                  addQuestion();
                }}
              >
                Add Question
              </button>
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Option 1</th>
                <th>Option 2</th>
                <th>Option 3</th>
                <th>Option 4</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {questionList?.map((ques, ind) => (
                <tr key={ind}>
                  <td>{ques.quiz_ques}</td>
                  <td
                    className={`quiz-table-wrong-ans ${
                      ques.quiz_correct_op === "quiz_op_1" &&
                      "quiz-table-correct-ans"
                    }`}
                  >
                    {ques.quiz_op_1}
                  </td>
                  <td
                    className={`quiz-table-wrong-ans ${
                      ques.quiz_correct_op === "quiz_op_2" &&
                      "quiz-table-correct-ans"
                    }`}
                  >
                    {ques.quiz_op_2}
                  </td>
                  <td
                    className={`quiz-table-wrong-ans ${
                      ques.quiz_correct_op === "quiz_op_3" &&
                      "quiz-table-correct-ans"
                    }`}
                  >
                    {ques.quiz_op_3}
                  </td>
                  <td
                    className={`quiz-table-wrong-ans ${
                      ques.quiz_correct_op === "quiz_op_4" &&
                      "quiz-table-correct-ans"
                    }`}
                  >
                    {ques.quiz_op_4}
                  </td>
                  <td>{ques.ques_diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {showQuesContainer && (
            <form
              className="quiz-add-ques-container"
              onSubmit={(e) => {
                addQuestionSubmitHandle(e);
              }}
            >
              <p>Create A Question</p>
              <div className="quiz-ques-field">
                <input
                  type="text"
                  id="quiz_ques"
                  placeholder="Question"
                  onChange={(e) => {
                    quesInpHandle(e);
                  }}
                  required
                />
              </div>
              <div className="quiz-ques-field">
                <input
                  type="number"
                  id="quiz_marks"
                  placeholder="Marks"
                  onChange={(e) => {
                    quesInpHandle(e);
                  }}
                  required
                />
              </div>
              <div className="quiz-ques-field quiz-ops">
                <input
                  type="text"
                  id="quiz_op_1"
                  placeholder="Option One"
                  onChange={(e) => {
                    quesInpHandle(e);
                  }}
                />
                <input
                  type="radio"
                  name="quiz-correct-op"
                  value="quiz_op_1"
                  id="quiz_correct_op"
                  onClick={(e) => {
                    quesInpHandle(e);
                  }}
                  required
                />
              </div>
              <div className="quiz-ques-field quiz-ops">
                <input
                  type="text"
                  id="quiz_op_2"
                  placeholder="Option Two"
                  onChange={(e) => {
                    quesInpHandle(e);
                  }}
                />
                <input
                  type="radio"
                  name="quiz-correct-op"
                  value="quiz_op_2"
                  id="quiz_correct_op"
                  onClick={(e) => {
                    quesInpHandle(e);
                  }}
                />
              </div>
              <div className="quiz-ques-field quiz-ops">
                <input
                  type="text"
                  id="quiz_op_3"
                  placeholder="Option Three"
                  onChange={(e) => {
                    quesInpHandle(e);
                  }}
                />
                <input
                  type="radio"
                  name="quiz-correct-op"
                  value="quiz_op_3"
                  id="quiz_correct_op"
                  onClick={(e) => {
                    quesInpHandle(e);
                  }}
                />
              </div>
              <div className="quiz-ques-field quiz-ops">
                <input
                  type="text"
                  id="quiz_op_4"
                  placeholder="Option Four"
                  onChange={(e) => {
                    quesInpHandle(e);
                  }}
                />
                <input
                  type="radio"
                  name="quiz-correct-op"
                  value="quiz_op_4"
                  id="quiz_correct_op"
                  onClick={(e) => {
                    quesInpHandle(e);
                  }}
                />
              </div>
              <div className="quiz-ques-field">
                <label htmlFor="">Select Difficulty </label>
                <select
                  id="ques_diff"
                  onChange={(e) => {
                    quesInpHandle(e);
                  }}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="quiz-ques-field quiz-add-ques">
                <button type="submit">Add Question</button>
              </div>
            </form>
          )}
          <div className="quiz-inp-field">
            <button
              onClick={() => {
                createQuizFunc();
              }}
            >
              Create Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;

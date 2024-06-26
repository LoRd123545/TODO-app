import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import taskService from "src/services/tasks";

const Add = () => {
  const keycloak = useOutletContext();
  const navigate = useNavigate();
  const token = keycloak.token;

  const [data, setData] = useState({
    name: "",
    description: "",
    dueDate: Date.now() + 86_400_000,
    status: "not-started",
  });

  function submit(e) {
    e.preventDefault();
    const dataCopy = data;
    dataCopy.dueDate = new Date(dataCopy.dueDate).toISOString();
    setData(dataCopy);
    taskService
      .add(data, token)
      .then((res) => {
        console.log(res.data);
        navigate("/tasks");
      })
      .catch((err) => {
        console.error("error while adding task: " + err);
      });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <div className="form__panel">
      <div className="form__header">
        <h1 className="heading text--white ">Dodaj zadanie</h1>
      </div>
      <div className="form__box">
        <form onSubmit={submit}>
          <label>
            <div className="wrapper">
              <div className="input-data">
                <input type="text" name="name" id="name" onChange={handle} />
                <label>Nazwa Zadania</label>
              </div>
            </div>
          </label>
          <label>
            <div className="wrapper">
              <div className="textarea-data">
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  maxLength="500"
                  id="description"
                  onChange={handle}
                ></textarea>
                <label>Opis zadania</label>
              </div>
            </div>
          </label>
          <label>
            <div className="wrapper">
              <label>Termin wykonania zadania</label>
              <div>
                <input
                  type="datetime-local"
                  name="dueDate"
                  step="1"
                  id="dueDate"
                  onChange={(e) => handle(e)}
                />
              </div>
            </div>
          </label>
          <label>
            <div className="wrapper">
              <label>Status zadania</label>
              <div className="select">
                <select
                  defaultValue="not-started"
                  name="status"
                  id="status"
                  onChange={(e) => handle(e)}
                >
                  <option value="not-started">Do zrobienia</option>
                  <option value="in-progress">W trakcie</option>
                  <option value="done">Zakończone</option>
                </select>
              </div>
            </div>
            <br />
          </label>
          <div className="wrapper wrapper__button">
            <button type="submit" className="button">
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

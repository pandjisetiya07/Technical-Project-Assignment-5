import React from "react";
import { useState } from "react";
import "./Home.css";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

function Home() {
  const [selected, setSelected] = useState("All");
  const [idedit, setIdedit] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState("");
  const [list, setList] = useState([]);

  const [todo, setTodo] = useState({
    id: "",
    todo: "",
    status: "Active",
  });

  // fungsi mendapatkan inputan user
  const handleinput = (e) => {
    setTodo({ ...todo, id: uuid(), [e.target.name]: e.target.value });
  };

  // fungsi menambahkan inputan user
  const handleadd = () => {
    setList((current) => [...current, todo]);
  };

  // fungsi pindah status
  const handlepick = (e) => {
    setSelected(e.target.name);
  };

  // funngsi mengubah status menjadi complete
  const handlecompleted = (id) => {
    const editedTextList = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: "Completed" };
      }
      return todo;
    });
    setList(editedTextList);
  };

  // fungsi untuk menghapus
  const deleted = (id) => {
    const deltext = list.filter((user) => {
      console.log(id, user.id);

      return id !== user.id;
    });
    setList(deltext);
  };

  // fungsi untuk edit
  const edittext = (e) => {
    setEdit(e.target.value);
  };

  // fungsi untuk mengubah hasil edit
  const handleedit = () => {
    const editlist = list.map((text) => {
      if (text.id === idedit) {
        return { ...text, todo: edit };
      }
      return text;
    });
    console.log(editlist);
    setShow(false);
    setList(editlist);
  };

  // fungsi untuk menampilkan inputan edit
  const tampil = (id) => {
    setShow(!show);
    setIdedit(id);
  };

  useEffect(() => {}, [selected]);

  return (
    <>
      <div className="container">
        <div className="container-judul">
          <div className="row">
            <div>
              <h1>Add List To Do</h1>
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col label">
            <div className="form-group">
              <div className="input-group">
                <input id="field1" type="text" className="form-control add" placeholder="Write down your activities" name="todo" onChange={handleinput} />
                <span className="input-group-btn">
                  <button className="btn btn-info add ms-2" type="button" onClick={handleadd}>
                    Add
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        {show && (
          <>
            <div className="row">
              <div className="col label">
                <div className="form-group">
                  <div className="input-group">
                    <input id="field1" type="text" className="form-control add" placeholder="Write down your activities" name="todo" onChange={edittext} />
                    <span className="input-group-btn">
                      <button className="btn btn-info add ms-2" name="todo" type="button" onClick={() => handleedit(idedit)}>
                        Edit
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="container">
          <div className="row label d-flex justify-content-between">
            <div>
              <button className={`btn add ms-2 ${selected === "All" ? "btn-info add" : "btn add"}`} name="All" type="button" onClick={handlepick}>
                All
              </button>
              <button className={`btn add ms-2 ${selected === "Active" ? "btn-info add" : "btn add"}`} name="Active" type="button" onClick={handlepick}>
                Active
              </button>
              <button className={`btn add ms-2 ${selected === "Completed" ? "btn-info add" : "btn add"}`} name="Completed" type="button" onClick={handlepick}>
                Completed
              </button>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-6">
              {list.length && selected === "All" ? (
                list.map((element) => {
                  return (
                    <div key={element.id} className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">{element.todo}</h5>
                        <div>
                          <button onClick={() => handlecompleted(element.id)} className="card-text list">
                            {element.status}
                          </button>
                        </div>
                        <button className="btn  me-2 mt-1" onClick={() => tampil(element.id)}>
                          <span>
                           <BsPencilSquare/>
                          </span>
                        </button>

                        <button className="btn mt-1" onClick={() => deleted(element.id)}>
                          <span>
                           <BsTrashFill/>
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              {list.length && selected === "Active" ? (
                list
                  .filter((element) => element.status === "Active")
                  .map((element) => {
                    return (
                      <div key={element.id} className="card mb-4">
                        <div className="card-body">
                          <h5 className="card-title">{element.todo}</h5>
                          <div>
                            <button onClick={() => handlecompleted(element.id)} className="card-text list">
                              {element.status}
                            </button>
                          </div>
                          <button className="btn  me-2 mt-1" onClick={() => tampil(element.id)}>
                            <span>
                              <img src={require("../assets/e.png")} style={{ width: 25 }} />
                            </span>
                          </button>
                          <button className="btn mt-1" onClick={() => deleted(element.id)}>
                            <span>
                              <img src={require("../assets/delete.png")} style={{ width: 25 }} />
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <></>
              )}
              {list.length && selected === "Completed" ? (
                list
                  .filter((element) => element.status === "Completed")
                  .map((element) => {
                    return (
                      <div key={element.id} className="card mb-4">
                        <div className="card-body">
                          <h5 className="card-title">{element.todo}</h5>
                          <div>
                            <button className="card-text list">{element.status}</button>
                          </div>
                          <button className="btn  me-2 mt-1">
                            <span>
                              <img src={require("../assets/e.png")} style={{ width: 25 }} />
                            </span>
                          </button>
                          <button className="btn mt-1" onClick={() => deleted(element.id)}>
                            <span>
                              <img src={require("../assets/delete.png")} style={{ width: 25 }} />
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

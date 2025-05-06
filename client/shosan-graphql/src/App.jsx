import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
  flexColCenter, flexColStart, GET_USERS, GET_USER_BY_ID, 
  CREATE_USERS, flexCenter, flexAroundStart, flexBetween, UPDATE_USER 
} from './data';



function App() {
  const [idData, setIdData] = useState("1");
  const [clickedEdit, setClickedEdit] = useState(null);
  const [userData, setUserData] = useState({ name: "", age: 0, isMarried: false });
  const [updateUserData, setUpdateUserData] = useState({ name: "", age: 0, isMarried: false });
  const { name, age, isMarried } = userData;

  const { 
    data: getUsersData, 
    error: getUsersError, 
    loading: getUsersLoading 
  } = useQuery(GET_USERS);

  const { 
    data: getUserByIdData, 
    error: getUserByIdError, 
    loading: getUserByIdLoading 
  } = useQuery(GET_USER_BY_ID, { variables: { id: idData } });

  const [ createUser ] = useMutation(CREATE_USERS);
  const [ updateUser ] = useMutation(UPDATE_USER);

  const handleSelect = (id) => setIdData(id);
  const handleChange = (e) => setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleDataChange = (e) => setUpdateUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCreateUser = async () => {
    console.log("Creating user...", userData);
    await createUser({ variables: { name, age: Number(age), isMarried }});
    window.location.reload();
  }

  const handleEdit = async (id, name, age, isMarried) => {
    if (clickedEdit !== id) {
      setClickedEdit(id);
      setUpdateUserData({ ...updateUserData, name, age, isMarried });
    } else {
      setClickedEdit(null)
      await updateUser({ 
        variables: { 
          id, 
          name: updateUserData.name, 
          age: Number(updateUserData.age), isMarried: Boolean(updateUserData.isMarried) 
        }
      });
      console.log("Updated data:", updateUserData);
      // window.location.reload();
    }
  }

  if (getUsersLoading) return <p style={{ ...flexCenter, width: "100%", height: "100vh" }}>Loading...</p>;
  if (getUsersError) return <p>Error : {getUsersError.message}</p>;

  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
          List of Users
        </div>
        <hr style={{ marginTop: 20, width: "100%" }} />
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {
            getUsersData.getUsers.map((user) => (
              <button 
                style={{ ...flexColStart, backgroundColor: "#07800830", borderRadius: "8px", padding: 10 }} 
                onClick={() => handleSelect(user.id)} 
                key={user.id}
              >
                <div style={{ ...flexBetween, width: "100%" }}>
                  <input 
                    placeholder={ user.name } 
                    name="name" 
                    type="text" 
                    value={ clickedEdit === user.id ? updateUserData.name : user.name } 
                    disabled={ clickedEdit !== user.id }
                    onChange={handleDataChange} 
                    style={{ 
                      backgroundColor: "transparent", 
                      borderWidth: 0, 
                      fontSize: 24, 
                      fontWeight: "600", 
                      color: "black",
                    }}
                  />
                  <div 
                    onClick={() => handleEdit(user.id, user.name, user.age, user.isMarried)}
                    style={{ 
                      fontSize: 14, 
                      fontStyle: "italic", 
                      backgroundColor: clickedEdit === user.id ? "#684e08" : "#114b08", 
                      color: "white",
                      borderRadius: "5px",
                      cursor: "pointer",
                      paddingBottom: "2px",
                      paddingTop: "2px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    { clickedEdit === user.id ? "Done?" : "Edit" }
                  </div>
                </div>

                <label htmlFor='age' style={{ fontSize: 20, fontWeight: "500", fontStyle: "italic", marginBottom: "10px" }}>
                  Age: 
                  <input 
                      placeholder={user.age} 
                      name="age" 
                      type="number" 
                      value={ clickedEdit === user.id ? updateUserData.age : user.age } 
                      disabled={ clickedEdit !== user.id }
                      onChange={handleDataChange} 
                      style={{ 
                        backgroundColor: "transparent", 
                        borderWidth: 0, 
                        fontSize: 20, 
                        fontWeight: "500", 
                        fontStyle: "italic", 
                        marginTop: "10px", 
                        color: "black",
                      }}
                    />
                </label>

                {
                  clickedEdit === user.id 
                  ? (
                      <label 
                        style={{ 
                          ...flexCenter,
                          fontSize: 20, 
                          fontWeight: "500", 
                          fontStyle: "italic", 
                          marginBottom: "10px",
                        }}
                      >
                        Married? 
                        <input 
                          type="checkbox"
                          name="isMarried"
                          checked={updateUserData.isMarried}
                          onChange={(e) => setUpdateUserData(prev => ({ ...prev, isMarried: e.target.checked }))}
                          style={{ width: "20px", height: "20px", marginLeft: "15px" }}
                        />
                      </label>
                  ) : (
                    <div style={{ fontSize: 20, fontWeight: "500", fontStyle: "italic", marginBottom: "10px" }}>
                      Married: {user.isMarried ? 'Yes' : 'No'}
                    </div>
                  )
                }
              </button>
            ))
          }
        </div>

        <div style={{ ...flexAroundStart }}>
          <div 
            style={{ ...flexColCenter, width: "100%", marginTop: 50 }}
          >
            <div style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
              Selected User:
            </div>
            {/* <hr style={{ marginTop: 20, width: "100%" }} /> */}
              { 
                getUserByIdLoading 
                ? (<div>........</div>) 
                : getUserByIdError 
                ? (<div>Error selecting id...</div>) 
                : (
                  <div 
                    style={{ 
                      ...flexColStart, 
                      fontSize: 22, 
                      fontWeight: "500", 
                      backgroundColor: 
                        Number(getUserByIdData.getUserById.id) % 4 === 0 ? "#00ffff50" 
                        : Number(getUserByIdData.getUserById.id) % 4 === 1 ? "#f7bf2650" 
                        : Number(getUserByIdData.getUserById.id) % 4 === 2 ? "#07206850" : "#09909850", 
                      borderRadius: "8px",
                      margin: "10px",
                      padding: "10px",
                      width: "200px",
                      borderWidth: "2px",
                      borderColor: "#2e0404",
                      borderStyle: "solid",
                    }}
                  >
                    <div style={{ width: "100%", textAlign: "left" }}>Name: { getUserByIdData.getUserById.name }</div>
                    <div style={{ width: "100%", textAlign: "left" }}>Age: { getUserByIdData.getUserById.age }</div>
                    <div style={{ width: "100%", textAlign: "left" }}>Married: { getUserByIdData.getUserById.isMarried ? "Yes" : "No"}</div>
                  </div>
                )
              }
          </div>

          <div style={{ ...flexColCenter, width: "100%", marginTop: 50 }}>
            <div style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
              Create User:
            </div>
            {/* <hr style={{ marginTop: 20, marginBottom: 20, width: "100%" }} /> */}
            <div style={{ ...flexColCenter, gap: "20px" }}>
              <input 
                style={{ 
                  width: "200px", 
                  height: "30px", 
                  backgroundColor: "#12345620", 
                  borderRadius: "10px"
                }} 
                placeholder='Your Name...' name='name' type='text' value={name} onChange={handleChange} />
              <input 
                style={{ 
                  width: "200px", 
                  height: "30px", 
                  backgroundColor: "#12345620", 
                  borderRadius: "10px"
                }} 
                placeholder='Your Age...' name='age' type='number' value={age} onChange={handleChange} />
              <button 
                style={{ 
                  width: "160px", 
                  height: "30px", 
                  backgroundColor: "#00881620", 
                  borderRadius: "10px"
                }} 
                onClick={handleCreateUser}>
                Create User
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App

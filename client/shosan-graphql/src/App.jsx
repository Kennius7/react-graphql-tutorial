import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { flexColCenter, flexColStart, GET_USERS, GET_USER_BY_ID, CREATE_USERS, flexCenter, flexAroundStart } from './data';



function App() {
  const [idData, setIdData] = useState("1");
  const [userData, setUserData] = useState({ name: "", age: 0, isMarried: false });
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

  const handleSelect = (id) => {
    console.log("Selected:", id);
    setIdData(id);
  }

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleCreateUser = async () => {
    console.log("Creating user...", userData);
    await createUser({ variables: { name, age: Number(age), isMarried }});
    window.location.reload();
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
        <div 
          style={{ 
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", 
            gap: "20px",
          }}
        >
          {
            getUsersData.getUsers.map((user) => (
              <button 
                style={{ backgroundColor: "#07800830", borderRadius: "8px" }} 
                onClick={() => handleSelect(user.id)} 
                key={user.id}
              >
                <h2>{user.name}</h2>
                <p>Age: {user.age}</p>
                <p>Married: {user.isMarried ? 'Yes' : 'No'}</p>
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
                      backgroundColor: "#07800830", 
                      borderRadius: "8px",
                      margin: "10px",
                      padding: "10px",
                      width: "200px",
                      borderWidth: "2px",
                      borderColor: "red",
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

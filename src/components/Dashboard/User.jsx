const User = ({user}) => {

    return (
      <div className="user">
        <h1>{user.uid}</h1>
        <h1>{user.displayName}</h1>
        <h1>{user.email}</h1>
      </div>
    )
  }
  
export default User
import React, { Component } from "react";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import Lost from "./LostComponent";

class AllUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      bisUser: false,
      currentUser: undefined,
    };
    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    UserService.getUsers().then((res) => {
      this.setState({ users: res.data });
    });

    const user = AuthService.getCurrentUser();
    console.log("Current user ", user);

    if (user) {
      this.setState({
        currentUser: user,
        businessUser: user.roles.includes("ROLE_BUSINESS"),
      });
    }
  }

  addUser() {
    this.props.history.push("/addUser");
  }

  updateUser(id) {
    this.props.history.push(`/update-user/${id}`);
  }

  render() {
    const { businessUser } = this.state;
    return (
      <div>
        <div className="row">
          {businessUser ? (
            <div>
              <h3 className="text-center">All Users</h3>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>User name</th>
                    <th>Password</th>
                    <th>Email</th>
                    {/* <th>Update</th> */}
                  </tr>
                </thead>

                <tbody>
                  {this.state.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.password}</td>
                      <td>{user.email}</td>
                      {/* <td>
                        <button
                          onClick={() => this.updateUser(user.id)}
                          className="btn btn-info"
                        >
                          Update
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Lost />
          )}
        </div>
      </div>
    );
  }
}

export default AllUserComponent;

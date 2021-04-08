import React, {Component} from 'react'
import StaffService from '../services/StaffService'
import AuthService from "../services/AuthService";
import Lost from './LostComponent';


class AllStaffComponent extends Component{
    constructor(props){
        super(props)

        this.state = {
            staff: [],
            bisUser: false,
            currentUser: undefined,
        }
        this.updateUser = this.updateUser.bind(this);
    }

     componentDidMount(){
         StaffService.getStaff().then((res) => {
             this.setState({staff:res.data})
             console.log(res.data)
         });

         const user = AuthService.getCurrentUser();
        console.log("Current user ", user)
    
        if (user) {
          this.setState({
            currentUser: user,
            businessUser: user.roles.includes("ROLE_BUSINESS"),
          });
        }
     }


    updateUser(id){
        this.props.history.push(`/update-user/${id}`);
    }

    assignTables(id){
        this.props.history.push(`/assignTables/${id}`);
    }



    render(){
        const { businessUser } = this.state;
        return(
            <div> 
                
                <div className = "row">{businessUser ? (
                    <div>
                         <h3 className="text-center">All Staff</h3>
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                            <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Assign tables</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.staff.map(
                                    staff =>
                                    <tr key = {staff.id}>
                                    <td>{staff.id}</td>
                                    <td>{staff.name}</td>
                                    <td>{staff.email}</td>
                                    <td><button onClick = {() => this.updateUser(staff.id)} className ="btn btn-info" >Update</button></td>
                                    <td><button onClick = {() => this.assignTables(staff.id)} className ="btn btn-info" >Assign tables</button></td>
                                </tr>
                                )
                            }
                        </tbody>

                    </table></div>):<Lost/>}
                </div>
                
            </div>
            

        )
           
        }
    }


export default AllStaffComponent
import React, { Component } from 'react';
import { Bar,Line,Pie } from 'react-chartjs-2';
import ItemService from '../services/ItemService'
import AuthService from "../services/AuthService";

class BisAnalyticsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: [],
            chartData:{
                labels:[],
                datasets:[
                    {
                        label: '',
                        data:[],
                        backgroundColor:[ ]
                    }
                ]
            }
        }   
    }

    test(){
        ItemService.getFoodItems().then((res) => {
            this.setState({item: res.data})
            // this.setState({chartData:{labels: this.state.item.map(item => item.name)}})
            

            // this.setState({ labels:this.state.item.map(
            //     item => item.name) })
            console.log("Item names change ", this.state.item.map(item => item.name))
            //console.log("Current user ", user);
            console.log("Prices ",this.state.item.map(item => item.price))
           
        });
    }

    componentDidMount() {
        ItemService.getFoodItems().then((res) => {
            this.setState({ item: res.data })
            console.log("Item names new ", this.state.item.map(item => item.name))
            //console.log("Current user ", user);
            console.log("Stock new ",this.state.item.map(item => item.stock))
            this.setState({
            
                chartData:{
                    
                    labels:this.state.item.map(item => item.name),
                    datasets:[
                        {
                            label: 'Food items sold',
                            data:this.state.item.map(item => item.stock),
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(255, 99, 132, 0.6)'
                            ]
                        }
                    ]
                    
                }
            })
        });
        // ItemService.getFoodItems().then((res) => {
        //     this.setState({item: res.data})
        //     // this.setState({chartData:{labels: this.state.item.map(item => item.name)}})
            

        //     // this.setState({ labels:this.state.item.map(
        //     //     item => item.name) })
        //     console.log("Item names change ", this.state.item.map(item => item.name))
        //     console.log("Current user ", user);
        //     console.log("Prices ",this.state.item.map(item => item.price))
           
        // });
        
        //this.test();
        console.log("Item names cdm ", this.state.item.map(item => item.name))
       
        console.log("Prices cdm ",this.state.item.map(item => item.name))

        // this.setState({
            
        //     chartData:{
                
        //         labels:[this.state.item.map(item => item.name)],
        //         datasets:[
        //             {
        //                 label: 'Food items',
        //                 data:[
        //                     this.state.item.map(items => items.price)
        //                 ],
        //                 backgroundColor:[
        //                     'rgba(255, 99, 132, 0.6)',
        //                     'rgba(54, 162, 235, 0.6)',
        //                     'rgba(255, 206, 86, 0.6)',
        //                     'rgba(75, 192, 192, 0.6)',
        //                     'rgba(153, 102, 255, 0.6)',
        //                     'rgba(255, 159, 64, 0.6)',
        //                     'rgba(255, 99, 132, 0.6)'
        //                 ]
        //             }
        //         ]
        //     }
        // })
        
        const user = AuthService.getCurrentUser();
        console.log("Current user ", user);
        if (user) {
            this.setState({
                currentUser: user,
                businessUser: user.roles.includes("ROLE_BUSINESS"),
            });
        }
        
      
    }

 
    
    render() {
        return (
            <div className = "chart">
                <Bar
                    data={this.state.chartData}
                    options ={{
                        maintainAspectRatio: false
                    }}
                    />
            </div>
        )
    }

}

export default BisAnalyticsComponent
import CustomerChartLine from 'components/CustomerChartLine';
import CustomerChartBar from 'components/CustomerChartBar';
import PromotionChartLine from 'components/PromotionChartLine';
import PromotionChartPie from 'components/PromotionChartPie';
import PageVisitsCard from 'components/PageVisitsCard';
import TrafficCard from 'components/TrafficCard';

import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService.js'
import CustomerService from '../services/CustomerService.js'
import PromotionService from '../services/PromotionService.js'
import PromotionEmailService from '../services/PromotionEmailService.js'
import ProfileService from '../services/ProfileService.js'

class Dashboard extends Component {
	
    constructor(props) {
        
        super(props)

        this.state = {
			barColor: 'white',
			progressDataSet1:false,
			progressDataSet2:false,
			customerSize: 0,
            promotionSize: 0,
			profileSize: 0,
			emailSize: 0
        }

		this.handleSubmit = this.handleSubmit.bind(this);
    }

   	componentDidMount() {
        console.log('componentDidMount')
        this.refreshCustomers();
        console.log(this.state)
    }

    refreshCustomers() {
	
        let username = AuthenticationService.getLoggedInUserName()
        
		CustomerService.retrieveAllCustomers(username)
            .then(
                response => {
                    this.setState({ customers: response.data })
					this.setState({ customerSize: this.state.customers.length })
                }
            )

		PromotionService.retrieveAllPromotions(username)
            			.then(
                			response => {
                   				this.setState({ promotionSize: response.data.length })
                		}
            		)

		ProfileService.retrieveAllProfiles(username)
            					.then(
                				response => {
                    				this.setState({ profileSize: response.data.length })

                				}
           					  );

		PromotionEmailService.retrieveAllPromotionEmailss(username)
            .then(
                response => {
                    this.setState({ emailSize: response.data.length})
                }
            )
    }

    handleSubmit(event) {

  	}

    render() {


    return (
        <>
            <div className="bg-light-blue-500 px-3 md:px-8 h-10" />

			<div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <CustomerChartLine />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <CustomerChartBar />
                        </div>
                    </div>
                </div>
            </div>

			<div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <PromotionChartLine />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-2 mb-14">
                            <PromotionChartPie />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <PageVisitsCard />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <TrafficCard />
                        </div>
                    </div>
                </div>
            </div>

         </>

        )
    }
}

export default Dashboard
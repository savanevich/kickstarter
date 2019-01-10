import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { Router } from '../../routes';

import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNewIndex extends Component {
    state = {
        minimumContribution: 0,
        errorMessage: '',
        loading: false,
    };

    onSubmit = async (event) => {
        event.preventDefault();

        try {
            this.setState({ loading: true, errorMessage: '' });

            const accounts = await web3.eth.getAccounts();

            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0],
                });
            Router.pushRoute('/');
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ loading: false });
    }
    
    render() {
        return (
            <Layout>
                <h1>Create a Campaign</h1>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            type='number'
                            label='wei' 
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({minimumContribution: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNewIndex;
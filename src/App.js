import React from 'react';
import styles from './App.module.css'

import { Cards, Chart, CountryPicker } from './components';
import covidImage from './assets/images/COVID-19_ icon.jpeg';
import { fetchData } from './api';
import { Spinner } from 'react-bootstrap';

class App extends React.Component {
    state = {
        data: null,
        country: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country })
    }

    render() {
        const { data, country } = this.state;

        if(!this.state.data) {
            return (
                <div className={styles.loader}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        return (
            <div className={styles.container}>
                <img src={covidImage} alt="COVID-19" className={styles.image} />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;
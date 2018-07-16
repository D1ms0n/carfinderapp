import React, { Component } from 'react';
import Select from 'react-select';

import config from './../../configs';
import messages from '../../services/messages';
import ApiService from './../../services/api';
import serialize from './../../services/serialize';

import Results from './../results';

class Form extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            selectedManufacturer: '',
            selectedModel: '',
            selectedYearMin: '',
            selectedYearMax: '',
            selectedMileageMin: '',
            selectedMileageMax: '',
            yearOptions: [],
            manufacturerOptions: [],
            modelOptions: [],
            result: ''
        }
        this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
        this.handleChangeYearMin = this.handleChangeYearMin.bind(this);
        this.handleChangeYearMax = this.handleChangeYearMax.bind(this);
        this.handleChangeMileageMin = this.handleChangeMileageMin.bind(this);
        this.handleChangeMileageMax = this.handleChangeMileageMax.bind(this);
        this.fillYearOptions = this.fillYearOptions.bind(this);
        this.fillInputs = this.fillInputs.bind(this);
        this.createSnoop = this.createSnoop.bind(this);
        this.fillModelOptions = this.fillModelOptions.bind(this);
        this.fillManufacturerOptions = this.fillManufacturerOptions.bind(this);
        this.fillUrl = this.fillUrl.bind(this);
        this.checkValues = this.checkValues.bind(this);
    }   
    handleChangeManufacturer(selectedManufacturer){
        this.setState({ 
            selectedManufacturer 
        });    
    }
    handleChangeModel(selectedModel){
        this.setState({ 
            selectedModel 
        });
    }
    handleChangeYearMin(selectedYearMin){
        this.setState({ 
            selectedYearMin 
        });
    }
    handleChangeYearMax(selectedYearMax){
        this.setState({ 
            selectedYearMax 
        });
    }
    handleChangeMileageMin(selectedMileageMin){
        this.setState({ 
            selectedMileageMin 
        });
    }
    handleChangeMileageMax(selectedMileageMax){
        this.setState({ 
            selectedMileageMax 
        });
    }
    fillYearOptions(){
        const currYear = new Date;
        let years = [];
        for ( let i = 1960; i <= currYear.getFullYear() ; i++ ){
            const yearOtion = { value: i, label: i };
            years.push(yearOtion);
        }
        this.setState({
            yearOptions : years
        })
    }
    fillManufacturerOptions(){
        let manufacturers = [];
        let manufacturersValues = ['Toyota','Ford','Chevrolet','Nissan','Hyundai','KIA','Mercedes-Benz','BMW','Opel',
        'Mazda','Volkswagen','Citroen','Volvo','Skoda','landrover','Renault','Honda','datsun','Mitsubishi','Audi',
        'jeep','LADA','УАЗ','Peugeot','Daewoo','Lexus','Subaru','Suzuki','Infiniti','Fiat','Chery','Lifan'];
        for ( let i = 0; i <= manufacturersValues.length ; i++ ){
            const manufacturerOption = { value: manufacturersValues[i], label: manufacturersValues[i] };
            manufacturers.push(manufacturerOption);
        }
        this.setState({
            'manufacturerOptions' : manufacturers
        })
    }
    fillModelOptions(){
        let models = [];
        let modelsValues = ['Toyota','Ford','Chevrolet','Nissan','Hyundai','KIA','Mercedes-Benz','BMW','Opel',
        'Mazda','Volkswagen','Citroen','Volvo','Skoda','landrover','Renault','Honda','datsun','Mitsubishi','Audi',
        'jeep','LADA','УАЗ','Peugeot','Daewoo','Lexus','Subaru','Suzuki','Infiniti','Fiat','Chery','Lifan'];
        for ( let i = 0; i <= modelsValues.length ; i++ ){
            const modelsOtion = { value: modelsValues[i], label: modelsValues[i] };
            models.push(modelsOtion);
        }
        this.setState({
            'modelOptions' : models
        })
    }
    fillInputs(){
        const params = window.location.search;
        if ( params.length > 0 ){
            const paramItem = params.slice(1).split('&');
            for ( let i=0; i<paramItem.length; i++ ){
                let paramName = paramItem[i].split('=')[0];
                let paramVal = paramItem[i].split('=')[1];
                switch (paramName){
                    case 'manufacturer':
                        this.setState({'selectedManufacturer':{value: paramVal, label: paramVal}});
                        break;
                    case 'model':
                        this.setState({'selectedModel':{value: paramVal, label: paramVal}});
                        break;
                    case 'year_min':
                        this.setState({'selectedYearMin':{value: paramVal, label: paramVal}});
                        break;
                    case 'year_max':
                        this.setState({'selectedYearMax':{value: paramVal, label: paramVal}});
                        break;
                    case 'mileage_min':
                        document.getElementById('m_min').value = paramVal;
                        break;
                    case 'mileage_max':
                        document.getElementById('m_max').value = paramVal;
                        break;
                }
            }
        }
    }
    fillUrl(){
        const form = document.getElementById('createSnoopForm');
        history.replaceState('','', `/?${serialize(form)}`);
    }
    checkValues(val1,val2){
        let filteredVals ;
        filteredVals =  ( val1.length === 0 || val2.length === 0 ? [val1,val2] : ( val1 > val2 ? [val2,val1] : [val1,val2] ) );
        document.getElementById('m_min').value = filteredVals[0];
        document.getElementById('m_max').value = filteredVals[1];
        return filteredVals;
    }
    createSnoop(event){
        event.preventDefault(); 
        event.stopPropagation();

        const form = document.getElementById('createSnoopForm');
        let searchParams= {};

        const mileageVal = this.checkValues(form.elements.mileage_min.value, form.elements.mileage_max.value);

        searchParams.manufacturer = ( form.elements.manufacturer ? form.elements.manufacturer.value : '');
        searchParams.model = ( form.elements.model ? form.elements.model.value : '');
        searchParams.year_min = ( form.elements.year_min ? form.elements.year_min.value : '');
        searchParams.year_max = ( form.elements.year_max ? form.elements.year_max.value : '');
        searchParams.mileage_min = ( form.elements.mileage_min ? mileageVal[0] * 1000 : '');
        searchParams.mileage_max = ( form.elements.mileage_max ? mileageVal[1] * 1000 : '');

        const apiService = new ApiService();
        apiService.postRequest(config().snoops,JSON.stringify(searchParams))
            .then((result) => {
                this.setState({
                    'result' : result
                })
                this.fillUrl();
                console.log(result);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    componentDidMount(){
        this.fillYearOptions();
        this.fillModelOptions();
        this.fillManufacturerOptions();
        this.fillInputs();
    }
    render() {
        const { selectedTestmultiple } = this.state;
        const { selectedManufacturer } = this.state;
        const { selectedModel } = this.state;
        const { selectedYearMin } = this.state;
        const { selectedYearMax } = this.state;
        const { selectedMileageMin } = this.state.selectedMileageMin;
        const { selectedMileageMax } = this.state.selectedMileageMax;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5">            
                        <form className="form" id="createSnoopForm" onSubmit={this.createSnoop} >

                            <label>{messages.messages.manufacturer}</label>
                            <Select
                                className="select"
                                name="manufacturer"
                                value={selectedManufacturer}
                                onChange={this.handleChangeManufacturer}
                                options={this.state.manufacturerOptions}
                            /> 

                            <label>{messages.messages.model}</label>
                            <Select
                                className="select"
                                name="model"
                                value={selectedModel}
                                onChange={this.handleChangeModel}
                                options={this.state.modelOptions}
                            />

                            <label>{messages.messages.year}</label>
                            <Select
                                className="select left"
                                name="year_min"
                                value={selectedYearMin}
                                onChange={this.handleChangeYearMin}
                                options={this.state.yearOptions}
                            />
                            <Select
                                className="select right"
                                name="year_max"
                                value={selectedYearMax}
                                onChange={this.handleChangeYearMax}
                                options={this.state.yearOptions}
                            />

                            <label>{messages.messages.mileage}</label>
                            <div className="input_wrap left">
                                <input id="m_min" name="mileage_min" value={selectedMileageMin}
                                    onChange={this.handleChangeMileageMin} className="input miles" type="number" />
                                <label htmlFor="m_min" className="miles">000 {messages.messages.km}</label>        
                            </div>
                            <div className="input_wrap right">
                                <input id="m_max" name="mileage_max" value={selectedMileageMax}
                                    onChange={this.handleChangeMileageMax} className="input miles" type="number" />
                                <label htmlFor="m_max" className="miles">000 {messages.messages.km}</label>
                            </div>

                            <input className="input submit" type="submit" value={messages.messages.submit} />

                        </form>        
                    </div>
                    <div className="col-md-7">
                        <Results items={this.state.result} />
                    </div>            
                </div>
            </div>
        );
    }
}

export default Form;

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import { formValues } from 'redux-form';

class StreamEdit extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        console.log(formValues,"formValues")
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    //first set of curly braces indicates we are writing js expresson and secon indicates js object
                initialValues={_.pick(this.props.stream,'title','description')} 
                onSubmit={this.onSubmit}/>
            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.stream[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
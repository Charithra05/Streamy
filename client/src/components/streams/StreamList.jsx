import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){
        console.log(stream.userId,"userId");
        console.log(stream,"stream");
        if(!this.props.currentUserId) return
        if(stream.userId === this.props.currentUserId.Da){
            return (
                <div className="right floated content" style={{margin:'12px'}}>
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList(){
        console.log(this.props.currentUserId,"currentuser");
        return this.props.streams.map(stream =>{
            return(
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header" style={{fontSize:'20px',margin:'10px'}}>{stream.title}</Link> 
                        <div style={{fontSize:'20px',margin:'10px'}} className="description">{stream.description}</div>
                        
                    </div>
                </div>
            );
        });
    }

    renderCreate(){
        if(this.props.isSignedIn){
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
            <h1 style={{color:'teal',textAlign:'center',fontSize:'30px'}}>Streams </h1>
            <div className="ui celled list"> 
            {this.renderList()}
            </div>
            {this.renderCreate()}
        </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        streams:Object.values(state.stream),
        currentUserId:state.auth.userId,
        isSignedIn:state.auth.isSignedIn
    };
}
export default connect(mapStateToProps,{fetchStreams})(StreamList)
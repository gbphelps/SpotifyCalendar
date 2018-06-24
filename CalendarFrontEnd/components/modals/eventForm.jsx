import React from 'react';
import { connect } from 'react-redux';
import MiniCal from '../smallCal';
import { format } from '../../utils/date';
import Time from '../time';



export default class Form extends React.Component{
  constructor(props){
    super(props);
    //TODO pass all of this as a single pre-made object. this.state = event;
    this.state = {
      start: this.props.start,
      end: this.props.end,
      title: this.props.title,
      location: this.props.location,
      description: this.props.description,
      activeCal: null,
      id: this.props.id
    }
    this.set = this.set.bind(this)
  }

  set(attr){
    return val => {
      if ((attr === 'end' && val < this.state.start)||
           (attr === 'start' && val > this.state.end)){
        this.setState({
          start: val,
          end: val,
          activeCal: null
        })
      }else{
        this.setState({[attr]: val, activeCal: null})
      }
    }
  }

  toggleCal(cal){
    this.state.activeCal === cal ?
    this.setState({activeCal: null}) :
    this.setState({activeCal: cal})
  }

  handleSubmit(){
    this.props.createOrUpdate(this.state);
    this.props.toggle();
  }

  dateSetter(attr){
    return(
      <div className='date-bar'>
        <div className='date-title'>{attr}:</div>

        <div className='date-selector' onClick={()=>this.toggleCal(attr)}>
          <i className="far fa-calendar-alt"/>
          &nbsp; {format(this.state[attr])}
          {this.state.activeCal === attr ?
            <MiniCal date={this.state[attr]} set={this.set(attr)}/> :null}
        </div>

        &nbsp;at&nbsp;

        <Time
          date={this.state[attr]}
          set={this.set(attr)}/>
    </div>
    )
  }

  update(field){
    return e => this.setState({[field]: e.target.value})
  }

  render(){
    return(
      <div>
        <div className='screen' onClick={this.props.toggle}/>
        <form>
          <div className='close'>

            {this.props.formType === 'Edit' ?
              <i className='fas fa-trash'
                onClick={()=>{
                  this.props.deleteEvent(this.state.id);
                  this.props.toggle()
                }}/> :
                null}
          <i className="fas fa-times-circle"
             onClick={this.props.toggle}></i>
         </div>

           <h1>{this.props.formType} Event</h1>

             {this.dateSetter('start')}
             {this.dateSetter('end')}

             <div style={{margin:'10px',width:'100%'}}>
               <div className='date-bar'>
                 <div>Title:</div>
                 <input
                   value={this.state.title}
                   onChange={this.update('title')}
                   style={{width: '100%'}}/>
               </div>

               <div className='date-bar'>
                 <div>Location:</div>
                 <input
                   value={this.state.location}
                   onChange={this.update('location')}
                   style={{width: '100%'}}/>
               </div>
             </div>

             <div className='date-bar description'>
               <div className='date-title'>Description:</div>
               <textarea onChange={this.update('description')} value={this.state.description}/>
             </div>

             <div
               className='modal-button'
               onClick={()=>this.handleSubmit()}>{this.props.formType} Event</div>

        </form>
      </div>
    )
  }
}

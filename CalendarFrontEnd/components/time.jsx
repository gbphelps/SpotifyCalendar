import React from 'react';



function format(num){
  if (num < 10) return '0' + num;
  return num;
}


export default class Time extends React.Component{
  constructor(props){
    super(props);
    this.state={
      hour: this.hour(props),
      minute: this.props.date.getMinutes(),
      suffix: this.suffix(props)
    }
  }

  hour(props){
    const fullHour = props.date.getHours();
    if ( fullHour === 0) return 12;
    const h = (fullHour > 12 ? fullHour - 12 : fullHour);
    return h;
  }

  suffix(props){
    const h = props.date.getHours();
    return ( h >= 12 ? 'pm' : 'am' )
  }


  updateTime(){
    let hour = this.state.hour % 12;
    if (this.state.suffix === 'pm') hour += 12;
    const date = new Date(this.props.date.valueOf());
    date.setHours(hour,this.state.minute);
    this.props.set(date);
  }

  setHours(e){
    const target = e.currentTarget;
    const current = +target.value;
    if (Number.isNaN(current) || current > 12) return;
    this.setState({hour: current},()=>{
      if (current > 1) target.nextElementSibling.select();
    });
  }

  setMins(e){
    const target = e.currentTarget;
    const current = +target.value;
    if (Number.isNaN(current) || current > 60) return;
    this.setState({minute: current},() => {
      if (current > 5) target.nextElementSibling.select();
    });
  }

  setSuffix(e){
    const target = e.currentTarget;
    const current = target.value;

    let suffix;
    if (current === 'a'){suffix = 'am';}
    else if (current === 'p'){suffix = 'pm';}
    else {return;}

    this.setState({ suffix }, ()=>{
      target.blur();
    })
  }

  componentWillReceiveProps(nextProps){
    if (this.props.date.valueOf() !== nextProps.date.valueOf()){
      this.setState({
        hour: this.hour(nextProps),
        minute: nextProps.date.getMinutes(),
        suffix: this.suffix(nextProps)
      })
    }
  }

  render(){
    return (
      <div style={{display:'flex', alignItems:'center'}}>
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setHours(e)}
          onBlur={()=>this.updateTime()}
          value={format(this.state.hour)}/>:
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setMins(e)}
          onBlur={()=>this.updateTime()}
          value={format(this.state.minute)}/>
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setSuffix(e)}
          onBlur={()=>this.updateTime()}
          value={this.state.suffix}/>
      </div>
    );
  }
}

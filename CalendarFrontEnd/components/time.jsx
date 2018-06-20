import React from 'react';



export default class Time extends React.Component{
  constructor(props){
    super(props);
  }

  minute(){
    const m = this.props.date.getMinutes();
    if (m < 10) return '0' + m;
    return m;
  }

  hour(){
    const h = (this.props.date.getHours() - 1) % 12 + 1;
    if (h < 10) return '0' + h;
    return h;
  }

  suffix(){
    const h = this.props.date.getHours();
    return ( h >= 12 ? 'pm' : 'am' )
  }

  setHours(e){
    const current = +e.currentTarget.value;
    const h = this.props.date.getHours();
    const date = new Date(this.props.date.valueOf());

    if (current > 1){e.currentTarget.nextElementSibling.select();}
    if (Number.isNaN(current) || current > 12) return;

    const newhours = current % 12 + (h >= 12 ? 12 : 0);
    date.setHours(newhours);
    this.props.set(date);
  }

  setMins(e){
    const current = +e.currentTarget.value;
    const date = new Date(this.props.date.valueOf());

    if (current > 5){e.currentTarget.nextElementSibling.select();}
    if (Number.isNaN(current) || current > 60) return;
    date.setMinutes(current);
    this.props.set(date);
  }

  setSuffix(e){
    const h = this.props.date.getHours();
    const current = e.currentTarget.value;
    const date = new Date(this.props.date.valueOf());

    if (current === 'p' && h < 12){
      date.setHours(h + 12);
      this.props.set(date);
    }
    if (current === 'a' && h >= 12){
      date.setHours(h - 12);
      this.props.set(date);
    }
    e.currentTarget.blur();
  }

  render(){
    return (
      <div style={{display:'flex', alignItems:'center'}}>
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setHours(e)}
          value={this.hour()}/>:
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setMins(e)}
          value={this.minute()}/>
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setSuffix(e)}
          value={this.suffix()}/>
      </div>
    );
  }
}

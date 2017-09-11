import React, { PureComponent } from 'react'
import R from 'ramda'


class Form extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      amount: null,
      from: R.find(R.equals('EUR'), props.currencies),
      to: R.find(R.equals('CZK'), props.currencies),
    }
  }

  handleConvert = () => {
    const {
      from,
      to,
      amount,
    } = this.state

    this.props.convert({
      from,
      to,
      amount,
    })
    this.setState({ amount: null })
  }

  handleChangeFrom = (ev) => {
    this.setState({ from: ev.target.value })
  }

  handleChangeTo = (ev) => {
    this.setState({ to: ev.target.value })
  }

  handleChangeAmount= (ev) => {
    this.setState({ amount: ev.target.value })
  }

  render() {
    const {
      converted,
      currencies,
    } = this.props

    return (
      <div>
        <span>from</span>
        <select id="from" onChange={this.handleChangeFrom} value={this.state.from}>
          {R.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ), currencies)}
        </select>

        <span>to</span>
        <select id="to" onChange={this.handleChangeTo} value={this.state.to}>
          {R.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ), currencies)}
        </select>

        <input type="number" onChange={this.handleChangeAmount} placeholder="money to convert" value={this.state.amount || ''}/>

        <button onClick={this.handleConvert}>convert!</button>
        <div>
          <span>converted amount:</span>
          {converted && <span>{`${converted.amount} ${converted.currency}`} </span>}
        </div>
      </div>
    )
  }
}

export default Form
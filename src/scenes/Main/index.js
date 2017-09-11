import React, { Component } from 'react'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from './services/actions'
import * as selectors from './services/'
import { Form } from './components/'

const Error = Styled.span`
  color: red;
`

class Main extends Component {

  componentWillMount() {
    this.props.fetch()
  }

  render() {
    const {
      data,
      isLoaded,
      isError,
      convert,
      converted,
      currencies,
      getError,
    } = this.props;

    if (isError) {
      return <span>Error - {getError.message}</span>
    }
    if (!isLoaded) {
      return <span>Loading</span>
    }
    return (
      <div>
        {data.mostPopularCurrency && (
          <div>
            <div>most popuplar count: {data.mostPopularCurrency.count}</div>
            <div>most popuplar currency: {data.mostPopularCurrency.currency}</div>
          </div>
        )}
        <div>total in usd: {data.totalInUSD}</div>
        <div>number of transaction: {data.transactionsCount}</div>
        <Form
          convert={convert}
          converted={converted}
          currencies={currencies}
          changeFrom={this.handleChangeFrom}
          changeTo={this.handleChangeTo}
          changeAmount={this.handleChangeAmount}
        />
        {getError && (
          <Error>Error - {getError}</Error>
        )}

      </div>
    )
  }
}


export default connect(state => ({
  data: selectors.getData(state),
  currencies: selectors.getCurrencies(state),
  converted: selectors.getConverted(state),
  isInit: selectors.isInit(state),
  isLoading: selectors.isLoading(state),
  isLoaded: selectors.isLoaded(state),
  isError: selectors.isError(state),
  getError: selectors.getError(state),
}), {
  fetch: actions.fetchData,
  convert: actions.convertCurrency,
})(Main)
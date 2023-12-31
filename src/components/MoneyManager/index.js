import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updateTransactionsList = transactionsList.filter(
      eachTrasnsaction => id !== eachTrasnsaction.id,
    )
    this.setState({transactionsList: updateTransactionsList})
  }

  onAddButton = event => {
    event.preventDefault()
    const {amountInput, titleInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTrasnsaction => eachTrasnsaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  getTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpense = () => {
    const {transactionsList} = this.state
    let expenseAmount = 0

    transactionsList.forEach(eachTrasnsaction => {
      if (eachTrasnsaction.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTrasnsaction.amount
      }
    })
    return expenseAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTrasnsaction => {
      if (eachTrasnsaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrasnsaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expenseAmount = 0

    transactionsList.forEach(eachTrasnsaction => {
      if (eachTrasnsaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrasnsaction.amount
      } else {
        expenseAmount += eachTrasnsaction.amount
      }
    })
    balanceAmount = incomeAmount - expenseAmount
    return balanceAmount
  }

  render() {
    const {transactionsList, amountInput, titleInput, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpense()

    return (
      <div className="bg-cont">
        <div className="money-manager-cont">
          <div className="welcome-cont">
            <h1 className="head">Hi, Sravan</h1>
            <p className="para">
              Welcome back to your <span className="span">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
          />
          <div className="transaction-cont">
            <form className="myForm" onSubmit={this.onAddButton}>
              <h1 className="form-heading">Add Transaction</h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                value={titleInput}
                onChange={this.getTitle}
                placeholder="TITLE"
                type="text"
                className="input"
                id="title"
              />

              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                value={amountInput}
                onChange={this.getAmount}
                placeholder="AMOUNT"
                type="text"
                className="input"
                id="amount"
              />

              <label htmlFor="select" className="input-label">
                TYPE
              </label>
              <select
                value={optionId}
                onChange={this.onChangeOptionId}
                id="select"
                className="input"
              >
                {transactionTypeOptions.map(eachOption => (
                  <option value={eachOption.optionId} key={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>

              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <div className="history-cont">
              <h1 className="history-head">History</h1>
              <div className="table-cont">
                <ul className="table">
                  <li className="table-head">
                    <p className="table-cell">Title</p>
                    <p className="table-cell">Amount</p>
                    <p className="table-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTrasnsaction => (
                    <TransactionItem
                      key={eachTrasnsaction.id}
                      transactionDetails={eachTrasnsaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

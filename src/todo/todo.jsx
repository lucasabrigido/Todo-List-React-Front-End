import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {

    constructor(props){
        super(props)
        this.state = {description:'', list: []}
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPadding = this.handleMarkAsPadding.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp=>{
                this.setState({...this.state, description, list: resp.data})
            })
    }

    handleSearch(){
        this.refresh(this.state.description)
    }
    handleClear(){
        this.refresh()
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

	handleAdd(){
		console.log(this.state.description)
        const description = this.state.description
        axios.post(URL,{description})
        .then(resp=> this.refresh())
	}

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(resp=> this.refresh(this.state.description))
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`,{...todo, done: true})
            .then(resp=>this.refresh(this.state.description))
    }
   handleMarkAsPadding(todo){
        axios.put(`${URL}/${todo._id}`,{...todo, done: false})
            .then(resp=>this.refresh(this.state.description))
    }
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'/>
                <TodoForm  description={this.state.description} handleClear={this.handleClear} handleSearch={this.handleSearch} handleChange={this.handleChange} handleAdd={this.handleAdd}/>
                <TodoList list={this.state.list} handleMarkAsPadding={this.handleMarkAsPadding} handleMarkAsDone={this.handleMarkAsDone} handleRemove={this.handleRemove} />
            </div>
        )
    }
}
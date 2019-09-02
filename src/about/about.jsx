import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'

/**export default class About extends Component{
    render(){

    }
}**/

export default props =>(
    <div>
        <PageHeader name='Sobre' small='Nós' />
        <h2>Desenvolvedor</h2>
        <p>Lucas Araújo Brígido</p>
        <h2>Formação</h2>
        <p>Cursando Ciências da Computação no IFCE</p>
        <h2>Finalidade do Projeto</h2>
        <p>Estudo de React</p>
    </div>
)
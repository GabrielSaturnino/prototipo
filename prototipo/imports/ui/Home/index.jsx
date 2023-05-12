import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/task';
import { Link } from 'react-router-dom';

export default function Home() {
  const user = Meteor.user();
  const firstName = user.username.split(' ');

  // Tasks publicas
  const totalTask = useTracker(() => TasksCollection.find({ tipo: 'Publica' }).count());
  const totalTaskAndamento = useTracker(() =>
    TasksCollection.find({ tipo: 'Publica', situation: 'Iniciada' }).count());

  const totalTaskConcluida = useTracker(() =>
    TasksCollection.find({ tipo: 'Publica', situation: 'Finalizada' }).count());

  // Tasks pessoais
  const totalTaskPessoal = useTracker(() =>
    TasksCollection.find({ createdBy: user._id }).count());

  const totalTaskAndamentoPessoal = useTracker(() =>
    TasksCollection.find({ createdBy: user._id, situation: 'Iniciada' }).count());

  const totalTaskConcluidaPessoal = useTracker(() =>
    TasksCollection.find({ createdBy: user._id, situation: 'Finalizada' }).count());

  return (
    <main>
      <div>
        <h1>Bem vindo {firstName[0]}</h1>
        <p>Temos {totalTask} tarefas criadas!</p>
        <p>Temos {totalTaskAndamento} tarefas em andamento!</p>
        <p>Temos {totalTaskConcluida} tarefas concluidas!</p>
      </div>

      <div>
        <h2>Suas tarefas pessoais:</h2>
        <p>Tarefas pessoais criadas: {totalTaskPessoal}</p>
        <p>Tarefas pessoais em andamento: {totalTaskAndamentoPessoal}</p>
        <p>Tarefas pessoais concluidas: {totalTaskConcluidaPessoal}</p>
      </div>

      <Link to={'/main/tasks'}>Visualizar Tarefas</Link>
    </main>
  );
}
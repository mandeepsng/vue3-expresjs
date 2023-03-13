<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div>
    <h1>Tasks</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTaskTitle">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      newTaskTitle: '',
      url: 'http://localhost:3000',
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios.get(url+'/api/tasks')
        .then(response => {
          this.tasks = response.data;
          console.log(response.data);
        });
    },
    addTask() {
      axios.post(url+'/api/tasks', {
        title: this.newTaskTitle,
      })
        .then(response => {
          this.tasks.push(response.data);
          this.newTaskTitle = '';
        });
    },
    deleteTask(taskId) {
      axios.delete(url+`/api/tasks/${taskId}`)
        .then(() => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        });
    },
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

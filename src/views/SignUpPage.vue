<template>
  <div class="signup-page">
    <h2 class="signup-title">Реєстрація</h2>
    <form class="signup-form">
      <div class="form-group">
        <label for="name" class="form-label">Ім'я</label>
        <input type="text" id="name" class="form-input" v-model="name" />
      </div>

      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-input" v-model="email" />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Пароль</label>
        <input
          type="password"
          id="password"
          class="form-input"
          v-model="password"
        />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Повторіть пароль</label>
        <input
          type="password"
          id="password"
          class="form-input"
          v-model="password"
        />
      </div>

      <BaseButton class="signup-button">Зареєструватися</BaseButton>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.signup-page {
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
}

.signup-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.signup-form {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.signup-button {
  background-color: #ff5722;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background-color: #e64a19;
}
</style>

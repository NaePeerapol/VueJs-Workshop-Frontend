<template>
  <v-container fluid fill-height class="centered-container">
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md4>
        <v-card elevation="10">
          <v-card-title class="justify-center headline">
            โปรแกรมคำนวณเกรด
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="calculateGrade">
              <v-text-field
                v-model="score"
                label="กรอกคะแนน (0-100)"
                type="number"
                :rules="scoreRules"
                required
                outlined
                dense
              ></v-text-field>

              <v-btn color="primary" block type="submit" large>
                คำนวณเกรด
              </v-btn>
            </v-form>

            <v-alert v-if="grade" :color="gradeColor" class="mt-4" outlined>
              คะแนน: {{ score }} เกรด: {{ grade }}
            </v-alert>

            <v-alert v-if="errorMessage" type="error" class="mt-4" outlined>
              {{ errorMessage }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      score: null,
      grade: null,
      errorMessage: "",
      scoreRules: [
        (v) => !!v || "กรุณากรอกคะแนน",
        (v) => (v >= 0 && v <= 100) || "คะแนนต้องอยู่ระหว่าง 0-100",
      ],
    };
  },
  computed: {
    gradeColor() {
      const gradeColors = {
        A: "success",
        B: "info",
        C: "warning",
        D: "orange",
        F: "error",
      };
      return gradeColors[this.grade] || "primary";
    },
  },
  methods: {
    calculateGrade() {
      this.errorMessage = "";

      if (this.score === null) {
        this.errorMessage = "กรุณากรอกคะแนน";
        this.grade = null;
        return;
      }

      const score = Number(this.score);

      if (score >= 80 && score <= 100) {
        this.grade = "A";
      } else if (score >= 70 && score < 80) {
        this.grade = "B";
      } else if (score >= 60 && score < 70) {
        this.grade = "C";
      } else if (score >= 50 && score < 60) {
        this.grade = "D";
      } else if (score >= 0 && score < 50) {
        this.grade = "F";
      } else {
        this.errorMessage = "กรุณากรอกคะแนนระหว่าง 0 - 100";
        this.grade = null;
      }
    },
  },
};
</script>

<style scoped>
.centered-container {
  height: 100vh;
  background: linear-gradient(135deg, #65f6f4 0%, #00566b 100%);
}
</style>
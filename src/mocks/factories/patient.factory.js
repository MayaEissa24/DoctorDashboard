import { Factory } from "miragejs";

const FIRST_NAMES = ["Mariam", "Hassan", "Yara", "Ali", "Dina", "Mostafa", "Hana", "Ziad"];
const LAST_NAMES = ["Farouk", "Nabil", "Adel", "Samir", "Fouad", "Lotfy", "Hegazy", "Shawky"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const patientFactory = Factory.extend({
  fullName(i) {
    return `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[i % LAST_NAMES.length]}`;
  },
  email(i) {
    return `patient.${i + 1}@digitalhub.test`;
  },
  phone(i) {
    return `010${String(2000000 + i).padStart(8, "0")}`;
  },
  gender(i) {
    return i % 2 === 0 ? "female" : "male";
  },
  dateOfBirth() {
    return "1994-05-12";
  },
  bloodGroup(i) {
    return BLOOD_GROUPS[i % BLOOD_GROUPS.length];
  },
  emergencyContactName(i) {
    return `${FIRST_NAMES[(i + 3) % FIRST_NAMES.length]} ${LAST_NAMES[(i + 3) % LAST_NAMES.length]}`;
  },
  emergencyContactPhone(i) {
    return `011${String(3000000 + i).padStart(8, "0")}`;
  },
});

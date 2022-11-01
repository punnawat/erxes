const userFields = `
  _id
  username
  email
  details {
    avatar
    fullName
  }
`;

const list = `
  query listQuery($startDate: Date, $endDate: Date, $userId: String) {
    timeclocks(startDate: $startDate, endDate: $endDate, userId: $userId) {
      _id
      shiftStart
      shiftEnd
      user {
        ${userFields}
      }
  }
}
`;

const listAbsence = `
query listAbsenceQuery($startDate: Date, $endDate: Date, $userId: String){
  absences(startDate: $startDate, endDate: $endDate, userId: $userId){
    startTime
    endTime
    reason
    explanation
    user {
      ${userFields}
    }
  }
}`;
export default {
  list,
  listAbsence
};

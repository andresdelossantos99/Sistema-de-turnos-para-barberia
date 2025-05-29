
export const registerFormValidate = (values) => {
    const errors ={}
    

    if (!values.name.trim()) {
        errors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
    errors.name = 'Name must contain only letters';
  }


  if (!values.nDni) {
      errors.nDni = 'DNI is required';
    } else if (!/^\d{7,9}$/.test(values.nDni)) {
        errors.nDni = 'DNI must be 7 to 9 digits';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email format';
  }


  if (!values.birthdate) {
      errors.birthdate = 'Birthdate is required';
    } else {
        const birthDate = new Date(values.birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (birthDate > today) {
            errors.birthdate = 'Birthdate cannot be in the future';
    } else if (
        age < 18 ||
        (age === 18 && monthDiff < 0) ||
        (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      errors.birthdate = 'User must be at least 18 years old';
    }
}

if (!values.username) {
    errors.username = 'Username is required';
}

if (!values.password) {
    errors.password = 'Password is required';
} else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(values.password)) {
    errors.password = 'Password must be at least 6 characters, with letters and numbers';
}

return errors;
};

export const loginFormValidate = (input) => {
    const errors = {};

    if (!input.username.trim()) {
        errors.username = 'Username is required';
    }

    if (!input.password) {
        errors.password = 'Password is required';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(input.password)) {
        errors.password = 'Password must be at least 6 characters, with letters and numbers';
    }

    return errors;
}
    const isTimeValid = (time) =>{
    const [hour, minute] = time.split(":").map(Number)
    const totalMinutes = hour *60 + minute;
    const startTime = 8 * 60;
    const endTime = 18 * 60;

    return totalMinutes >= startTime && totalMinutes < endTime;
}
export const dateTimeValidates = (inputs) =>{
    const errors = {};

    const {date, time} = inputs;
    const selectedDAteTime = new Date (`${date}T${time}`);
    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 *1000)
    if (!date) {
        errors.date = "Date is madatory";
    }else if (selectedDAteTime<now){
        errors.date = "You cannot select a past date" 
       }else if (selectedDAteTime<twentyFourHoursLater) {
        errors.date ="You cannot make an appointment with less than 24 hours' notice"
       }else if (
        selectedDAteTime.getDay()===0||
        selectedDAteTime.getDay()=== 6
       ){
        errors.date ="You cannot generate shifts on the weekend"
       }
       if (!time){
        errors.time = "Time is mandatory"
       }else if (!isTimeValid(time)) {
        errors.time = "The time must be between 8am and 6pm"
       }
       return errors;
}
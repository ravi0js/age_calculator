document.addEventListener("DOMContentLoaded", () => {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let dd = String(today.getDate()).padStart(2, '0');
    let todayString = `${yyyy}-${mm}-${dd}`;
    
    document.getElementById("tillDate").value = todayString;

    let dob = document.getElementById("dob");
    let tillDate = document.getElementById("tillDate");
    let year = document.getElementById("years");
    let months = document.getElementById("months");
    let days = document.getElementById("days");
    let height = document.getElementById("height");
    let weight = document.getElementById("weight");
    let bmi = document.getElementById("bmi");
    let healthStatus = document.getElementById("healthStatus");
    let btn = document.getElementById("calcDOB");

    btn.addEventListener("click", () => {
        let today = new Date(tillDate.value);
        let dd = today.getDate();
        let mm = today.getMonth() + 1; // Months are zero-based
        let yyyy = today.getFullYear();

        let dobyy = parseInt(dob.value.slice(0, 4));
        let dobmm = parseInt(dob.value.slice(5, 7));
        let dobdd = parseInt(dob.value.slice(8));

        if (isNaN(dobyy) || isNaN(dobmm) || isNaN(dobdd)) {
            alert('Invalid Date');
            year.style.color = 'red';
            months.style.color = 'red';
            days.style.color = 'red';
            bmi.style.color = 'red';
            healthStatus.style.color = 'red';
            return;
        }

        let totalyy = yyyy - dobyy;
        let totalmm = mm - dobmm;
        let totaldd = dd - dobdd;

        if (totaldd < 0) {
            totaldd += new Date(yyyy, mm, 0).getDate(); // Get the last day of the previous month
            totalmm--;
        }

        if (totalmm < 0) {
            totalmm += 12;
            totalyy--;
        }

        if (totalyy < 0) {
            alert('Invalid Date');
            year.style.color = 'red';
            months.style.color = 'red';
            days.style.color = 'red';
            bmi.style.color = 'red';
            healthStatus.style.color = 'red';
            return;
        }

        year.innerText = totalyy;
        months.innerText = totalmm;
        days.innerText = totaldd;

        // Ensure the color is set back to default if valid
        year.style.color = '';
        months.style.color = '';
        days.style.color = '';

        // Check if height and weight are entered
        let heightValue = parseFloat(height.value);
        let weightValue = parseFloat(weight.value);

        if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
            // Clear BMI and health status if height or weight is not valid
            bmi.innerText = '';
            healthStatus.innerText = '';
            return;
        }

        // Calculate BMI
        if(weightValue>0 && heightValue>0)
        {
            let bmiValue = (weightValue / ((heightValue / 100) ** 2)).toFixed(2);
            bmi.innerText = bmiValue;
            bmi.style.color = '';
        }
        else{
            alert('Please enter valid height and width');
        }
        // Determine health status based on BMI
        let status = '';
        if (bmiValue < 18.5) {
            status = 'Underweight';
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            status = 'Normal weight';
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            status = 'Overweight';
        } else {
            status = 'Obesity';
        }
        healthStatus.innerText = status;
        healthStatus.style.color = '';
    });
});
